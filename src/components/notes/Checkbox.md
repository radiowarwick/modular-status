# Checkbox

A simple controlled component that accepts an `isChecked` prop, a `value` prop and a `handleChange` function which is invoked when the checkbox is clicked.

### Example

A simple ticked checkbox with a basic string value.

```javascript
<Checkbox
    isChecked={true}
    value="Checkbox Here!"
    handleChange={()=>console.log("clicked");}
/>
```
