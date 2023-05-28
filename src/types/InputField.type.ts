export type InputField = {
  label: string;
  type: string;
  value: string | number;
  key: string;
  placeholder?: string;
  helpText?: string;
  required?: boolean;
  disabled?: boolean;
  options?: Array<{
    text: string;
    value: string | number;
  }>; // for select
  rules?: {
    [key: string]: Function;
  };
  dependsOn?: Array<{
    key: string;
    value: string | number;
    operator: 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte';
  }>;
  hasError?: boolean;
};
