import { Spinner } from "./spinner";

export function PageSpinner() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-background">
      <Spinner className="h-8 w-8" />
    </div>
  );
}