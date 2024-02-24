import { Spinner } from "@nextui-org/react";

export default function loading() {
  return (
    <div className="w-screen h-screen overflow-hidden flex justify-center items-center">
      <Spinner label="Loading..." />
    </div>
  );
}
