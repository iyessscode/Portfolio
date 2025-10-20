import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";

type LoadingSwapProps = {
  isLoading: boolean;
  className?: string;
  children: React.ReactNode;
};

export const LoadingSwap = ({
  isLoading,
  className,
  children,
}: LoadingSwapProps) => {
  return (
    <div className="grid items-center justify-items-center">
      <div
        className={cn(
          "col-start-1 col-end-1 row-start-1 row-end-1",
          isLoading ? "invisible" : "visible",
          className,
        )}
      >
        {children}
      </div>

      <div
        className={cn(
          "col-start-1 col-end-1 row-start-1 row-end-1",
          isLoading ? "visible" : "invisible",
          className,
        )}
      >
        <Loader2Icon className="animate-spin" />
      </div>
    </div>
  );
};
