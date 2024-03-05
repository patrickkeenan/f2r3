"use client";
import React, {
  MutableRefObject,
  useState,
  useRef,
  useEffect,
  Suspense,
} from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useXR } from "@react-three/xr";
import { makeBorderMaterial } from "@coconut-xr/xmaterials";
import { useSpring, animated } from "@react-spring/three";
import { transform, useMotionValue, useTransform } from "framer-motion";
import PKCanvas, {
  PKRootLayer,
  PKLayer,
  PKLink,
  HeadLocked,
} from "@/components/PKCanvas";
import {
  RootContainer,
  Container,
  noAnimation,
  Image,
  Text,
  DefaultStyleProvider,
} from "@coconut-xr/koestlich";
import {
  useEnterXR,
  NonImmersiveCamera,
  ImmersiveSessionOrigin,
  useInputSources,
} from "@coconut-xr/natuerlich/react";
import { getInputSourceId } from "@coconut-xr/natuerlich";
import { useControls } from "leva";

function Scene({ ...props }) {
  const variants = {
    variant_0: {
      offsetPosition: [0, 0, 0],
      imageUrl: "/tests/notif_0.png",
      id: "variant_0",
      anchor: "head-front-1",
      x: 0,
      y: 0,
      width: 96,
      height: 136,
    },
    variant_1: {
      offsetPosition: [0, 0, 0],
      imageUrl: "/tests/notif_1.png",
      id: "variant_1",
      anchor: "right-wrist",
      x: 0,
      y: 0,
      width: 340,
      height: 88,
      rotationX: 60 * (Math.PI / 180),
      rotationY: 210 * (Math.PI / 180),
      rotationZ: 90 * (Math.PI / 180),
    },
    variant_2: {
      offsetPosition: [0, 0, 0],
      imageUrl: "/tests/notif_1.png",
      id: "variant_1",
      anchor: "right-wrist",
      x: 0,
      y: 0,
      width: 340,
      height: 88,
      rotationX: 60 * (Math.PI / 180),
      rotationY: 210 * (Math.PI / 180),
      rotationZ: 90 * (Math.PI / 180),
    },
  };
  const variantKeys = Object.keys(variants);
  const [variantId, setVariantId] = useState(variantKeys[0]);

  const subjectRef = useRef<THREE.Mesh | null>(null);
  const setTargetName = useLerpTowards(subjectRef, "right-wrist", 0.1);

  const debugRef = useRef<THREE.Mesh | null>(null);
  useLerpTowards(debugRef, "head-front-1", 1);

  // const { hand } = useXR();
  const inputSources = useInputSources();

  const { scene } = useThree();
  useEffect(() => {
    console.log(variantId, variantKeys, variants);
    if (!variants[variantId]?.anchor) return;
    setTargetName(variants[variantId].anchor);
  }, [variantId]);

  const handHeadTransform = transform([0.3, 0.6], [400, 800]);
  const handSideTransform = transform([-0.2, 0.2], [-400, 500]);
  const glowY = useMotionValue(0.6);
  const glowX = useMotionValue(0);
  const wristRotationX = useMotionValue(0);
  const wristRotationY = useMotionValue(0);
  const wristRotationZ = useMotionValue(0);

  const watchState = useTransform(() => {
    const val = glowY.get();
    if (val < 0.2) {
      return 0;
    } else if (val < 0.3) {
      return 1;
    } else if (val < 0.4) {
      return 2;
    } else if (val < 0.5) {
      return 3;
    } else {
      return 4;
    }
  }); // 2

  useFrame(({ gl, camera }) => {
    let target1Obj, target2Obj;
    let target1Name = "head-front-0";
    let target2Name = "right-wrist";
    scene.traverse((object: THREE.Object3D) => {
      if (object.userData && object instanceof THREE.Mesh) {
        if (object.userData.name === target1Name) {
          target1Obj = object;
        } else if (object.userData.name === target2Name) {
          target2Obj = object;
        }
      }
    });
    if (target1Obj && target2Obj) {
      const headToWorldSpace = (localPosition) => {
        let centerPosition, centerQuaternion;
        let position = new THREE.Vector3(0, 0, 0);
        let rotation = new THREE.Quaternion();
        const frame = gl.xr.getFrame();
        // @ts-ignore
        const views = frame.getViewerPose(gl.xr.getReferenceSpace()).views;
        let leftMatrix = new THREE.Matrix4().fromArray(
          views[0].transform.matrix
        );
        let rightMatrix = new THREE.Matrix4().fromArray(
          views[1].transform.matrix
        );
        let leftPosition = new THREE.Vector3().setFromMatrixPosition(
          leftMatrix
        );
        let rightPosition = new THREE.Vector3().setFromMatrixPosition(
          rightMatrix
        );
        centerPosition = new THREE.Vector3()
          .addVectors(leftPosition, rightPosition)
          .multiplyScalar(0.5);

        // Get head rotation
        let leftQuaternion = new THREE.Quaternion().setFromRotationMatrix(
          leftMatrix
        );
        let rightQuaternion = new THREE.Quaternion().setFromRotationMatrix(
          rightMatrix
        );
        centerQuaternion = new THREE.Quaternion().slerpQuaternions(
          leftQuaternion,
          rightQuaternion,
          0.5
        );

        // const forward = new THREE.Vector3(0, 0, 1);
        // forward.applyQuaternion(centerQuaternion.quaternion);

        // Set the target position in front of the camera
        // const distanceInFrontOfCamera = 1;
        // centerPosition.add(forward.multiplyScalar(distanceInFrontOfCamera));

        position.copy(centerPosition);
        rotation.copy(centerQuaternion);
        position.add(localPosition.clone().applyQuaternion(centerQuaternion));

        position.copy(centerPosition);
        return [position, rotation];
      };

      let [position, rotation] = headToWorldSpace(target1Obj.position);
      let pos1 = position as THREE.Vector3;
      let pos2 = target2Obj.getWorldPosition(new THREE.Vector3());
      let dis = pos1.distanceTo(pos2);

      // let worldRot = target2Obj.parent.getWorldQuaternion(
      //   new THREE.Quaternion()
      // );
      // // let rot = target1Obj.worldToLocal(worldRot);
      // worldRot.matrix.copy(target1Obj.matrixWorld);
      // var scratchMat = new THREE.Matrix4();
      // worldRot.applyMatrix(target2Obj.parent.parent.matrixWorld.invert());
      // const rot = rotation
      var rot1 = new THREE.Euler(
        target2Obj.x - pos1.x,
        target2Obj.y - pos1.y,
        target2Obj.z - pos1.z,
        "XYZ" // This is the order of rotations
      );
      var object1Quaternion = target2Obj.quaternion;
      var object2Quaternion = rotation;
      // Calculate the quaternion that represents the rotation from object1 to object2
      var rot2 = object1Quaternion
        .clone()
        .conjugate()
        .multiply(object2Quaternion);

      glowX.set(pos2.x - pos1.x);
      glowY.set(dis);

      offsetRef.current = dis;

      // var rot = rotation; //new THREE.Quaternion(0, 0, 0, 0);
      // if (hand) {
      //   const wristJoint = hand.joints["wrist"];
      //   if (wristJoint) {
      //     rot = wristJoint.quaternion;
      //   }
      // }

      var euler1 = rotation;
      var euler2 = target2Obj.parent.rotation;
      // Calculate the difference in each axis
      var diffX = euler2.x - euler1.x;
      var diffY = euler2.y - euler1.y;
      var diffZ = euler2.z - euler1.z;
      var diffXInDegrees = diffX * (180 / Math.PI);
      var diffYInDegrees = diffY * (180 / Math.PI);
      var diffZInDegrees = diffZ * (180 / Math.PI);

      var quaternion1 = rotation;
      var quaternion2 = target2Obj.parent.quaternion;
      var diffQuaternion = (quaternion1 as THREE.Quaternion)
        .clone()
        .conjugate()
        .multiply(quaternion2);

      var euler = new THREE.Euler().setFromQuaternion(diffQuaternion, "XYZ");
      // Convert the Euler angles from radians to degrees
      var eulerInDegrees = {
        x: euler.x * (180 / Math.PI),
        y: euler.y * (180 / Math.PI),
        z: euler.z * (180 / Math.PI),
      };

      wristRotationX.set(eulerInDegrees.x);
      wristRotationY.set(eulerInDegrees.y);
      wristRotationZ.set(eulerInDegrees.z);
      // console.log(quaternion1, quaternion2, diffQuaternion);
      setLog(`debug: ${dis}
      ${pos1.x - pos2.x} --- ${rot1.x},${rot1.y},${rot1.z} --- ${rot2.x},${rot2.y},${rot2.z}
      `);
      // pos1:
      // ${pos1.x},
      // ${pos1.y},
      // ${pos1.z}
      // pos2:
      // ${pos2.x},
      // ${pos2.y},
      // ${pos2.z}`);
    }
  });
  const [log, setLog] = useState("Log");
  const offsetRef = useRef(0);

  const { name, disToFace } = useControls({
    name: "World",
    disToFace: {
      value: 1,
      min: 0,
      max: 1,
      step: 0.01,
      onChange: (v) => {
        glowY.set(v);
      },
      transient: false,
    },
  });
  const pogSize = useTransform(glowY, [0.6, 0.4, 0.2], [0, 24, 64]);
  const pogOpacity = useTransform(glowY, [0.6, 0.3, 0.2], [0, 0, 1]);
  const pogMargin = useTransform(glowY, [0.6, 0.3], [12, 80]);
  const notifProps = {
    margin: pogMargin.get(),
  };
  const pogProps = {
    width: watchState.get() < 3 ? 64 : 24,
    height: watchState.get() < 3 ? 64 : 24,
    opacity: watchState.get() < 3 ? 1 : 0,
    // margin: pogMargin.get(),
  };
  const pogAppSize = useTransform(glowY, [0.5, 0.4], [0, 24]);
  // const pogSize = useTransform(glowY, [ 0.6,0.3,], [20, 200]);

  const FancyMaterial = makeBorderMaterial(THREE.MeshPhongMaterial, {
    specular: 0xffffff,
    shininess: 100,
  });

  const buttonStyle = {
    material: FancyMaterial,
    backgroundColor: "#202c33",
    backgroundOpacity: 0.9,
    padding: 20,
    borderRadius: 40,
    borderColor: "white",
    borderBend: 0.3,
    border: 1,
    // width: "100%",
    animation: noAnimation,
  };
  const buttonTextStyle = {
    color: "white",
    fontSize: 20,
    animation: noAnimation,
    translateZ: 4,
  };

  return (
    <>
      <mesh position={[0, 1.5, 0]}>
        <mesh
          onClick={() => {
            const tryVariant = variantKeys[variantKeys.indexOf(variantId) + 1];
            console.log("tryIndex", tryVariant);
            const newVariant = tryVariant ? tryVariant : variantKeys[0];
            setVariantId(newVariant);
          }}
        >
          {/* <sphereGeometry />
        <meshBasicMaterial color="#f09" /> */}

          {/* <PKLayer
            name={"WhatsAppExample"}
            // width={1016}
            // height={728}
            // rootWidth={1016}
            // rootHeight={728}
            {...variants[variantId]}
            {...props}
            animation={noAnimation}
          ></PKLayer> */}

          {/* {variant == "variant_0" && (
          <PKLink
            name={"Conversation Row"}
            width={336}
            height={100}
            x={104}
            y={83}
            linkTo={"variant_1"}
            rootWidth={1016}
            rootHeight={728}
          />
        )}

        {variant == "variant_1" && (
          <PKLink
            onClick={() => {
              if (Object.keys(variants).indexOf("variant_0") > -1) {
                setVariant("variant_0");
              } else {
                console.log("variant doesn't exist");
              }
            }}
            name={"Conversation Row"}
            width={336}
            height={100}
            x={104}
            y={303}
            linkTo={"variant_0"}
            rootWidth={1016}
            rootHeight={728}
          />
        )} */}
          {/* <Navigation variant={variant} /> */}
        </mesh>
      </mesh>
      <pointLight position={[0, 2, 0]} intensity={0.8} color={"#FFF"} />
      <mesh position={[0, 1.5, -1]} ref={debugRef}>
        <RootContainer
          pixelSize={0.0007}
          precision={0.1}
          // position={offsetPosition}
          sizeX={880 * 0.0007}
          sizeY={640 * 0.0007}
        >
          <DefaultStyleProvider material={FancyMaterial}>
            <Container
              positionType="absolute"
              positionBottom={0}
              positionRight={0}
              borderRadius={999}
              // translateZ={00}
              // alignContent="flex-end"
              // justifyContent="flex-end"
              alignItems="flex-end"
              // width={pogSize.get()}
              // height={pogSize.get()}
              padding={0}
              gapRow={16}
              width={200}
              // overflow="hidden"
              // border={1}
              // backgroundColor={"#f09"}
              {...notifProps}
            >
              <Container
                // index={1}
                // positionType="absolute"
                // positionBottom={0}
                // positionRight={0}
                borderRadius={999}
                // border={1}
              >
                <Image
                  animation={noAnimation}
                  url={"/tests/ProfilePic.png"}
                  // width={"100%"}
                  // height={"100%"}
                  {...pogProps}
                />
                <Container
                  positionType="absolute"
                  positionBottom={0}
                  positionRight={0}
                  borderRadius={999}
                  margin={0}
                  width={pogAppSize.get()}
                  height={pogAppSize.get()}
                  // border={1}
                  // backgroundColor={"#f00"}
                  // translateZ={40}
                >
                  <Image
                    animation={noAnimation}
                    url={"/tests/WhatAppIcon.png"}
                    width={"100%"}
                    height={"100%"}
                  />
                </Container>
              </Container>

              <Container
                gapRow={16}
                width={227}
                height={watchState.get() < 2 ? "auto" : 0}
                animation={noAnimation}
                // overflow="scroll"
              >
                <Container
                  // animation={noAnimation}
                  // index={0}
                  borderRadius={40}
                  margin={0}
                  width={"100%"}
                  height={140}
                  // border={1}
                >
                  <Image
                    animation={noAnimation}
                    url={"/tests/MessageNotif.png"}
                    width={227}
                    height={140}
                  />
                </Container>
                <Container {...buttonStyle}>
                  <Text {...buttonTextStyle}>Great to hear!</Text>
                </Container>
                <Container {...buttonStyle}>
                  <Text {...buttonTextStyle}>Orchids, so romantic!</Text>
                </Container>
                <Container {...buttonStyle}>
                  <Text {...buttonTextStyle}>I don't know</Text>
                </Container>
              </Container>
            </Container>

            <Container
              width={880}
              height={640}
              overflow="hidden"
              padding={20}
              // border={1}
              // borderColor={"#f09"}
            >
              <Suspense>
                <Image
                  animation={noAnimation}
                  url={"/tests/Glow.png"}
                  // positionTop={Math.max(400, (offsetRef.current / 2) * 1800)}
                  positionTop={handHeadTransform(glowY.get())}
                  // positionLeft={handSideTransform(glowX.get())}
                  positionLeft={0}
                  width={1012}
                  height={730}
                  opacity={0.7}
                />
              </Suspense>
            </Container>
          </DefaultStyleProvider>
        </RootContainer>

        {/* Debug box */}
        {/* <RootContainer
          pixelSize={0.0007}
          precision={0.1}
          // position={offsetPosition}
          sizeX={400 * 0.0007}
          sizeY={400 * 0.0007}
        >
          <Container
            // positionLeft={-800}
            width={400}
            height={400}
            border={1}
            borderColor={"#f00"}
            backgroundColor={"#000"}
            backgroundOpacity={0.6}
            // backgroundColor={springs.color}
            overflow="hidden"
            padding={20}
            translateZ={-40}
          >
            <Text fontSize={44} index={1} id={"1"} color={"#FFF"}>
              {watchState.get().toString()}
            </Text>
            <Text fontSize={44} index={3} id={"3"} color={"#FFF"}>
              {wristRotationZ.get().toString().substring(8, 0)}
            </Text>
            <Text fontSize={44} index={4} id={"4"} color={"#FFF"}>
              {wristRotationX.get().toString().substring(8, 0)} /-----/
            </Text>
            <Text fontSize={44} index={5} id={"5"} color={"#FFF"}>
              {wristRotationY.get().toString().substring(8, 0)} /----/
            </Text>
          </Container>
        </RootContainer> */}
      </mesh>
    </>
  );
}

