export default function firstUppercase (str) {
  if (typeof str !== 'string') return str
  if (!str) return str
  return str.replace(/^([a-z])/, $0 => $0.toUpperCase())
}
