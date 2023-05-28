export const assertCondition = (value: any, operator: 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte', expectedValue:any): boolean => {
  switch(operator){
    case 'eq':
      return value == expectedValue
    case 'neq':
      return value != expectedValue
    case 'gt':
      return value > expectedValue
    case 'gte':
      return value >= expectedValue
    case 'lt':
      return value < expectedValue
    case 'lte':
      return value <= expectedValue
  }
}