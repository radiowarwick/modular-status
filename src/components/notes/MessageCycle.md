# MessageCycle

Takes an array of messages and cycles through them with a given interval.

The component accepts the following props:

- The `interval` prop defines the number of milliseconds each message should be shown for.

- An array of `message` which follow the same shape as the [`Message`](/info/simple-message--default)'s props. If the array only contains one message, the cycle will not progress, and default 'blank' message will be shown.

- The `animate` prop defines if the component should animate the (un)mounting of the child components.

Animation is dependant on the `globalAnimate` context, and locally by the boolean `animate` prop.

### Example

A two messages which animate with an interval of 2000ms.

```javascript
<MessageCycle
  interval={2000}
  animate={true}
  messages={[
    {
      id: "msg_125838",
      origin: "twt",
      sender: "Pierre",
      subject: "@1251time just mentioned us on twitter",
      body:
        "@1251time: .@buczistash good news! It's 12:51, and today you are victRaWrious! Tweet us a request @RaW1251AM #1251time",
      datetime: 12345678
    },
    {
      id: "msg_125837",
      origin: "twt",
      sender: "Billy",
      subject: "@billyarnold1999 just mentioned us on twitter",
      body:
        "@billyarnold1999: They were also incredibly nice, and we recorded a great interview that will be on air in term 3 @RAW1251AM",
      datetime: 22349678
    }
  ]}
/>
```
