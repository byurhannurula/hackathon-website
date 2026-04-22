import { IS_SHOWCASE_MODE } from "@/lib";
import { EventLanding } from "@/components/event-landing";
import { ShowcasePageContent } from "@/components/showcase-page-content";

export default function Page() {
  if (IS_SHOWCASE_MODE) return <ShowcasePageContent />;
  return <EventLanding />;
}
