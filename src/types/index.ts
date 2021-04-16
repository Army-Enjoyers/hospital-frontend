export interface JSONSchemaFormField {
  type: 'input' | 'textarea' | 'radio'
  name: string
  id: string
  variants?: string[]
}