function useLerpTowards(
  subjectRef: MutableRefObject<THREE.Mesh | null>,
  targetName: string,
  speed: number
) {
  const { scene } = useThree();
  const [_targetName, setTargetName] = useState(targetName);
  useFrame(({ gl, camera }) => {
    let target;
    scene.traverse((object: THREE.Object3D) => {
      if (object.userData && object instanceof THREE.Mesh) {
        if (object.userData.name === _targetName) {
          target = object;
        }
      }
    });

    if (subjectRef.current && target) {
      // const targetPosition = target.getWorldPosition(new THREE.Vector3());
      // const targetPosition = target.position.clone();
      // const targetCameraPosition = camera.localToWorld(target.position.clone());
      // const resetPos = new THREE.Vector3(0, 0, 0);
      // const viewerPose = target.position.setFromMatrixPosition(
      //   camera.matrixWorld
      // );
      // console.log(target.position);
      // subjectRef.current.position.lerp(targetPosition, speed);
      // subjectRef.current.quaternion.slerp(camera.quaternion, speed);
      if (target.userData.name.indexOf("head-") == 0) {
        let centerPosition, centerQuaternion;
        let position = new THREE.Vector3(0, 0, 0);
        let rotation = new THREE.Quaternion();

        try {
          const frame = gl.xr.getFrame();
          //@ts-ignore
          const views = frame.getViewerPose(gl.xr.getReferenceSpace()).views;
          let leftMatrix = new THREE.Matrix4().fromArray(
            views[0].transform.matrix
          );
          let rightMatrix = new THREE.Matrix4().fromArray(
            views[1].transform.matrix
          );
          let leftPosition = new THREE.Vector3().setFromMatrixPosition(
            leftMatrix
          );
          let rightPosition = new THREE.Vector3().setFromMatrixPosition(
            rightMatrix
          );
          centerPosition = new THREE.Vector3()
            .addVectors(leftPosition, rightPosition)
            .multiplyScalar(0.5);

          // Get head rotation
          let leftQuaternion = new THREE.Quaternion().setFromRotationMatrix(
            leftMatrix
          );
          let rightQuaternion = new THREE.Quaternion().setFromRotationMatrix(
            rightMatrix
          );
          centerQuaternion = new THREE.Quaternion().slerpQuaternions(
            leftQuaternion,
            rightQuaternion,
            0.5
          );

          // const forward = new THREE.Vector3(0, 0, 1);
          // forward.applyQuaternion(centerQuaternion.quaternion);

          // Set the target position in front of the camera
          // const distanceInFrontOfCamera = 1;
          // centerPosition.add(forward.multiplyScalar(distanceInFrontOfCamera));

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
        } catch (e) {
          console.log(e);
        }
      } else {
        subjectRef.current.position.lerp(
          target.getWorldPosition(new THREE.Vector3()),
          speed
        );
        // let rightMatrix = new THREE.Matrix4().fromArray(
        //   target.transform.matrix
        // );
        // let rightQuaternion = new THREE.Quaternion().setFromRotationMatrix(
        //   rightMatrix
        // );
        let quat = target.getWorldQuaternion(new THREE.Quaternion());
        let rotation = new THREE.Quaternion();
        rotation = rotation.copy(quat);
        // rotation.copy(rightQuaternion);
        let newQuaternion = subjectRef.current.quaternion.slerp(
          rotation,
          speed
        );
        subjectRef.current.quaternion.copy(newQuaternion);
      }
    }
  });
  return setTargetName;
}

