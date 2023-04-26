export type FilterBy = {
  field: string,
  value: string | number,
  operator: 'eq' | 'gte' | 'lte' | 'within' | 'in'
}