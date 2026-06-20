import { useState, useEffect, useRef } from 'react'

export default function useCounter(end, duration = 1600, inView = false, decimals = 0) {
  const [val, setVal] = useState(0)
  const hasRun = useRef(false)

  useEffect(() => {
    if (!inView || hasRun.current) return
    hasRun.current = true
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setVal(parseFloat((eased * end).toFixed(decimals)))
      if (t < 1) requestAnimationFrame(tick)
      else setVal(end)
    }
    requestAnimationFrame(tick)
  }, [inView])

  return val
}
