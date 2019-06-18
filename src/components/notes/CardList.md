# CardList

A list of cards that conveys a sequence or collection of information. Great for lists of events, schedules, song logs and more.

Accepts an array of `cards` which follow the same shape as a [`card`](/info/simple-card--default)'s props.

A card list is limited to 10 cards for performance reasons. A card list can handle card of any configuration,wether slim, colourful, dark, with or without image or no hero at all!

Animation is dependant on the `globalAnimate` context.

### Example

```javascript
<CardList
  cards={[
    {
      key: "card_abcdefg1234567",
      slim: true,
      colourful: false,
      dark: false,
      data: {
        tag: "12X",
        imageURL: "",
        title: "20:12",
        subtitle: "Towards leamington"
      }
    }
  ]}
/>
```
