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
export default function Layout() {
  return (
    <Fullscreen>
      <Button>
        <Text>I am red.</Text>
      </Button>
      <Badge>
        <Text>Badge</Text>
      </Badge>
    </Fullscreen>
  );
}
