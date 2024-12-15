# CG-Project
---
## Intoduction to react fiber (webGL library for react)
---

### 1. **Create a React Project**
If you don’t already have a React project, create one:

```bash
npx create-react-app my-app
cd my-app
```

---

### 2. **Install Required Libraries**
Install `@react-three/fiber`, `@react-three/drei`, and `three`:

```bash
npm install @react-three/fiber three @react-three/drei
```

- **`@react-three/fiber`**: React renderer for Three.js.
- **`three`**: The core Three.js library.
- **`@react-three/drei`**: Prebuilt helpers for common tasks like cameras, lights, and models.

If you need extra utilities, install `three-stdlib`:

```bash
npm install three-stdlib
```

---

### 3. **Set Up Your Basic Scene**
Replace the contents of `src/App.js` with the following:

```jsx
import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function Box() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

function App() {
  return (
    <Canvas>
      {/* Add some lighting */}
      <ambientLight />
      <pointLight position={[10, 10, 10]} />

      {/* Add your 3D objects */}
      <Box />

      {/* Add camera controls */}
      <OrbitControls />
    </Canvas>
  );
}

export default App;
```

---

### 4. **Run the App**
Start your React app:

```bash
npm start
```

You’ll see a rotating orange cube with orbit controls enabled.

---

### 5. **Enhance with Additional Features**
Here’s how to extend your setup with common libraries:

#### **Load 3D Models**
To load `.glb` or `.gltf` models, use `useGLTF` from `@react-three/drei`:

```jsx
import { useGLTF } from "@react-three/drei";

function Model() {
  const { scene } = useGLTF("/path/to/model.glb");
  return <primitive object={scene} />;
}
```

Make sure the model file is in your `public` folder or available via URL.

#### **Add Shadows and Lighting**
Enable shadows in your `Canvas` and configure materials and lights:

```jsx
<Canvas shadows>
  <ambientLight intensity={0.5} />
  <directionalLight
    castShadow
    position={[5, 5, 5]}
    intensity={1}
  />
  <mesh castShadow receiveShadow>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="orange" />
  </mesh>
</Canvas>
```

#### **Physics with `@react-three/cannon`**
To simulate physics, install `@react-three/cannon`:

```bash
npm install @react-three/cannon
```

Example usage:

```jsx
import { Physics, useBox } from "@react-three/cannon";

function PhysicsBox() {
  const [ref] = useBox(() => ({ mass: 1, position: [0, 5, 0] }));
  return (
    <mesh ref={ref}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
}

<Canvas>
  <Physics>
    <PhysicsBox />
  </Physics>
</Canvas>;
```

#### **Post-Processing with `@react-three/postprocessing`**
For effects like bloom or depth of field, install:

```bash
npm install @react-three/postprocessing
```

Example:

```jsx
import { EffectComposer, Bloom } from "@react-three/postprocessing";

<Canvas>
  {/* Scene setup */}
  <EffectComposer>
    <Bloom intensity={1.5} />
  </EffectComposer>
</Canvas>;
```

---

### 6. **Organize Your Codebase**
For larger projects:
- Organize components in folders (e.g., `src/components/Box.js`).
- Create a `useScene.js` or `SceneContext` for shared logic.

---

### Additional Notes:
- **Performance Optimizations:** Use the `drei` helpers like `Preload`, `useMemo`, and `useFrame` to optimize rendering.
- **Debugging Tools:** Install `react-three-gui` or enable the `react-three/debug` mode for development.
- **Documentation and Examples:** Refer to the [React Three Fiber docs](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) and [Three.js examples](https://threejs.org/examples/).