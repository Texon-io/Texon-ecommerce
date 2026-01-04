import { TriangleAlert } from "lucide-react";

export function PageError({ message }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-center">
      <TriangleAlert className="h-9 w-9 text-destructive" />
      <p className="text-lg text-muted-foreground">
        {message || "Something went wrong"}
      </p>
    </div>
  );
}
