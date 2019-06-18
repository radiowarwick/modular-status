# Button

A springy button that invokes the `handleClick` function from props on click.

Accepts a string `value`, an `icon` string from the [Google Icons Library](https://material.io/tools/icons/?style=baseline), or both.

Can be disabled by passing truthy `disabled` prop.

Can be loading by passing truthy `loading` prop.

Always animates, independent of `globalAnimate` context.

### Example

An active, non-loading button with text and an icon:

```javascript
<Button
  handleClick={() => console.log("Clicked!")}
  value="Click Me"
  icon="fingerprint"
  loading={false}
  disabled={false}
/>
```
