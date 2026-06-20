import useCounter from '../hooks/useCounter'

function parse(raw) {
  const str = String(raw)
  const m = str.match(/^(\d+(?:\.\d+)?)(.*)$/)
  // treat "24/7" or any slash-fraction as static
  if (!m || m[2].startsWith('/')) return { isStatic: true }
  return {
    num: parseFloat(m[1]),
    suffix: m[2],
    decimals: m[1].includes('.') ? m[1].split('.')[1].length : 0,
    isStatic: false,
  }
}

export default function CountUp({ value, inView, className, style }) {
  const { num = 0, suffix = '', decimals = 0, isStatic } = parse(value)
  const count = useCounter(num, 1600, inView, decimals)
  if (isStatic) return <span className={className} style={style}>{value}</span>
  const display = decimals > 0 ? count.toFixed(decimals) : Math.round(count)
  return <span className={className} style={style}>{display}{suffix}</span>
}
