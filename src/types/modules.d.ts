/* eslint-disable */
declare module '*.module.scss' {
  const result: Record<string, string>

  export default result
}

declare module '*.json' {
  const value: any
  export default value
}

declare module '*.png' {
  const url: string
  export default url
}

declare module '*.svg' {
  const url: string
  export default url
}
