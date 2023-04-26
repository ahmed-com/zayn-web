export type TableHeader = {
    text: string,
    sortable: boolean,
    key: string,
    value?: string, // Only for type 'entity'
    type: 'text' | 'number' | 'date' | 'datetime' | 'markableText' | 'avatar' | 'img' | 'state' | 'geolocation' | 'ipAddress' | 'entity',
    filterable: boolean,
    states?: TableRowState[], // Only for type 'state'
}

export type TableRow = {
    id: string | number,
    [key: string]: any,
}

export type TableRowState = {
    text: string,
    color: string,
    icon: string,
    key: string,
}

export type TableRowAction = {
    icon: string,
    text: string,
    color: string,
    key: string,
}