export default function Prototype() {
  return (
    <PKCanvas>
      <Scene />
    </PKCanvas>
  );
}

function WhatsAppExample({ ...props }) {
  const variants = {
    variant_0: {
      variantIndex: 0,
      imageUrl:
        "/uploads/layouts/fa1e29a064914eac8b858600e656f703/WhatsAppExample_WhatsAppExample_0.png",
      id: "variant_0",
      x: 0,
      y: 0,
      width: 1016,
      height: 728,
    },
    variant_1: {
      variantIndex: 1,
      imageUrl:
        "/uploads/layouts/fa1e29a064914eac8b858600e656f703/WhatsAppExample_WhatsAppExample_1.png",
      id: "variant_1",
      x: 0,
      y: 0,
      width: 1016,
      height: 728,
    },
  };
  const [variant, setVariant] = useState("variant_0");
  return (
    <>
      <PKLayer
        name={"WhatsAppExample"}
        width={1016}
        height={728}
        rootWidth={1016}
        rootHeight={728}
        {...variants[variant]}
        {...props}
      />
      {variant == "variant_0" && (
        <PKLink
          onClick={() => {
            if (Object.keys(variants).indexOf("variant_1") > -1) {
              setVariant("variant_1");
            } else {
              console.log("variant doesn't exist");
            }
          }}
          name={"Conversation Row"}
          width={336}
          height={100}
          x={104}
          y={83}
          linkTo={"variant_1"}
          rootWidth={1016}
          rootHeight={728}
        />
      )}

      {variant == "variant_1" && (
        <PKLink
          onClick={() => {
            if (Object.keys(variants).indexOf("variant_0") > -1) {
              setVariant("variant_0");
            } else {
              console.log("variant doesn't exist");
            }
          }}
          name={"Conversation Row"}
          width={336}
          height={100}
          x={104}
          y={303}
          linkTo={"variant_0"}
          rootWidth={1016}
          rootHeight={728}
        />
      )}
      <Navigation variant={variant} />
    </>
  );
}
function Navigation({ ...props }) {
  const variants = {
    variant_0: {
      variantIndex: 0,
      imageUrl:
        "/uploads/layouts/fa1e29a064914eac8b858600e656f703/WhatsAppExample_Navigation_0.png",
      id: "310:239654",
      x: -0.000012414034245011862,
      y: 7.999997027625568,
      width: 68.00001241403425,
      height: 284.00000297237443,
    },
    variant_1: {
      variantIndex: 1,
      imageUrl:
        "/uploads/layouts/fa1e29a064914eac8b858600e656f703/WhatsAppExample_Navigation_1.png",
      id: "310:238049",
      x: -0.000012414034245011862,
      y: 7.999997027625568,
      width: 68.00001241403425,
      height: 284.00000297237443,
    },
  };
  const [variant, setVariant] = useState("310:239654");
  return (
    <>
      <PKLayer
        name={"navigation"}
        width={68.00001241403425}
        height={284.00000297237443}
        x={-0.000012414034245011862}
        y={7.999997027625568}
        rootWidth={1016}
        rootHeight={728}
        {...variants[variant]}
        {...props}
      />
      <Icon1 variant={variant} />
      <Icon2 variant={variant} />
      <Icon3 variant={variant} />
      <Icon4 variant={variant} />
    </>
  );
}
function Icon1({ ...props }) {
  const variants = {
    variant_0: {
      variantIndex: 0,
      imageUrl:
        "/uploads/layouts/fa1e29a064914eac8b858600e656f703/WhatsAppExample_Icon1_0.png",
      id: "310:239665",
      x: 5.999997552162313,
      y: 231.99999755216226,
      width: 56.00000244783769,
      height: 56.000002447837744,
    },
    variant_1: {
      variantIndex: 1,
      imageUrl:
        "/uploads/layouts/fa1e29a064914eac8b858600e656f703/WhatsAppExample_Icon1_1.png",
      id: "310:238060",
      x: 5.999997552162256,
      y: 231.99999755216226,
      width: 56.000002447837744,
      height: 56.000002447837744,
    },
  };
  const [variant, setVariant] = useState("310:239665");
  return (
    <>
      <PKLayer
        name={"Icon1"}
        width={56.00000244783769}
        height={56.000002447837744}
        x={5.999997552162313}
        y={231.99999755216226}
        rootWidth={1016}
        rootHeight={728}
        {...variants[variant]}
        {...props}
      />
    </>
  );
}
function Icon2({ ...props }) {
  const variants = {
    variant_0: {
      variantIndex: 0,
      imageUrl:
        "/uploads/layouts/fa1e29a064914eac8b858600e656f703/WhatsAppExample_Icon2_0.png",
      id: "310:239663",
      x: 5.999997552162313,
      y: 159.99999755216226,
      width: 56.00000244783769,
      height: 56.000002447837744,
    },
    variant_1: {
      variantIndex: 1,
      imageUrl:
        "/uploads/layouts/fa1e29a064914eac8b858600e656f703/WhatsAppExample_Icon2_1.png",
      id: "310:238058",
      x: 5.999997552162256,
      y: 159.99999755216226,
      width: 56.000002447837744,
      height: 56.000002447837744,
    },
  };
  const [variant, setVariant] = useState("310:239663");
  return (
    <>
      <PKLayer
        name={"Icon2"}
        width={56.00000244783769}
        height={56.000002447837744}
        x={5.999997552162313}
        y={159.99999755216226}
        rootWidth={1016}
        rootHeight={728}
        {...variants[variant]}
        {...props}
      />
    </>
  );
}
function Icon3({ ...props }) {
  const variants = {
    variant_0: {
      variantIndex: 0,
      imageUrl:
        "/uploads/layouts/fa1e29a064914eac8b858600e656f703/WhatsAppExample_Icon3_0.png",
      id: "310:239659",
      x: 5.999997552162313,
      y: 87.99999755216226,
      width: 56.00000244783769,
      height: 56.000002447837744,
    },
    variant_1: {
      variantIndex: 1,
      imageUrl:
        "/uploads/layouts/fa1e29a064914eac8b858600e656f703/WhatsAppExample_Icon3_1.png",
      id: "310:238054",
      x: 5.999997552162256,
      y: 87.99999755216226,
      width: 56.000002447837744,
      height: 56.000002447837744,
    },
  };
  const [variant, setVariant] = useState("310:239659");
  return (
    <>
      <PKLayer
        name={"Icon3"}
        width={56.00000244783769}
        height={56.000002447837744}
        x={5.999997552162313}
        y={87.99999755216226}
        rootWidth={1016}
        rootHeight={728}
        {...variants[variant]}
        {...props}
      />
    </>
  );
}
function Icon4({ ...props }) {
  const variants = {
    variant_0: {
      variantIndex: 0,
      imageUrl:
        "/uploads/layouts/fa1e29a064914eac8b858600e656f703/WhatsAppExample_Icon4_0.png",
      id: "310:239655",
      x: 3.999997377316731,
      y: 11.999997377316731,
      width: 60.00000262268327,
      height: 60.00000262268327,
    },
    variant_1: {
      variantIndex: 1,
      imageUrl:
        "/uploads/layouts/fa1e29a064914eac8b858600e656f703/WhatsAppExample_Icon4_1.png",
      id: "310:238050",
      x: 3.999997377316731,
      y: 11.999997377316731,
      width: 60.00000262268327,
      height: 60.00000262268327,
    },
  };
  const [variant, setVariant] = useState("310:239655");
  return (
    <>
      <PKLayer
        name={"Icon4"}
        width={60.00000262268327}
        height={60.00000262268327}
        x={3.999997377316731}
        y={11.999997377316731}
        rootWidth={1016}
        rootHeight={728}
        {...variants[variant]}
        {...props}
      />
    </>
  );
}
