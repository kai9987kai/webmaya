# WebMaya Advanced Studio

**WebMaya Advanced Studio v6 ("Component Studio")** is a browser-based 3D modeling, sculpting, material, and animation workspace built with **Three.js**. It runs as a single HTML file and provides a compact Maya-inspired interface for creating primitives, editing meshes, sculpting geometry, keyframing animation, importing/exporting GLTF assets, and saving projects locally.

> This project is intended as an experimental in-browser 3D editor and learning platform. It is not a replacement for professional DCC software, but it provides a strong foundation for extending modeling, animation, and procedural tools in the browser.

---

## What's new in v6 ("Component Studio")

* **Welded multi-selection** — select multiple faces or logical welded vertices while duplicated triangle corners continue to move as one component.
* **Fast component selection** — press <kbd>B</kbd> and drag a marquee; the default visible mode uses a depth-tested component ID pass to select what is actually drawn, while **Through** includes hidden components without per-face raycast stalls. Click or drag to replace, use <kbd>Shift</kbd> to extend/toggle, and <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> to remove.
* **Topology traversal** — **All**, **Grow**, **Shrink**, **Invert**, and **Connected** make it practical to build and refine larger selections.
* **Shared-pivot editing** — selected face regions and vertex groups translate, rotate, or scale together with <kbd>W</kbd>, <kbd>E</kbd>, and <kbd>R</kbd>. Vertex proportional editing can extend the transform beyond the selected groups.
* **Region-safe modeling** — Extrude removes the selected source faces, lifts disconnected face islands independently, creates caps, and builds UV-mapped walls only around each region boundary. Inset, subdivide, poke, flip, and delete also accept multi-face selections.
* **Attribute-preserving rebuilds** — generated corners interpolate compatible per-corner attributes, so UVs, vertex colors, sculpt `aMask` data, and other custom attributes survive topology edits.
* **Reliability and polish** — project restore is validated and staged before replacing the scene; sculpt strokes no longer fight orbit controls; material changes participate in history and emissive controls stay synchronized; nested GLTF transforms import correctly; and responsive tool/inspector drawers, ARIA state, keyboard focus restoration, and live status announcements improve smaller-screen and assistive use.

Earlier release — **v5 ("Studio")** — introduced viewport shading modes, sculpt masking and hardness, playblast and turntable capture, camera animation, watertight Symmetrize, world/local gizmo space, and a broad resource-lifecycle reliability pass. Earlier versions added the command palette, procedural deformers, proportional editing, BVH-accelerated sculpting, CSG booleans, Loop subdivision, noise/array/shell tools, HDRI and bloom, OBJ/STL export, GLTF animation-clip export, IndexedDB autosave, and the `window.WebMaya` scripting runtime.

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
* Viewport shading modes: solid, wireframe, matcap, normals, x-ray
* World / local transform gizmo space
* Turntable auto-orbit
* Playblast viewport recording to WebM video
* Responsive tool and inspector drawers on narrow screens
* Accessible command palette semantics, focus restoration, and live status updates

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

Face mode supports topology-aware selection and triangle-level mesh operations:

* Single- or multi-face selection
* Visible or through marquee selection
* Select all, grow, shrink, invert, or select connected faces
* Shared-pivot translate, rotate, and scale
* Manifold region extrusion with boundary-only side walls
* Multi-face inset, subdivision, poke, flip, and delete
* UV, color, sculpt-mask, and custom-attribute preservation across rebuilds

### Vertex editing

Vertex mode includes:

* Single- or multi-selection of welded vertex groups
* Visible or through marquee selection
* Select all, grow, shrink, invert, or select connected vertices
* Shared-pivot translate, rotate, and scale
* Next/previous welded-vertex navigation
* Proportional editing around a multi-vertex selection
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
* Adjustable brush hardness (falloff sharpness)
* Hold **Shift** to temporarily smooth
* Hold **Alt** to invert the brush
* **Masking** — paint protected zones with the Mask brush (Alt erases); every brush, including Grab and symmetry, respects the mask. Invert and Clear supported, and the mask is saved with the project.

