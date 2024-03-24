import { DefaultProperties } from "@react-three/uikit";
import React, { ComponentPropsWithoutRef } from "react";
import { Color, MeshPhongMaterial } from "three";

export class GlassMaterial extends MeshPhongMaterial {
  constructor() {
    super({
      specular: "#555",
      shininess: 100,
    });
  }
}

function hsl(h: number, s: number, l: number) {
  return new Color().setHSL(h / 360, s / 100, l / 100, "srgb");
}

export const colors = {
  foreground: hsl(0, 0, 100),
  background: hsl(0, 0, 0),
  card: hsl(0, 0, 53),
  cardForeground: hsl(0, 0, 100),
  accent: hsl(210, 100, 52),
  accentForeground: hsl(0, 0, 100),

  popover: hsl(0, 0, 0),
  popoverForeground: hsl(0, 0, 100),
  primary: hsl(210, 40, 98),
  primaryForeground: hsl(222.2, 47.4, 11.2),
  secondary: hsl(217.2, 32.6, 17.5),
  secondaryForeground: hsl(210, 40, 98),
  muted: hsl(217.2, 32.6, 17.5),
  mutedForeground: hsl(215, 20.2, 65.1),
  // accent: hsl(217.2, 32.6, 17.5),
  // accentForeground: hsl(210, 40, 98),
  destructive: hsl(0, 62.8, 30.6),
  destructiveForeground: hsl(210, 40, 98),
  border: hsl(217.2, 32.6, 17.5),
  input: hsl(217.2, 32.6, 17.5),
  ring: hsl(212.7, 26.8, 83.9),
};

export function Defaults(
  props: ComponentPropsWithoutRef<typeof DefaultProperties>
) {
  return (
    <DefaultProperties
      scrollbarColor={colors.background}
      scrollbarBorderRadius={4}
      scrollbarOpacity={0.3}
      color={colors.background}
      borderColor={colors.border}
      fontWeight="medium"
      {...props}
    />
  );
}
