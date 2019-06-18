# Message

Displays a formatted message with full information about sender, origin (with visual prompt) and message subject, including the full message body itself.

The component accepts the following props:

- `sender` represents the sender name.
- `origin` can be either `twt` for twitter `web` for website, defaults to `web` internally for unknown strings.
- `subject` represents the subject of the message.
- `body` is the main text body of the message.
- `datetime` is the UNIX time the message was received.

### Example

A supportive tweet from the SRA:

```javascript
<Message
    sender="Student Radio Assoc."
    origin="twt"
    subject="@SRA"
    body="RAW 1251AM is clearly the best student radio station."
    datetime=5734769
/>
```
