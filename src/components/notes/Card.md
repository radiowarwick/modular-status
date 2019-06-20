# Card

The main unit of information display within this project, Cards convey information in a structured layout.

A card consists of a 'hero' which is the left-most division, and displays a small piece of very important info or an image.

Next to the 'hero' is the main body, which then conveys the main portion of the information.

A card accepts a `data` prop which is an object of the following shape:

```JSON
{
  "tag": The text for the hero,
  "imageURL": A valid image URL,
  "title": The main info of the card,
  "subtitle": A secondary piece of supplementary info
}
```

Any of the above properties can be null, and hence won't be displayed. If no `imageURL` or `tag` is provided, then no 'hero' will be rendered.

A card also accepts a unique `key` props to allow react to keep track of cards between renders.

Can be configured in different ways dependent on the data you need to show:

- A truthy `slim` prop reduces the card height and 'squishes' text a closer together.
- A truthy `colourful` prop uses the `imageURL` source to give the background a frosted-glass effect.
- A truthy `dark` prop inverts the hero colour scheme to give a darker, 'deactivated' appearance.

Animation is dependant on the `globalAnimate` context.

### Example

A slim card with a hero tag and no image.

```javascript
<Card
  key="card_abcdefg1234567"
  data={{
    tag: "12X",
    imageURL: "",
    title: "20:12",
    subtitle: "Towards leamington"
  }}
  slim={true}
  colourful={false}
  dark={false}
/>
```
