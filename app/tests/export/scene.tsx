import { useEffect, useState } from "react";
import {
  Root,
  Fullscreen,
  Container,
  Text,
  Image,
  Content,
} from "@react-three/uikit";
import { Button } from "@/app/components/button";
import { Badge } from "@/app/components/badge";
import UI from "../../import/ui";
export default function Layout() {
  const [fullscreen, setFullscreen] = useState(true);
  return (
    <>
      <Fullscreen>
        <UI
          onSwitch={(fullscreen) => {
            console.log("fullscreen", fullscreen);
            setFullscreen(fullscreen);
          }}
        />
        <Button>
          <Text>I am red.</Text>
        </Button>
        <Badge>
          <Text>Badge</Text>
        </Badge>
      </Fullscreen>
    </>
  );
}
