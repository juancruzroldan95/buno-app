import { Loader2 } from "lucide-react";

type SpinnerSize = "small" | "medium" | "large";

const sizeMap: Record<SpinnerSize, string> = {
  small: "h-4 w-4",
  medium: "h-6 w-6",
  large: "h-10 w-10",
};

export default function Spinner({
  size = "medium",
  className = "",
}: {
  size?: SpinnerSize;
  className?: string;
}) {
  return (
    <div className="flex items-center justify-center">
      <Loader2
        className={`animate-spin text-primary ${sizeMap[size]} ${className}`}
        role="status"
      />
      <span className="sr-only">Cargando...</span>
    </div>
  );
}
