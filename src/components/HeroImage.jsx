export default function HeroImage() {
  const spokes = [0, 60, 120, 180, 240, 300]

  return (
    <svg viewBox="0 0 1400 540" xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="Hsky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#6AAED0" />
          <stop offset="48%"  stopColor="#9CCEE0" />
          <stop offset="100%" stopColor="#C2DEED" />
        </linearGradient>
        <linearGradient id="Hvan" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E4E4E4" />
        </linearGradient>
        <linearGradient id="Hgrd" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#9AAAB8" />
          <stop offset="100%" stopColor="#768898" />
        </linearGradient>
        <radialGradient id="Hwhl" cx="36%" cy="30%">
          <stop offset="0%"   stopColor="#888" />
          <stop offset="100%" stopColor="#181818" />
        </radialGradient>
        <filter id="Hblur">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>

      {/* ── SKY ── */}
      <rect width="1400" height="540" fill="url(#Hsky)" />

      {/* ── BLURRED BUILDINGS ── */}
      <g filter="url(#Hblur)" opacity="0.28">
        <rect x="560"  y="12"  width="68"  height="415" fill="#1E3878" rx="2" />
        <rect x="642"  y="45"  width="82"  height="382" fill="#183068" rx="2" />
        <rect x="740"  y="62"  width="65"  height="364" fill="#1E3878" rx="2" />
        <rect x="820"  y="82"  width="72"  height="345" fill="#183068" rx="2" />
        <rect x="908"  y="105" width="58"  height="322" fill="#1E3878" rx="2" />
        <rect x="462"  y="78"  width="62"  height="349" fill="#183068" rx="2" />
        <rect x="382"  y="95"  width="55"  height="332" fill="#1E3878" rx="2" />
        {[30,58,86,114,142,170,198].map(y =>
          [570,590,652,672,750,770,830,850].map(x =>
            <rect key={`${x}${y}`} x={x} y={y} width="11" height="10" fill="#C8E8FF" opacity="0.48" rx="1" />
          )
        )}
      </g>

      {/* ── GRASS ── */}
      <rect x="0" y="438" width="1400" height="26" fill="#588835" />

      {/* ── ASPHALT ── */}
      <rect x="0" y="460" width="1400" height="80" fill="url(#Hgrd)" />

      {/* ── TREES LEFT ── */}
      <rect x="88"  y="305" width="18" height="145" fill="#6B4A18" />
      <circle cx="97"  cy="260" r="68" fill="#336825" />
      <circle cx="62"  cy="290" r="44" fill="#437828" />
      <circle cx="135" cy="280" r="50" fill="#336825" />
      <circle cx="97"  cy="232" r="42" fill="#458830" />

      {/* ── TREES CENTER-BACK (behind van, left) ── */}
      <rect x="345" y="318" width="14" height="122" fill="#6B4A18" opacity="0.65" />
      <circle cx="352" cy="282" r="50" fill="#336825" opacity="0.6" />
      <circle cx="324" cy="302" r="33" fill="#437828" opacity="0.6" />
      <circle cx="382" cy="294" r="38" fill="#336825" opacity="0.55" />

      {/* ── TREES RIGHT ── */}
      <rect x="1280" y="285" width="18" height="162" fill="#6B4A18" />
      <circle cx="1289" cy="240" r="72" fill="#336825" />
      <circle cx="1248" cy="272" r="50" fill="#437828" />
      <circle cx="1330" cy="262" r="55" fill="#336825" />
      <circle cx="1289" cy="210" r="44" fill="#458830" />

      {/* ══════════════════════ VAN ══════════════════════ */}
      <ellipse cx="860" cy="458" rx="495" ry="12" fill="#00000022" />

      {/* ── Rear tail-lights (far left of van) ── */}
      <rect x="358" y="248" width="12" height="50" rx="5"  fill="#FF3333" opacity="0.88" />
      <rect x="358" y="302" width="12" height="28" rx="4"  fill="#FF8800" opacity="0.78" />
      <rect x="358" y="334" width="12" height="16" rx="3"  fill="#FFCC22" opacity="0.65" />

      {/* ── Main body ── */}
      <rect x="368" y="215" width="988" height="170" rx="18" fill="url(#Hvan)" stroke="#D6D6D6" strokeWidth="1.5" />

      {/* ── Roof ── */}
      <path d="M404,215 Q404,180 435,173 L1325,173 Q1348,173 1350,195 L1350,215 Z" fill="#F0F0F0" />

      {/* ── Windows LEFT of door ── */}
      <rect x="392" y="180" width="108" height="66" rx="9" fill="#78AECC" opacity="0.72" stroke="#98C4D8" strokeWidth="1" />
      <rect x="508" y="180" width="102" height="66" rx="9" fill="#78AECC" opacity="0.70" stroke="#98C4D8" strokeWidth="1" />
      <rect x="618" y="180" width="98"  height="66" rx="9" fill="#78AECC" opacity="0.68" stroke="#98C4D8" strokeWidth="1" />

      {/* ── Open sliding door (dark interior) ── */}
      <rect x="724" y="175" width="168" height="220" rx="7"  fill="#141414" />
      <rect x="728" y="179" width="160" height="213" rx="6"  fill="#1E1E1E" />
      {/* Interior detail */}
      <rect x="734" y="315" width="148" height="38"  rx="5"  fill="#282828" />
      <rect x="736" y="353" width="144" height="44"  rx="5"  fill="#212121" />
      {/* Vertical door frame */}
      <rect x="717" y="172" width="11"  height="224" fill="#C0C0C0" rx="5" />
      {/* Step sill */}
      <rect x="717" y="390" width="177" height="14"  rx="5"  fill="#C4C4C4" stroke="#B0B0B0" strokeWidth="1" />

      {/* ── Windows RIGHT of door ── */}
      <rect x="900"  y="180" width="102" height="66" rx="9" fill="#78AECC" opacity="0.67" stroke="#98C4D8" strokeWidth="1" />
      <rect x="1010" y="180" width="100" height="66" rx="9" fill="#78AECC" opacity="0.65" stroke="#98C4D8" strokeWidth="1" />
      <rect x="1118" y="180" width="90"  height="66" rx="9" fill="#78AECC" opacity="0.62" stroke="#98C4D8" strokeWidth="1" />

      {/* ── Van front (right side) ── */}
      <path d="M1356,215 L1368,228 L1368,378 Q1368,392 1356,393 L1356,215 Z" fill="#D6D6D6" />
      <path d="M1349,180 L1362,208 L1362,370 L1349,376 Z" fill="#88BAD0" opacity="0.82" />
      <rect x="1362" y="300" width="20" height="60"  rx="5"  fill="#888" />
      <rect x="1364" y="306" width="16" height="14"  rx="2"  fill="#9A9A9A" />
      <rect x="1364" y="324" width="16" height="14"  rx="2"  fill="#9A9A9A" />
      <rect x="1364" y="342" width="16" height="14"  rx="2"  fill="#9A9A9A" />
      <rect x="1362" y="256" width="20" height="38"  rx="5"  fill="#FFEE99" opacity="0.92" />
      <rect x="1362" y="248" width="20" height="10"  rx="4"  fill="#FFAA44" opacity="0.85" />
      <rect x="1362" y="360" width="20" height="14"  rx="4"  fill="#FFFFFF" opacity="0.7" />
      {/* Mirror */}
      <rect x="1345" y="218" width="34" height="19"  rx="5"  fill="#DDDDDD" stroke="#CCCCCC" strokeWidth="1" />
      <rect x="1350" y="235" width="7"  height="18"  rx="3.5" fill="#CCCCCC" />

      {/* ── Blue stripe ── */}
      <rect x="368" y="330" width="988" height="44" fill="#1B3A6B" />

      {/* ── Orange stripe ── */}
      <rect x="368" y="374" width="988" height="18" fill="#F97316" />

      {/* ── Wheel arches ── */}
      <path d="M432,390 Q482,362 532,390" fill="#E0E0E0" stroke="#C8C8C8" strokeWidth="2.5" />
      <path d="M1168,390 Q1218,362 1268,390" fill="#E0E0E0" stroke="#C8C8C8" strokeWidth="2.5" />

      {/* ── Wheels ── */}
      <circle cx="482"  cy="422" r="46" fill="url(#Hwhl)" />
      <circle cx="482"  cy="422" r="30" fill="#808080" />
      <circle cx="482"  cy="422" r="15" fill="#252525" />
      {spokes.map(a => (
        <line key={a}
          x1={482 + 17 * Math.cos(a * Math.PI / 180)} y1={422 + 17 * Math.sin(a * Math.PI / 180)}
          x2={482 + 28 * Math.cos(a * Math.PI / 180)} y2={422 + 28 * Math.sin(a * Math.PI / 180)}
          stroke="#9A9A9A" strokeWidth="4.5" strokeLinecap="round" />
      ))}

      <circle cx="1218" cy="422" r="46" fill="url(#Hwhl)" />
      <circle cx="1218" cy="422" r="30" fill="#808080" />
      <circle cx="1218" cy="422" r="15" fill="#252525" />
      {spokes.map(a => (
        <line key={`r${a}`}
          x1={1218 + 17 * Math.cos(a * Math.PI / 180)} y1={422 + 17 * Math.sin(a * Math.PI / 180)}
          x2={1218 + 28 * Math.cos(a * Math.PI / 180)} y2={422 + 28 * Math.sin(a * Math.PI / 180)}
          stroke="#9A9A9A" strokeWidth="4.5" strokeLinecap="round" />
      ))}

      {/* ══════════════════════ DELTA LOGO ══════════════════════ */}
      <circle cx="1085" cy="292" r="74" fill="white" />
      <circle cx="1085" cy="292" r="69" fill="white" stroke="#1B3A6B" strokeWidth="5.5" />
      <circle cx="1085" cy="292" r="62" fill="white" stroke="#F97316" strokeWidth="3" />
      {/* Swirl arcs */}
      <path d="M1025,265 Q1085,232 1145,265" fill="none" stroke="#F97316" strokeWidth="4.5" strokeLinecap="round" opacity="0.55" />
      <path d="M1020,318 Q1085,352 1150,318" fill="none" stroke="#1B3A6B" strokeWidth="4" strokeLinecap="round" opacity="0.38" />
      {/* Ambulance */}
      <rect x="1059" y="255" width="52" height="30" rx="6" fill="#EEF3FF" stroke="#1B3A6B" strokeWidth="2" />
      <rect x="1072" y="255" width="24" height="13" rx="4" fill="#CCE0FF" stroke="#1B3A6B" strokeWidth="1.5" />
      <line x1="1085" y1="260" x2="1085" y2="278" stroke="#F97316" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="1077" y1="269" x2="1093" y2="269" stroke="#F97316" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="1067" cy="286" r="7"  fill="#222" />
      <circle cx="1103" cy="286" r="7"  fill="#222" />
      <rect x="1082" y="248" width="7"  height="8"  rx="3.5" fill="#FF4444" />
      <text x="1085" y="312" textAnchor="middle" fill="#1B3A6B"
        fontSize="24" fontWeight="900" fontFamily="'Arial Black',Arial,sans-serif" letterSpacing="2">DELTA</text>
      <text x="1085" y="328" textAnchor="middle" fill="#F97316"
        fontSize="10" fontFamily="Arial,sans-serif" letterSpacing="2.8">MEDICAL CARE</text>
      <text x="1085" y="342" textAnchor="middle" fill="#F97316"
        fontSize="10" fontFamily="Arial,sans-serif" letterSpacing="3.2">TRANSPORT</text>

      {/* ══════════════════════ ELDERLY WOMAN (right, stepping out) ══════════════════════ */}
      {/* Legs – khaki / tan */}
      <rect x="800" y="348" width="24" height="92" rx="12" fill="#C8A878" />
      <rect x="829" y="356" width="24" height="84" rx="12" fill="#C0A070" />
      {/* White sneakers */}
      <ellipse cx="812" cy="442" rx="22" ry="9"  fill="#F2F2F2" />
      <ellipse cx="841" cy="442" rx="21" ry="8.5" fill="#E8E8E8" />

      {/* Body – cream/gray sweater */}
      <ellipse cx="820" cy="292" rx="40" ry="58" fill="#CCCAC0" />
      <line x1="800" y1="300" x2="840" y2="300" stroke="#BBBAA8" strokeWidth="1.8" opacity="0.35" />
      <line x1="798" y1="310" x2="842" y2="310" stroke="#BBBAA8" strokeWidth="1.8" opacity="0.30" />

      {/* Head */}
      <circle cx="820" cy="212" r="32" fill="#E8BE90" />
      {/* Gray hair – short bob */}
      <ellipse cx="820" cy="192" rx="32" ry="14" fill="#C0C0C0" />
      <path d="M788,206 Q790,184 820,180 Q850,184 852,206" fill="#BCBCBC" />
      <rect x="788" y="202" width="10" height="26" rx="5"  fill="#C4C4C4" />
      <rect x="842" y="202" width="10" height="26" rx="5"  fill="#C4C4C4" />
      {/* Face */}
      <ellipse cx="812" cy="208" rx="4"  ry="3.5" fill="#5A3820" />
      <ellipse cx="830" cy="208" rx="4"  ry="3.5" fill="#5A3820" />
      <path d="M810,221 Q820,231 830,221" fill="none" stroke="#A06040" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="803" cy="215" r="9" fill="#F4A0A0" opacity="0.25" />
      <circle cx="838" cy="215" r="9" fill="#F4A0A0" opacity="0.25" />

      {/* Left arm → toward caregiver */}
      <path d="M781,265 Q756,283 748,308" fill="none" stroke="#CCCAC0" strokeWidth="25" strokeLinecap="round" />
      {/* Right arm + handbag */}
      <path d="M859,260 Q880,278 886,300" fill="none" stroke="#CCCAC0" strokeWidth="25" strokeLinecap="round" />
      {/* Handbag */}
      <rect x="874" y="292" width="50" height="40" rx="10" fill="#C8880E" />
      <path d="M881,292 Q899,274 917,292" fill="none" stroke="#A06810" strokeWidth="5.5" strokeLinecap="round" />
      <line x1="874" y1="312" x2="924" y2="312" stroke="#A06810" strokeWidth="1.8" opacity="0.42" />

      {/* ══════════════════════ CAREGIVER (left, navy uniform) ══════════════════════ */}
      {/* Legs – dark navy */}
      <rect x="630" y="350" width="25" height="88" rx="12" fill="#12204A" />
      <rect x="659" y="344" width="25" height="94" rx="12" fill="#12204A" />
      {/* Black shoes */}
      <ellipse cx="642" cy="441" rx="23" ry="9"   fill="#0A0A0A" />
      <ellipse cx="672" cy="441" rx="22" ry="9.5"  fill="#0A0A0A" />

      {/* Body – navy polo */}
      <ellipse cx="655" cy="286" rx="42" ry="65" fill="#1B3A6B" />
      {/* Collar */}
      <path d="M633,248 L655,265 L677,248" fill="none" stroke="#2A5090" strokeWidth="4.5" />
      {/* Polo logo badge */}
      <circle cx="636" cy="266" r="7" fill="#2A5090" />

      {/* Head */}
      <circle cx="655" cy="203" r="32" fill="#C87850" />

      {/* Dark hair – ponytail */}
      <ellipse cx="655" cy="181" rx="32" ry="14" fill="#180A04" />
      <path d="M623,196 Q625,174 655,170 Q685,174 687,196" fill="#180A04" />
      <rect x="623" y="192" width="11" height="28" rx="5.5" fill="#180A04" />
      {/* Ponytail */}
      <ellipse cx="688" cy="190" rx="13" ry="22" fill="#180A04" />
      <rect x="682" y="210" width="13" height="35" rx="6.5" fill="#180A04" />

      {/* Face */}
      <ellipse cx="647" cy="199" rx="4"  ry="3.5" fill="#1E0E06" />
      <ellipse cx="664" cy="199" rx="4"  ry="3.5" fill="#1E0E06" />
      <path d="M645,212 Q655,222 665,212" fill="none" stroke="#904830" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="638" cy="206" r="9" fill="#F4A0A0" opacity="0.20" />
      <circle cx="673" cy="206" r="9" fill="#F4A0A0" opacity="0.20" />

      {/* Left arm – relaxed side */}
      <path d="M614,256 Q594,278 588,308" fill="none" stroke="#1B3A6B" strokeWidth="25" strokeLinecap="round" />
      {/* Right arm – extended to patient */}
      <path d="M696,250 Q726,270 738,298" fill="none" stroke="#1B3A6B" strokeWidth="25" strokeLinecap="round" />

      {/* Clasped hands */}
      <ellipse cx="744" cy="302" rx="20" ry="16" fill="#E8BE90" />
      <ellipse cx="736" cy="294" rx="20" ry="16" fill="#C87850" />
    </svg>
  )
}
