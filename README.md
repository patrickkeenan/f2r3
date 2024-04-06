# F2R3

### From canvas to world in a click

F2R3 makes it easy to see your Figma UI in 3D. You can preview it in the browser, headset, and then take the code and build out your full experience. Leveraging @react-three/uikit, you can build out fully interactive and very fast interactions.

You can try it out right here:
https://www.f2r3.com

#### Things it can do:

- Copy a frame link, paste it in and see your composition in 3D
- Fullscreen layout allows you to make 2D scrolling pages with embedded 3D views
- Tap the code button to get the layout JSON or the - - react three fiber typescript.
- Tap the VR button to send it to your headset and view your flows in WebXR
- Tap back and forth like a slide show to page through frames in the root of your page

#### Things it probably won't ever do:

- Hardware integrations with the system
- Worlds, navigation, game mechanics
- Highly orchestrated animations
- Modeling (it can use GLTFs, but those would come from blender or something)

#### Special features to know

**Add a star**: "\*" , and that layer will be flattened. - This is very helpful because I haven't built full vector support, and complex stuff gets garbled. It also saves on performance.

**Fullscreen scroll**: The root frame will be used as the fullscreen frame if you're doing 2D stuff, so all content will scroll inside of it
It reads the full file, so if you're having performance issues, copy a smaller set of things to a new figma file.

**One font**: Text is only supported with Inter right now, if you want custom fonts just add a "" and the layer will become an image.
Auto layout isn't fully fleshed out, try removing auto layout when in doubt.

#### Figma features it supports

- Instant page transitions
- Text, frame, rectangle, circle
- solid fill, image textures, strokes (kinda)
- Auto-layout (but some things act strangely)

#### Features that are half done, but very doable (please help!)

- Using component states for hover, focus, click (uikit docs)
- Animating props using react-signal (uikit docs)
- Having figma components that represent more fully functional components that would be replaced on export. (see uikit "kits")
- Vector support (uikit docs)
- Shape support
- Building layouts based on some JSON on the network, like weather or movies, or names/profile pics

#### Harder things that are doable with some more time

- Importing multiple frames at one time (side by side windows)
- Add in network calls and responses, like answers from an LLM, or real time messaging, or calling
- Affixing UI to hands, joints, head, etc (with coconut-xr)
- HDR Worlds (pmdrs drei example)
- Figma components that get replaces with GLTF models
- Custom fonts (example)

#### F2R3 Wants you!

- Someone who knows yoga and flex box well. I get tripped up with parent containers, alignment axes, stretching, growing, shrinking, oh my.
- Someone who knows react three fiber. It would just be nice to commiserate toils and tribulations of working without a window in WebXR.
  Testers who can push the boundaries and help figure out solutions that will make this a faster better tool.

You can try it out right here:
https://www.f2r3.com

Git repo is here:
https://github.com/patrickkeenan/f2r3

#### What its built on

- [react three fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)
- [react three uikit](https://docs.pmnd.rs/uikit/getting-started/components-and-properties)
- [figma rest api](https://www.figma.com/developers/api)

## Running locally

If you have experience with Nextjs and react this will be a breeze. To run your own instance you'll need to register a figma app and update the local env file so it has the right credentials.

If you just want to edit TSX and update stuff live, you can copy the structure in the app/exports folder. You can then edit your TSX and it will update live in your browser or even in your headset.

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
