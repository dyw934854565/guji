declare function safeParse (str: string, defaultVal: any, onerror?: (err: Error, str: string) => void): any
export default safeParse
