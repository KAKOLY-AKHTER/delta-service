import {
  collection, collectionGroup, doc, getDocs, getDoc,
  addDoc, setDoc, updateDoc, deleteDoc,
  query, where, orderBy, serverTimestamp, onSnapshot
} from 'firebase/firestore'
import { db } from '../firebase'

/* ── helpers ── */
const userCol  = (uid, col) => collection(db, 'users', uid, col)
const userDoc  = (uid, col, id) => doc(db, 'users', uid, col, id)
const profileDoc = (uid) => doc(db, 'users', uid)

/* ── PROFILE ── */
export const getProfile = async (uid) => {
  const snap = await getDoc(profileDoc(uid))
  return snap.exists() ? snap.data() : {}
}
export const saveProfile = (uid, data) =>
  setDoc(profileDoc(uid), data, { merge: true })

/* ── BOOKINGS ── */
export const getBookings = async (uid) => {
  const snap = await getDocs(query(userCol(uid, 'bookings'), orderBy('createdAt', 'desc')))
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}
export const addBooking = (uid, data) =>
  addDoc(userCol(uid, 'bookings'), { ...data, createdAt: serverTimestamp() })

export const updateBooking = (uid, id, data) =>
  updateDoc(userDoc(uid, 'bookings', id), data)

export const cancelBooking = (uid, id) =>
  updateDoc(userDoc(uid, 'bookings', id), { status: 'Cancelled' })

export const rateBooking = (uid, id, rating) =>
  updateDoc(userDoc(uid, 'bookings', id), { rating })

/* ── FAMILY MEMBERS ── */
export const getFamily = async (uid) => {
  const snap = await getDocs(userCol(uid, 'family'))
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}
export const addFamilyMember = (uid, data) =>
  addDoc(userCol(uid, 'family'), { ...data, createdAt: serverTimestamp() })

export const updateFamilyMember = (uid, id, data) =>
  updateDoc(userDoc(uid, 'family', id), data)

export const deleteFamilyMember = (uid, id) =>
  deleteDoc(userDoc(uid, 'family', id))

/* ── SAVED LOCATIONS ── */
export const getFavorites = async (uid) => {
  const snap = await getDocs(userCol(uid, 'favorites'))
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}
export const addFavorite = (uid, data) =>
  addDoc(userCol(uid, 'favorites'), { ...data, createdAt: serverTimestamp() })

export const updateFavorite = (uid, id, data) =>
  updateDoc(userDoc(uid, 'favorites', id), data)

export const deleteFavorite = (uid, id) =>
  deleteDoc(userDoc(uid, 'favorites', id))

/* ── NOTIFICATIONS ── */
export const getNotifications = async (uid) => {
  const snap = await getDocs(query(userCol(uid, 'notifications'), orderBy('createdAt', 'desc')))
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}
export const markNotifRead = (uid, id) =>
  updateDoc(userDoc(uid, 'notifications', id), { read: true })

export const markAllNotifsRead = async (uid) => {
  const snap = await getDocs(userCol(uid, 'notifications'))
  const promises = snap.docs.filter(d => !d.data().read).map(d =>
    updateDoc(d.ref, { read: true })
  )
  return Promise.all(promises)
}

export const seedNotifications = async (uid) => {
  const snap = await getDocs(userCol(uid, 'notifications'))
  if (!snap.empty) return
  const defaults = [
    { icon:'🎉', title:'Welcome to Delta Care!', msg:'Thanks for joining. Book your first ride anytime.', read:false, createdAt: serverTimestamp() },
    { icon:'📋', title:'Complete Your Profile',  msg:'Add your insurance info and emergency contact for faster booking.', read:false, createdAt: serverTimestamp() },
  ]
  await Promise.all(defaults.map(n => addDoc(userCol(uid, 'notifications'), n)))
}

/* ── INSURANCE ── */
export const getInsurance = async (uid) => {
  const snap = await getDoc(doc(db, 'users', uid, 'settings', 'insurance'))
  return snap.exists() ? snap.data() : {}
}
export const saveInsurance = (uid, data) =>
  setDoc(doc(db, 'users', uid, 'settings', 'insurance'), data, { merge: true })

