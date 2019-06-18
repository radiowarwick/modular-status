# TextInput

A simple controlled text input with an animated sliding line thing that shows on focus.

Accepts a `value` to display, a `placeHolder` text and `handleChange` function which is invoked when the user types or pastes something into the text input.

The captured input is passed as an argument to the `handleChange` function.

### Example

A simple text input with a placeholder and an empty value:

```javascript
<TextInput
  value=""
  placeHolder="Type Here"
  handleChange={text => console.log("changed to: " + text)}
/>
```
