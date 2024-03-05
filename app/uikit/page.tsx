"use client";
import { Canvas } from "@react-three/fiber";
import { Container, Text } from "@react-three/uikit";

export default function App() {
  return (
    <Canvas
      style={{ height: "100dvh", touchAction: "none" }}
      gl={{ localClippingEnabled: true }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight intensity={10} position={[5, 1, 10]} />
      <mesh>
        <sphereGeometry />
        <meshPhysicalMaterial color="#f09" />
      </mesh>

      <Container backgroundColor="blue" width={100}>
        <Container>
          <Text>Test...</Text>
        </Container>
      </Container>
    </Canvas>
  );
}