/* ── NOTIFICATION SETTINGS ── */
export const getSettings = async (uid) => {
  const snap = await getDoc(doc(db, 'users', uid, 'settings', 'notifications'))
  return snap.exists() ? snap.data() : {}
}
export const saveSettings = (uid, data) =>
  setDoc(doc(db, 'users', uid, 'settings', 'notifications'), data, { merge: true })

/* ── LOYALTY / REFERRAL ── */
export const seedLoyalty = async (uid) => {
  const ref = doc(db, 'users', uid)
  const snap = await getDoc(ref)
  if (snap.exists() && snap.data().referralCode) return
  const code = 'DELTA-' + uid.slice(0, 6).toUpperCase()
  await setDoc(ref, { referralCode: code, loyaltyPoints: 100, loyaltyTier: 'Bronze', redeemedRewards: [] }, { merge: true })
  const histCol = collection(db, 'users', uid, 'loyaltyHistory')
  const histSnap = await getDocs(histCol)
  if (histSnap.empty) {
    await addDoc(histCol, { desc: 'Welcome bonus', pts: 100, date: 'Today', color: '#15803d', createdAt: serverTimestamp() })
  }
}
export const getLoyalty = async (uid) => {
  const snap = await getDoc(doc(db, 'users', uid))
  const data = snap.exists() ? snap.data() : {}
  return {
    points:          data.loyaltyPoints    || 0,
    tier:            data.loyaltyTier      || 'Bronze',
    referralCode:    data.referralCode     || ('DELTA-' + uid.slice(0, 6).toUpperCase()),
    redeemedRewards: data.redeemedRewards  || [],
  }
}
export const getLoyaltyHistory = async (uid) => {
  const snap = await getDocs(query(collection(db, 'users', uid, 'loyaltyHistory'), orderBy('createdAt', 'desc')))
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}
export const addLoyaltyPoints = async (uid, pts, desc) => {
  const ref = doc(db, 'users', uid)
  const snap = await getDoc(ref)
  const current = snap.exists() ? (snap.data().loyaltyPoints || 0) : 0
  const newTotal = Math.max(0, current + pts)
  const tier = newTotal >= 5000 ? 'VIP' : newTotal >= 2000 ? 'Platinum' : newTotal >= 1000 ? 'Gold' : newTotal >= 500 ? 'Silver' : 'Bronze'
  await setDoc(ref, { loyaltyPoints: newTotal, loyaltyTier: tier }, { merge: true })
  await addDoc(collection(db, 'users', uid, 'loyaltyHistory'), {
    desc, pts,
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    color: pts > 0 ? '#15803d' : '#b91c1c',
    createdAt: serverTimestamp(),
  })
  return newTotal
}
export const redeemReward = async (uid, rewardPts, label) => {
  const ref = doc(db, 'users', uid)
  const snap = await getDoc(ref)
  const data = snap.exists() ? snap.data() : {}
  const redeemed = data.redeemedRewards || []
  const current = data.loyaltyPoints || 0
  if (current < rewardPts || redeemed.includes(rewardPts)) return false
  const newTotal = current - rewardPts
  const tier = newTotal >= 5000 ? 'VIP' : newTotal >= 2000 ? 'Platinum' : newTotal >= 1000 ? 'Gold' : newTotal >= 500 ? 'Silver' : 'Bronze'
  await setDoc(ref, { loyaltyPoints: newTotal, loyaltyTier: tier, redeemedRewards: [...redeemed, rewardPts] }, { merge: true })
  await addDoc(collection(db, 'users', uid, 'loyaltyHistory'), {
    desc: `Redeemed: ${label}`, pts: -rewardPts,
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    color: '#b91c1c', createdAt: serverTimestamp(),
  })
  return true
}

