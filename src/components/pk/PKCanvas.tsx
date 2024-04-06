"use client";
import React, {
  ReactNode,
  MutableRefObject,
  Suspense,
  useState,
  useEffect,
  useRef,
} from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  Sphere,
  PerspectiveCamera,
} from "@react-three/drei";
import { Hands, XRCanvas } from "@coconut-xr/natuerlich/defaults";
import {
  useXR,
  ImmersiveSessionOrigin,
  NonImmersiveCamera,
  useEnterXR,
  SessionModeGuard,
  useHeighestAvailableFrameRate,
  useNativeFramebufferScaling,
  useInputSources,
  useHandPoses,
  useInputSourceEvent,
  DynamicHandModel,
  HandBoneGroup,
} from "@coconut-xr/natuerlich/react";
import {
  Root,
  Fullscreen,
  Container,
  Text,
  Image,
  Content,
  canvasInputProps,
} from "@react-three/uikit";
import { ArrowLeft } from "@phosphor-icons/react";
import Link from "next/link";

const sessionOptions = {
  requiredFeatures: [
    "hit-test",
    "plane-detection",
    "anchors",
    "hand-tracking",
    "local-floor",
    // "layers",
  ],
};

export default function PKCanvas({
  isFullscreen = false,
  includeCameras = true,
  title = "[No Title]",
  children,
  ...rest
}: {
  includeCameras?: boolean;
  title?: string;
  children?: ReactNode;
  [x: string]: any;
}) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  const enterAR = useEnterXR("immersive-ar", sessionOptions);
  const [devicePixelRatio, setDevicePixelRatio] = useState(1);
  const frameBufferScaling = useNativeFramebufferScaling();
  const heighestAvailableFramerate = useHeighestAvailableFrameRate();

  const [isQuest, setIsQuest] = useState("");
  useEffect(() => {
    const xr = (navigator as any)?.xr as XRSystem;
    setDevicePixelRatio(window.devicePixelRatio);
    if (!xr) {
      setIsQuest("notQuest");
    } else {
      xr.isSessionSupported("immersive-vr").then((isSupported) => {
        if (isSupported) {
          setIsQuest("quest");
        } else {
          setIsQuest("notQuest");
        }
      });
    }
  }, []);

  return (
    <>
      {/* <div
        style={{
          // background: "#000",
          position: "absolute",
          width: "596px",
          height: "540px",
          border: "4px solid rgba(150,150,150,.3)",
          top: "50%",
          left: "50%",
          transform: "translateX(-50%) translateY(-50%)",
          borderRadius: 20,
          zIndex: 100,
          pointerEvents: "none",
        }}
      ></div> */}
      <XRCanvas
        dpr={devicePixelRatio}
        gl={{ localClippingEnabled: true, preserveDrawingBuffer: true }}
        frameBufferScaling={frameBufferScaling}
        camera={{ position: [0, 0, 10] }}
        frameRate={heighestAvailableFramerate}
        style={{ width: "100vw", height: "100vh" }}
        // {...canvasInputProps}
        {...rest}
      >
        <color args={[0]} attach="background" />
        {/* <directionalLight position={[-2, 2, 2]} intensity={0.8} />
        <pointLight position={[-2, 2, 2]} intensity={0.8} /> */}

        {/* {includeCameras && (
          <NonImmersiveCamera position={[0, 0, 0]}>
            <Root
              // ref={glassRef}
              pixelSize={0.002}
              // sizeX={320}
              precision={0.1}
              alignItems="center"
              justifyContent="center"
              overflow="visible"
            >
              <Container
                width={880}
                height={640}
                borderColor={"#fff"}
                borderOpacity={0.2}
                border={4}
                borderRadius={40}
              ></Container>
            </Root>
          </NonImmersiveCamera>
        )} */}
        {/* <ImmersiveSessionOrigin position={[0, 0, 1.5]}></ImmersiveSessionOrigin> */}
        {includeCameras && (
          <ImmersiveSessionOrigin
            position={[0, 0, 0]}
            cameraContent={
              <>
                <Sphere
                  position={[0, 0, 0]}
                  onUpdate={(self) => {
                    self.userData.name = "head-front-0";
                  }}
                  scale={0.00001}
                  material-color={"#f90"}
                  material-transparent={true}
                  material-opacity={0}
                  material-side={THREE.DoubleSide}
                />
                <Sphere
                  position={[0, 0, -1]}
                  onUpdate={(self) => {
                    self.userData.name = "head-front-1";
                  }}
                  scale={0.00001}
                  material-color={"#f90"}
                  material-transparent={true}
                  material-opacity={0}
                  material-side={THREE.DoubleSide}
                />
                <Sphere
                  onUpdate={(self) => {
                    self.userData.name = "head-sphere-2";
                  }}
                  scale={0.3}
                  material-color={"#f90"}
                  material-transparent={true}
                  material-opacity={0}
                  // material-side={THREE.DoubleSide}
                />
                <Sphere
                  onUpdate={(self) => {
                    self.userData.name = "head-sphere-3";
                  }}
                  scale={0.4}
                  material-color={"#f90"}
                  material-transparent={true}
                  material-opacity={0}
                  // material-side={THREE.DoubleSide}
                />
                <Sphere
                  onUpdate={(self) => {
                    self.userData.name = "head-sphere-4";
                  }}
                  scale={0.5}
                  material-color={"#f90"}
                  material-transparent={true}
                  material-opacity={0}
                  // material-side={THREE.DoubleSide}
                />
                <mesh position={[0, 0, -2.8]}>
                  <Root
                    // ref={glassRef}
                    pixelSize={0.002}
                    // sizeX={320}
                    precision={0.1}
                    alignItems="center"
                    justifyContent="center"
                    overflow="visible"
                  >
                    <Container
                      width={880}
                      height={640}
                      // borderColor={"#fff"}
                      // borderOpacity={0.2}
                      // border={4}
                      borderRadius={40}
                    ></Container>
                  </Root>
                </mesh>
              </>
            }
          >
            <Hands
              type="grab"
              // rayColor={"rgba(0,0,0)"}
              // raySize={0}
              onPointerDownMissed={() => {
                console.log("click");
              }}
            />
            {/* <Hands
            // modelLeft="hand-left.gltf"
            // modelRight="hand-right.gltf"
            // rayMaterial={{ color: "blue" }}
            /> */}
            <HandGestureLayer />
          </ImmersiveSessionOrigin>
        )}

        {!isFullscreen && (
          <SessionModeGuard deny="immersive-ar">
            <OrbitControls />
            <Suspense>
              <Environment background blur={1} preset="city" />
            </Suspense>
          </SessionModeGuard>
        )}
        {children}
      </XRCanvas>

      {/* {isQuest == "quest" && (
        <button className={"button"} onClick={enterAR}>
          Enter AR
        </button>
      )} */}
      {/* {isQuest == "notQuest" && (
        <button
          className={"button"}
          onClick={() => {
            let sendToQuestUrl = new URL("https://oculus.com/open_url/");
            sendToQuestUrl.searchParams.set("url", window.location.href);
            window.location.href = sendToQuestUrl.toString();
          }}
        >
          Send to Quest
        </button>
      )} */}
    </>
  );
}

