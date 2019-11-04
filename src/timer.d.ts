type timeEnd = (cb: Function, key: string) => void
type timer = () => timeEnd
export default timer
