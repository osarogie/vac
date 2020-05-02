export interface IFieldRule {
  type?: string
  message?: string
  required?: boolean
  pattern?: RegExp
  max?: number
}
