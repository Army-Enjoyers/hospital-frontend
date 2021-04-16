export interface IJSONSchemaFormField {
  type: 'input' | 'textarea' | 'radio'
  name: string
  id: string
  variants?: string[]
}

export interface ISchemeMeta {
  id: string
  name: string
}
