import { IntlFormatters } from 'react-intl'

declare module 'react-intl' {
  interface IntlFormatters {
    formatMessage(id: string, values?: Record<string, PrimitiveType>): string
  }
}
