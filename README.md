# WebMaya 4.0 — Sculpt & Animate (Browser 3D Studio)

**WebMaya** is an experimental, single-file, browser-based 3D mini-studio inspired by DCC workflows (Maya/Blender-style layout). It runs entirely client-side and focuses on fast iteration: create primitives, transform them with gizmos, do light sculpting, keyframe simple motion, and import/export glTF.

> **Not affiliated with Autodesk.** “Maya” is used here as an inspiration reference for UX/layout only.

---

## Features

### Modeling / Scene
- **Primitive creation:** Cube, Sphere, Plane, Torus
- **Outliner:** click to select objects
- **Object duplication & deletion**
- **Viewport navigation:** orbit-style camera controls
- **Transform gizmo:** translate / rotate / scale

### Edit Modes
- **Object Mode:** select objects and use transform controls
- **Face Mode:** face picking + highlight (basic operations)
- **Vertex Mode:** vertex visualization (points overlay)
- **Sculpt Mode:** brush-style deformation (click + drag)

### Materials
- Base color (picker)
- Metalness / roughness sliders
- Wireframe toggle
- Load a texture image onto the selected mesh

### Animation
- Mini timeline (0–100)
- Record **keyframes** for selected object transforms
- Play/pause and scrub playback

### File I/O
- **Export glTF** (downloads a `.gltf`)
- **Import glTF** (adds meshes into the current scene)

### Convenience
- **Undo / Redo**
- **Autosave** to `localStorage` (scene restored on reload)

---

## Quick Start

### Option A — Run locally (recommended)
Because this project uses JavaScript modules, the most reliable way is to serve it over HTTP:

1. Clone the repo:
   ```bash
   git clone https://github.com/kai9987kai/webmaya.git
   cd webmaya
