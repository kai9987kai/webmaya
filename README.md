# WebMaya Advanced Studio

**WebMaya Advanced Studio** is a browser-based 3D modeling, sculpting, material, and animation workspace built with **Three.js**. It runs as a single HTML file and provides a compact Maya-inspired interface for creating primitives, editing meshes, sculpting geometry, keyframing animation, importing/exporting GLTF assets, and saving projects locally.

> This project is intended as an experimental in-browser 3D editor and learning platform. It is not a replacement for professional DCC software, but it provides a strong foundation for extending modeling, animation, and procedural tools in the browser.

---

## Features

### Scene and viewport

* Perspective viewport powered by Three.js
* Orbit camera controls
* Transform gizmos for translate, rotate, and scale
* Grid and axes toggles
* Front, side, top, and perspective camera shortcuts
* Object framing
* Screenshot export
* Background color control

### Object creation

Create editable scene objects directly in the browser:

* Cube
* Sphere
* Plane
* Torus
* Cylinder
* Cone
* Ico sphere
* Point light

Meshes are converted into editable non-indexed triangle geometry so face and sculpt tools can operate more predictably.

### Object editing

* Select objects from the viewport or outliner
* Duplicate objects
* Delete objects
* Rename objects
* Toggle object visibility
* Center pivot
* Apply transform
* Drop object to ground
* Object-level undo/redo history

### Face editing

Face mode supports triangle-level mesh operations:

* Select individual faces
* Extrude face
* Inset face
* Subdivide face
* Poke face
* Flip face
* Delete face

### Vertex editing

Vertex mode includes:

* Vertex selection
* Transformable vertex handle
* Next/previous vertex navigation
* Weld-close operation
* Basic mesh relaxation

### Sculpting

Sculpt mode lets you paint directly on selected meshes with multiple brush types:

* Inflate
* Pull
* Smooth
* Flatten
* Invert brush direction
* Adjustable brush size
* Adjustable brush strength
* Hold **Shift** to temporarily smooth
* Hold **Alt** to invert the brush

### Materials

The material panel supports:

* Base color
* Metalness
* Roughness
* Emissive intensity
* Wireframe toggle
* Image texture loading
* Material presets:

  * Clay
  * Metal
  * Glass

### Modifiers and helpers

Included modifier-style tools:

* Mirror X
* Radial mirror
* Smooth normals
* Flat normals
* Wire overlay
* Triangulation status helper

### Animation

WebMaya Advanced Studio includes a lightweight keyframe timeline:

* Record object transform keys
* Play/pause animation
* Scrub timeline
* Adjustable frame range
* Adjustable FPS
* Interpolated position, rotation, and scale
* Clear keys for selected object

### Import, export, and project files

Supported workflows:

* Import `.gltf` and `.glb`
* Export `.gltf`
* Export `.glb`
* Save project as `.webmaya`
* Open `.webmaya` project files
* Drag-and-drop import into the viewport
* Local autosave using `localStorage`

---

## Quick Start

### Option 1: Open directly

Save the project as an HTML file, for example:

```text
webmaya-advanced.html
```

Then open it in a modern browser.

### Option 2: Run with a local server

Because the project uses ES module imports and browser file APIs, a local server is recommended.

Using Python:

```bash
python -m http.server 8080
```

Then open:

```text
http://localhost:8080/webmaya-advanced.html
```

Using Node.js:

```bash
npx serve .
```

---

## Requirements

* A modern browser with WebGL support
* Internet access for loading Three.js from the import map CDN
* No build step required
* No npm installation required unless you choose to host dependencies locally

The project currently imports Three.js modules from:

```html
https://unpkg.com/three@0.160.0/
```

To make the app fully offline-capable, download Three.js and update the import map to point to local files.

---

## Controls

### General controls

| Action                | Shortcut                     |
| --------------------- | ---------------------------- |
| Undo                  | Ctrl + Z                     |
| Redo                  | Ctrl + Y or Ctrl + Shift + Z |
| Delete selection      | Delete or Backspace          |
| Frame selected object | F                            |
| Play/pause timeline   | Space                        |
| Record keyframe       | K                            |

### Transform controls

| Tool      | Shortcut |
| --------- | -------- |
| Translate | W        |
| Rotate    | E        |
| Scale     | R        |

### Mode switching

| Mode        | Shortcut |
| ----------- | -------- |
| Object Mode | F8       |
| Face Mode   | F9       |
| Vertex Mode | F10      |
| Sculpt Mode | F11      |

### Sculpting

| Action                 | Control             |
| ---------------------- | ------------------- |
| Sculpt selected mesh   | Left mouse drag     |
| Temporary smooth brush | Hold Shift          |
| Invert brush direction | Hold Alt            |
| Change brush size      | Sculpt panel slider |
| Change brush power     | Sculpt panel slider |

