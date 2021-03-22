export interface LegalForm {
  ИП: string
  ООО: string
  ЗАО: string
  ОДО: string
  ОАО: string
}

export const ORGANIZATION_MAP: LegalForm = {
  ИП: 'IP',
  ООО: 'OOO',
  ЗАО: 'ZAO',
  ОДО: 'ODO',
  ОАО: 'OAO',
}