### Materials

The material panel supports:

* Base color
* Metalness
* Roughness
* Emissive intensity
* Wireframe toggle
* Opacity
* Image texture loading
* Undo/redo history for material controls, presets, and textures
* Material presets:

  * Clay
  * Metal
  * Glass

### Modifiers and helpers

Included modifier-style tools:

* Mirror X
* Radial mirror
* Symmetrize (bake a watertight mirrored half across the deformer axis)
* Smooth normals
* Flat normals
* Wire overlay (toggle; persists with the project)
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
* Camera keyframes (position, look-at target, FOV) on a dedicated track
* Playblast recording to WebM and turntable auto-orbit

### Import, export, and project files

Supported workflows:

* Import `.gltf` and `.glb`
* Export `.gltf`
* Export `.glb`
* Save project as `.webmaya`
* Open `.webmaya` project files
* Drag-and-drop import into the viewport
* Atomic, validated project restore
* Local autosave using IndexedDB, with legacy `localStorage` migration support

---

## Quick Start

### Option 1: Open directly

Open the included HTML file:

```text
index.html
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
http://localhost:8080/
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

For deployment packaging and the built-in static smoke tests, Node.js users can run:

```bash
npm test
```

This copies the portable editor and social card into the ignored `dist/` folder, emits a Cloudflare Worker entry point, and verifies the root route, asset delivery, and method handling. It does not change the direct-open workflow.

---

## Controls

### General controls

| Action                       | Shortcut                     |
| ---------------------------- | ---------------------------- |
| Command palette              | Ctrl + K                     |
| Cycle viewport shading       | \                            |
| Undo                         | Ctrl + Z                     |
| Redo                         | Ctrl + Y or Ctrl + Shift + Z |
| Duplicate                    | Ctrl + D                     |
| Delete selection             | Delete or Backspace          |
| Frame selected object        | F                            |
| Play/pause timeline          | Space                        |
| Record keyframe              | K                            |
| Brush size down / up         | [ / ]                        |
| Proportional edit (vertex)   | O                            |
| Arm component box select     | B                            |

### Transform controls

| Tool      | Shortcut |
| --------- | -------- |
| Translate object/components | W |
| Rotate object/components    | E |
| Scale object/components     | R |

### Mode switching

| Mode        | Shortcut |
| ----------- | -------- |
| Object Mode | F8       |
| Face Mode   | F9       |
| Vertex Mode | F10      |
| Sculpt Mode | F11      |

### Component selection

These controls apply in Face and Vertex modes:

| Action | Control |
| ------ | ------- |
| Replace selection | Click a component |
| Extend/toggle selection | Shift + click |
| Remove from selection | Ctrl/Cmd + click |
| Arm marquee selection | B, then drag |
| Add marquee results | Shift + drag |
| Remove marquee results | Ctrl/Cmd + drag |
| Select occluded components | Enable **Through**; Wireframe and X-ray also select through |
| Refine selection | **All**, **Grow**, **Shrink**, **Invert**, or **Connected** |
| Transform around shared pivot | W / E / R |

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
index.html
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
* Current object selection
* Selected face set
* Selected welded-vertex-group set
* Marquee selection state
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

* Batched multi-face highlights
* Welded vertex display
* Selection box
* Shared component-pivot handle

### `Topo` and `Selection`

Build and traverse the welded topology graph, manage face and vertex-group selection sets, perform visible/through marquee tests, and keep the shared component pivot synchronized.

### `MeshOps`

Low-level mesh utilities for triangle extraction, manifold region extrusion, attribute interpolation, bounds/normal refresh, and geometry rebuilding.

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

The current scene is automatically saved to IndexedDB after major changes. When the page reloads, the last autosaved scene is restored automatically; legacy `localStorage` saves remain readable for migration.

### Project files

Use **Save Project** to download a `.webmaya` file. Opening a project validates and stages every object before replacing the current scene, so a malformed or oversized file fails atomically instead of leaving a half-restored workspace.

---

## Import and Export Notes

### Import

The editor can import GLTF and GLB files. Imported meshes are cloned, their complete nested world transforms are baked exactly once into editable geometry, and GPU-instanced meshes are expanded into independent editable objects so save/undo remains lossless.

### Export

The editor can export scene objects as:

* `.gltf`
* `.glb`

Object transform keys are exported as a standard `WebMayaTake` GLTF animation clip when a track contains at least two keys.

---

## Known Limitations

* Face tools operate on triangle geometry, not full polygon/ngon topology.
* Welded components are inferred from position. Deliberately coincident but disconnected vertices or UV seams may therefore be selected together.
* Edge selection, bevel, loop cut, bridge, and persistent polygon/ngon metadata are not yet implemented.
* Sculpting is CPU-based and may slow down on dense meshes.
* Undo/redo is snapshot-based, which is simple but can become memory-heavy with large scenes.
* Multi-material imported meshes are simplified to one editable material.
* Skinned meshes are refused until baked; rigging, constraints, IK, a UV editor, node materials, and a procedural modifier stack are not yet implemented.

---

## Suggested Roadmap

### Modeling

* [x] Boolean operations (CSG)
* [x] Procedural deformers (twist / bend / taper)
* [x] Proportional / soft-selection editing
* [x] Symmetrize (watertight mirror bake)
* [x] Welded multi-face and multi-vertex selection
* [x] Visible/through marquee selection
* [x] Grow, shrink, invert, connected, and all selection
* [x] Shared-pivot component transforms
* [x] Manifold region extrusion
* [x] Attribute-preserving geometry rebuilds
* [ ] Edge selection mode
* [ ] True polygon topology layer
* [ ] Bevel tool
* [ ] Loop cut tool
* [ ] Bridge faces tool
* [ ] Proper non-destructive modifier stack

### Sculpting

* [x] Brush falloff curves
* [x] Symmetry sculpting (X)
* [x] Clay / pinch / crease / grab brushes
* [x] Masking
* [ ] Dynamic remeshing
* [ ] GPU-accelerated sculpt deformation

### Animation

* [x] Standard GLTF animation export
* [x] Easing curves
* [x] Draggable keyframes on the timeline
* [x] Camera animation (position / target / FOV keyframes)
* [ ] Dope sheet
* [ ] Graph editor
* [ ] Object constraints

### Materials and rendering

* [x] Environment maps
* [x] HDRI support
* [x] Post-processing effects (bloom)
* [x] Shadow controls
* [x] Viewport shading modes (solid / wireframe / matcap / normals / x-ray)
* [x] Turntable auto-orbit
* [x] Playblast viewport recording (WebM)
* [x] History-aware emissive and material editing
* [ ] Material library
* [ ] Node-based material editor

### Productivity

* [x] Command palette (Ctrl+K)
* [x] World / local transform gizmo space
* [x] Responsive tool/inspector drawers
* [x] Command palette and status accessibility pass
* [ ] Customisable keybindings
* [ ] Multi-viewport / quad view

### Project architecture

* [x] Store large scenes with IndexedDB instead of `localStorage`
* [x] Atomic validated project restore
* [ ] Split the single HTML file into modules
* [ ] Add TypeScript
* [ ] Add Vite or another dev server/build setup
* [ ] Add unit tests for geometry tools

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

**Status:** v6 Component Studio / experimental alpha

WebMaya Advanced Studio v6 is a functional compact modeling, sculpting, material, and animation sandbox. Component Studio adds a coherent welded-selection and topology-editing workflow while preserving the project's portable, single-file design. It remains experimental and is best suited to learning, prototyping, and small-to-medium browser-based scenes.
