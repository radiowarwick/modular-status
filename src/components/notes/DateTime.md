# DateTime

Displays the date and time, automatically incrementing seconds from a given UNIX start time.

Accepts a `unixStart` prop which is the UNIX time from which the date/time should increment from.

Text automatically scales to fill the parent container, using [`react-fittext`](https://www.npmjs.com/package/react-fittext).

### Example

A date and time starting from the 1/1/1970 at midnight:

```javascript
<DateTime unixStart={0} />
```
