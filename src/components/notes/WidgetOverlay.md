# WidgetOverlay

Provides an overlay for all widgets which combines [`ErrorBox`](/info/simple-errorbox--default) and [`Loader`](/info/simple-loader--default) to convey the state of the widget.

It also gently fades out the bottom of the widget with a over-layed linear gradient at the base of the component.

The component accepts two props:

- The `error` prop is an error object, usually with a message property. The message will be used to convey a verbose error.

- The `loading` prop is a boolean which defines if the widget is loading.

If an `error` is provided, is overrides `loading` even if truthy. If no `error` or `loading` is provided, then only the fade-bar is shown.

### Example

An overlay where, even though `loading` is truthy, an error message is displayed:

```javascript
<WidgetOverlay error={{ message: "Oopsie!" }} loading={true} />
```