/* ── PROMO CODES ── */
export const seedDefaultPromoCodes = async () => {
  const check = await getDoc(doc(db, 'promoCodes', 'DELTA10'))
  if (check.exists()) return
  const codes = {
    'DELTA10':   { discount:'10% off',  desc:'10% off your next ride',            type:'percent', value:10,  active:true },
    'WELCOME5':  { discount:'$5 off',   desc:'$5 off for new members',             type:'flat',    value:5,   active:true },
    'CARE20':    { discount:'20% off',  desc:'20% off medical appointment rides',  type:'percent', value:20,  active:true },
    'DIALYSIS5': { discount:'$5 off',   desc:'$5 off all dialysis rides',          type:'flat',    value:5,   active:true },
    'REFER15':   { discount:'$15 off',  desc:'Referral reward discount',           type:'flat',    value:15,  active:true },
  }
  await Promise.all(Object.entries(codes).map(([code, data]) => setDoc(doc(db, 'promoCodes', code), data)))
}
export const validatePromoCode = async (code) => {
  const snap = await getDoc(doc(db, 'promoCodes', code.toUpperCase()))
  if (!snap.exists()) return null
  const data = snap.data()
  return data.active ? { code: code.toUpperCase(), ...data } : null
}
export const getUserPromos = async (uid) => {
  const snap = await getDocs(userCol(uid, 'promos'))
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}
export const seedUserPromos = async (uid) => {
  const col = userCol(uid, 'promos')
  const snap = await getDocs(col)
  if (!snap.empty) return
  const defaults = [
    { code:'DELTA10',   title:'10% Off Next Ride',     desc:'Use at checkout for any upcoming booking',       expiry:'Jul 31, 2025', color:'#f97316', bg:'#fff7ed', border:'#fed7aa' },
    { code:'DIALYSIS5', title:'$5 Off Dialysis Rides', desc:'Applied automatically to all dialysis bookings', expiry:'Ongoing',      color:'#1d4ed8', bg:'#eff6ff', border:'#bfdbfe' },
  ]
  await Promise.all(defaults.map(p => addDoc(col, { ...p, createdAt: serverTimestamp() })))
}

/* ── PAYMENTS ── */
export const getPayments = async (uid) => {
  const snap = await getDocs(query(userCol(uid, 'payments'), orderBy('createdAt', 'desc')))
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}
export const addPayment = (uid, data) =>
  addDoc(userCol(uid, 'payments'), { ...data, createdAt: serverTimestamp() })

/* ── SUPPORT TICKETS ── */
export const addTicket = (uid, email, data) =>
  addDoc(collection(db, 'tickets'), { ...data, uid, email, status: 'Open', createdAt: serverTimestamp() })

/* ── CONTACT REQUESTS (public — no auth required) ── */
export const submitContactRequest = (data) =>
  addDoc(collection(db, 'contactRequests'), { ...data, status: 'New', createdAt: serverTimestamp() })

/* ── ADMIN ── */
export const getAllBookings = async () => {
  const snap = await getDocs(collectionGroup(db, 'bookings'))
  return snap.docs
    .map(d => ({ id: d.id, uid: d.ref.parent.parent.id, ...d.data() }))
    .sort((a, b) => {
      const aTime = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0
      const bTime = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0
      return bTime - aTime
    })
}

export const getAllUsers = async () => {
  const snap = await getDocs(collection(db, 'users'))
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

export const getAllTickets = async () => {
  const snap = await getDocs(query(collection(db, 'tickets'), orderBy('createdAt', 'desc')))
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

export const updateTicketStatus = (id, status) =>
  updateDoc(doc(db, 'tickets', id), { status })

export const adminUpdateBooking = (uid, id, data) =>
  updateDoc(doc(db, 'users', uid, 'bookings', id), data)

export const adminAddPayment = (uid, data) =>
  addDoc(collection(db, 'users', uid, 'payments'), { ...data, createdAt: serverTimestamp() })

export const getAllContactRequests = async () => {
  const snap = await getDocs(query(collection(db, 'contactRequests'), orderBy('createdAt', 'desc')))
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}
export const updateContactRequestStatus = (id, status) =>
  updateDoc(doc(db, 'contactRequests', id), { status })
