# VideoOverlay

Displays a video over-top of other divisions in the same parent, covering them and informing the parent component of video completion by invoking the passed `handleEnded` function.

Accepts the following props:

- The `src` prop defines the video source.
- The `handleEnded` prop describes a function to be invoked when the video ends playback.

In the event that the video is unreachable, an error message will be displayed in place of the video for 30 seconds, before the `handleEnded` function is invoked. This way, `handleEnded` will be invoked independent of any network or playback errors.

### Example

A basic video which plays and then invokes `handleEnded`:

```javascript
<VideoOverlay
    src="https://media.radio.warwick.ac.uk/video/timelapse.mp4"
    handleEnded={()=>console.log("Video Ended!");}
/>
```
