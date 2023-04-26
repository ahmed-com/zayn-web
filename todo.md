# Data Table:
1. the table should expect the table row to be nothing but an `id` field and a map string => string of other fields
1. for each row it should loop again through the table headers but instead of showing the header.text it will show row\[header.field\]
1. the table will emit a view event whose value will be the row clicked
1. the table will also emit a hover event whose value is the the row hovered
1. the table will accept a prop called `actions` which is an array of {icon, color, key, text}
1. the table will emit an action event whose value is the action key and the row clicked
1. the table will emit a `showActions` event whose value is the row clicked
1. the table header will have a 'type' field who can take one of these supported values \['text', 'markableText', 'number', 'img', 'avatar', 'date', 'dateTime', 'status', 'entity', 'geolocation', 'ipAddress'\]
1. each supported value will correspond to a different component for rendering what is inside the (td) element
1. the tableHeader with type 'status' shall have a new field called 'statuses' that is an array of {icon, color, key, text}
1. the tableHeader with type 'entity' shall have a new field called 'value', this is the key of the entity the table will show
1. also the tableHeader can now also have a new field called 'filterable'
1. the filter component will be a list of applicable filters; text header will have exact filters while date, dateTime, ipAddress & number fields will have a range filter and the status & entity headers will have a special filter.
1. the filter for geolocation will consist of a geolaction input and a radius input.
1. there shall also be a new v-model now that is an array of filters.
1. the special filter of status will be a list of checkboxes, each checkbox will have a value of the status key and a text of the status text.
1. however the special filter of the entity should make use of a composable of the entity to fetch the list of entities and show them in a list of checkboxes.
1. write a custom computed property that will return a URL for the searching, sorting and filtering.
1. write a function at the backend that will accept the searching, sorting and filtering and builds a query out of them.