---

## Project Structure

The app is currently contained in one HTML file.

```text
webmaya-advanced.html
```

Inside the file, the code is organized into several main systems:

### `App`

Stores core Three.js runtime objects:

* Scene
* Camera
* Renderer
* Orbit controls
* Transform controls
* Raycaster
* Object list
* Helper objects
* Clock

### `State`

Stores editor state:

* Active mode
* Current selection
* Selected face index
* Selected vertex index
* Undo stack
* Redo stack

### `History`

Handles project snapshots for:

* Undo
* Redo
* Autosave
* Scene restoration

### `Editor`

Main editor controller. Handles:

* Initialization
* Scene setup
* Primitive creation
* Selection
* Import/export
* UI synchronization
* Pointer events
* Keyboard shortcuts
* View controls
* Object management

### `Helpers`

Handles viewport helper visuals:

* Face highlights
* Vertex display
* Selection box
* Vertex transform handle

### `MeshOps`

Low-level mesh utilities for triangle extraction and geometry rebuilding.

### `Tools`

Modeling, sculpting, vertex, and modifier tools.

### `Anim`

Timeline and animation system:

* Frame control
* Keyframe recording
* Playback
* Interpolation
* Timeline drawing

---

## Saving and Autosave

WebMaya Advanced Studio uses two save mechanisms.

### Autosave

The current scene is automatically saved to browser `localStorage` after major changes. When the page reloads, the last autosaved scene is restored automatically.

### Project files

Use **Save Project** to download a `.webmaya` file. This stores the current project as JSON and can be reopened later with **Open Project**.

---

## Import and Export Notes

### Import

The editor can import GLTF and GLB files. Imported meshes are cloned, converted into editable geometry, and added to the scene.

### Export

The editor can export scene objects as:

* `.gltf`
* `.glb`

Animation data stored in `userData.anim` is preserved as custom user data, but it is not currently converted into standard GLTF animation clips.

---

## Known Limitations

* Face tools operate on triangle geometry, not full polygon/ngon topology.
* Extrude, inset, poke, and subdivision are geometry rebuild operations and do not yet preserve advanced topology metadata.
* Vertex editing currently moves individual triangle vertices; welded/shared vertex editing is limited.
* Sculpting is CPU-based and may slow down on dense meshes.
* Undo/redo is snapshot-based, which is simple but can become memory-heavy with large scenes.
* Imported materials are simplified when converted for editing.
* GLTF export does not yet generate standard animation clips from the custom timeline system.
* No rigging, skinning, constraints, IK, UV editor, node materials, or procedural modifier stack yet.

---

## Suggested Roadmap

### Modeling

* Edge selection mode
* Multi-face and multi-vertex selection
* True polygon topology layer
* Bevel tool
* Loop cut tool
* Bridge faces tool
* Boolean operations
* Proper modifier stack

### Sculpting

* Brush falloff curves
* Symmetry sculpting
* Masking
* Dynamic remeshing
* GPU-accelerated sculpt deformation

### Animation

* Standard GLTF animation export
* Dope sheet
* Graph editor
* Easing curves
* Object constraints
* Camera animation

### Materials and rendering

* Environment maps
* HDRI support
* Material library
* Node-based material editor
* Post-processing effects
* Shadow controls

### Project architecture

* Split the single HTML file into modules
* Add TypeScript
* Add Vite or another dev server/build setup
* Add unit tests for geometry tools
* Store large scenes with IndexedDB instead of `localStorage`

---

## Development Notes

This project is intentionally kept as a single-file application for portability. That makes it easy to share and run, but as the project grows, the next major improvement should be modularization.

A suggested future file layout:

```text
src/
  main.js
  core/App.js
  core/State.js
  core/History.js
  editor/Editor.js
  editor/Selection.js
  tools/Tools.js
  tools/MeshOps.js
  tools/Sculpt.js
  animation/Anim.js
  ui/Panels.js
  io/ImportExport.js
styles/
  main.css
index.html
```

---

## License

Add your preferred license here.

Common options:

* MIT License for open-source permissive use
* Apache 2.0 for permissive use with explicit patent terms
* GPL if derivative works should remain open-source
* Private/proprietary if this is not intended for public release

---

## Credits

Built with:

* Three.js
* OrbitControls
* TransformControls
* GLTFLoader
* GLTFExporter
* BufferGeometryUtils

---

## Project Status

**Status:** Prototype / experimental editor

WebMaya Advanced Studio is functional as a compact browser-based modeling and animation sandbox. It is suitable for experimentation, learning, rapid mesh sk