// THOUGHT: These components take in a nested object and render all children,
// I need a function that just takes in layer properties and renders that component
// Probably the rendering of children should be done in some other function
// So that I can use this for the dynamic layout rendering as well as rending out component files
export function PKRootLayer({ layer, ...props }) {
  console.log("build", layer);
  return (
    <mesh position={[0, 1.5, -2]}>
      <Root pixelSize={0.0007} precision={0.1}>
        <Container width={layer.width} height={layer.height}></Container>
      </Root>
    </mesh>
  );
}

const toSafeString = (str) => str.replace(/[^\w\s]/gi, "");

export function HeadLocked({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  const followRef = useRef<THREE.Mesh>(null);
  const isPresenting = useXR.getState().mode === "immersive-ar";
  useFrame(({ gl, scene, camera, clock }) =>
    updateHeadLock(followRef, isPresenting, gl)
  );
  return (
    <mesh scale={1} ref={followRef}>
      {children}
    </mesh>
  );
}

export const updateHeadLock = (
  followRef: MutableRefObject<THREE.Mesh | null>,
  isPresenting: boolean,
  gl: THREE.WebGLRenderer
): void => {
  if (!followRef.current) return;
  let centerPosition = new THREE.Vector3();
  let centerQuaternion = new THREE.Quaternion();
  let position = new THREE.Vector3();
  let rotation = new THREE.Quaternion();
  try {
    if (isPresenting) {
      const views = getViews(gl);
      if (views) {
        calculateCenterPositionAndRotation(views, position, rotation);
        position.copy(centerPosition);
        rotation.copy(centerQuaternion);
        followRef.current.position.lerp(position, 0.1);
        let newQuaternion = followRef.current.quaternion.slerp(rotation, 0.1);
        followRef.current.quaternion.copy(newQuaternion);
      }
    }
  } catch (e) {
    console.error(e);
  }
};

function getViews(gl: THREE.WebGLRenderer): XRView[] | null {
  if (!gl.xr) return null;
  const frame = gl.xr.getFrame();
  const referenceSpace = gl.xr.getReferenceSpace();
  if (!referenceSpace) return null;
  const pose = frame.getViewerPose(referenceSpace);
  return (pose?.views || null) as XRView[];
}

function calculateCenterPositionAndRotation(
  views: XRView[],
  position: THREE.Vector3,
  rotation: THREE.Quaternion
) {
  let leftMatrix = new THREE.Matrix4().fromArray(views[0].transform.matrix);
  let rightMatrix = new THREE.Matrix4().fromArray(views[1].transform.matrix);
  let leftPosition = new THREE.Vector3().setFromMatrixPosition(leftMatrix);
  let rightPosition = new THREE.Vector3().setFromMatrixPosition(rightMatrix);
  let centerPosition = new THREE.Vector3()
    .addVectors(leftPosition, rightPosition)
    .multiplyScalar(0.5);
  // Get head rotation
  let leftQuaternion = new THREE.Quaternion().setFromRotationMatrix(leftMatrix);
  let rightQuaternion = new THREE.Quaternion().setFromRotationMatrix(
    rightMatrix
  );
  let centerQuaternion = new THREE.Quaternion().slerpQuaternions(
    leftQuaternion,
    rightQuaternion,
    0.5
  );
  position.copy(centerPosition);
  rotation.copy(centerQuaternion);
}

function useLerpTowards(
  subjectRef: MutableRefObject<THREE.Mesh | null>,
  targetName: string,
  speed: number
): React.Dispatch<React.SetStateAction<string>> {
  const { scene } = useThree();
  const [_targetName, setTargetName] = useState(targetName);
  // Create objects once outside the render loop
  const position = new THREE.Vector3();
  const rotation = new THREE.Quaternion();
  const leftMatrix = new THREE.Matrix4();
  const rightMatrix = new THREE.Matrix4();
  const leftPosition = new THREE.Vector3();
  const rightPosition = new THREE.Vector3();
  const centerPosition = new THREE.Vector3();
  const leftQuaternion = new THREE.Quaternion();
  const rightQuaternion = new THREE.Quaternion();
  const centerQuaternion = new THREE.Quaternion();

  useFrame(({ gl, camera }) => {
    let target: THREE.Mesh | undefined;
    // Find the target mesh
    target = findTarget(scene, _targetName);
    // Calculate center position and rotation
    if (subjectRef.current && target) {
      if (target.userData.name.indexOf("head-") == 0) {
        const views = getViews(gl);
        if (views) {
          calculateCenterPositionAndRotation(views, position, rotation);
          position.copy(centerPosition);
          rotation.copy(centerQuaternion);
          position.add(
            target.position.clone().applyQuaternion(centerQuaternion)
          );
          subjectRef.current.position.lerp(position, speed);
          let newQuaternion = subjectRef.current.quaternion.slerp(
            rotation,
            speed
          );
          subjectRef.current.quaternion.copy(newQuaternion);
        }
      } else {
        subjectRef.current.position.lerp(
          target.getWorldPosition(new THREE.Vector3()),
          speed
        );
      }
    }
  });
  return setTargetName;
}

const findTarget = (
  scene: THREE.Scene,
  name: string
): THREE.Mesh | undefined => {
  scene.traverse((object: THREE.Object3D) => {
    if (object.userData && object instanceof THREE.Mesh) {
      if (object.userData.name === name) {
        return object;
      }
    }
  });
  // Add a default return statement to return undefined
  return undefined;
};

const HAND_JOINTS = [
  "wrist",
  "thumb-metacarpal",
  "thumb-phalanx-proximal",
  "thumb-phalanx-distal",
  "thumb-tip",
  "index-finger-metacarpal",
  "index-finger-phalanx-proximal",
  "index-finger-phalanx-intermediate",
  "index-finger-phalanx-distal",
  "index-finger-tip",
  "middle-finger-metacarpal",
  "middle-finger-phalanx-proximal",
  "middle-finger-phalanx-intermediate",
  "middle-finger-phalanx-distal",
  "middle-finger-tip",
  "ring-finger-metacarpal",
  "ring-finger-phalanx-proximal",
  "ring-finger-phalanx-intermediate",
  "ring-finger-phalanx-distal",
  "ring-finger-tip",
  "pinky-finger-metacarpal",
  "pinky-finger-phalanx-proximal",
  "pinky-finger-phalanx-intermediate",
  "pinky-finger-phalanx-distal",
  "pinky-finger-tip",
];

function HandGestureLayer({ ...props }) {
  const inputSources = useInputSources();

  return (
    <>
      {inputSources.map((inputSource, i) => {
        // console.log(inputSource);
        return (
          <Suspense key={i}>
            <DynamicHandModel
              hand={inputSource.hand as XRHand}
              handedness={inputSource.handedness}
              //   basePath="input-profiles"
              //   defaultProfileId="generic-hand"
            >
              {HAND_JOINTS.map((joint, i) => {
                return (
                  <HandBoneGroup key={i} joint={joint as XRHandJoint}>
                    <JointMesh name={`${inputSource.handedness}-${joint}`} />
                  </HandBoneGroup>
                );
              })}
            </DynamicHandModel>
          </Suspense>
        );
      })}
    </>
  );
}

function JointMesh({
  name,
  ...props
}: {
  name: string;
  [x: string]: any; // for the rest props
}) {
  return (
    <mesh
      scale={0.02}
      onUpdate={(self) => {
        self.userData.name = name;
      }}
      {...props}
    >
      <boxGeometry />
      <meshPhysicalMaterial color={"#f09"} transparent={true} opacity={0.0} />
    </mesh>
  );
}

export function useCollision(collisionPairs: any) {
  const { scene } = useThree();
  const [isColliding, setColliding] = useState(false);
  useFrame(() => {
    let object1: THREE.Mesh | undefined, object2: THREE.Mesh | undefined;
    scene.traverse((object: THREE.Object3D) => {
      if (object.userData && object instanceof THREE.Mesh) {
        if (object.userData.name === collisionPairs[0]) {
          object1 = object;
        } else if (object.userData.name === collisionPairs[1]) {
          object2 = object;
        }
      }
    });
    if (
      object1?.geometry?.boundingSphere &&
      object2?.geometry?.boundingSphere
    ) {
      const sphere1 = new THREE.Sphere();
      const sphere2 = new THREE.Sphere();
      object1.geometry.computeBoundingSphere();
      object2.geometry.computeBoundingSphere();
      sphere1
        .copy(object1.geometry.boundingSphere)
        .applyMatrix4(object1.matrixWorld);
      sphere2
        .copy(object2.geometry.boundingSphere)
        .applyMatrix4(object2.matrixWorld);
      setColliding(sphere1.intersectsSphere(sphere2));
    }
  });
  return isColliding;
}
