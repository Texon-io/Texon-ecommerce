import { SearchX } from "lucide-react";
import Button from "@/components/ui/Button";

function EmptyState({
                        title = "No results found",
                        description = "Try adjusting your search or filters.",
                        icon: Icon = SearchX,
                        actionLabel,
                        onAction,
                    }) {
    return (
        <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
            <div className="flex items-center justify-center size-18 rounded-4xl bg-muted">
                <Icon className="size-8 text-muted-foreground" />
            </div>

            <div className="space-y-1">
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground max-w-sm">
                    {description}
                </p>
            </div>

            {actionLabel && onAction && (
                <Button
                    variant="outline"
                    onClick={onAction}
                    className="mt-4"
                >
                    {actionLabel}
                </Button>
            )}
        </div>
    );
}

export default EmptyState;
