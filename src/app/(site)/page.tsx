import { IS_SHOWCASE_MODE } from "@/lib";
import { EventLanding, Showcase } from "@/components/views";

export default function Page() {
  if (IS_SHOWCASE_MODE) return <Showcase />;
  return <EventLanding />;
}
