# ImageCycle

Takes an array of images and cycles through them by a given interval. All images are cropped to a fixed 16:9 aspect ratio.

The component accepts the following props:

- The `interval` prop defines the number of milliseconds each image should be shown for.

- The `forceFetch` boolean prop defines wether the component should ask the server for the image for every cycle.

- The `animate` prop defines if the component should animate the (un)mounting of the child components.

- An array of `images` that must follow this shape:

```JSON
[
    {
        "id": A unique ID for each image,
        "url": A valid URL for the image
    }
]
```

If the array only contains one image, the cycle will not progress. If the array contains no images, an error message will be displayed.

Animation is dependant on the `globalAnimate` context, and locally by the boolean `animate` prop.

### Example

A cycle of only one image which animates and uses the image from browser cache:

```javascript
<ImageCycle
  interval={2500}
  animate={true}
  forceFetch={false}
  images={[
    {
      id: "img_0",
      url: "https://media2.radio.warwick.ac.uk/static/marketing/default"
    }
  ]}
/>
```
