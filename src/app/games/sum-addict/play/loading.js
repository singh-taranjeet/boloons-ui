import { PulseLoading } from "@/app/components/PulseLoading";
import { Card } from "@/app/components/Card";
export default function Loading() {
  return (
    <Card className="m-normal">
      <PulseLoading />
    </Card>
  );
}
