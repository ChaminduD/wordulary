"use client";

import { Trash2 } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type ConfirmDeleteDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    itemName: string;
    itemType?: string;
    description?: string;
    confirmLabel?: string;
    onConfirm: () => void;
};

export function ConfirmDeleteDialog({
    open,
    onOpenChange,
    itemName,
    itemType = "Item",
    description = "This action cannot be undone.",
    confirmLabel = "Delete",
    onConfirm,
}: ConfirmDeleteDialogProps) {
    return (
        <AlertDialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <AlertDialogContent>
                <AlertDialogHeader className="flex flex-row items-start gap-4">
                    <AlertDialogMedia className="size-9 shrink-0 text-destructive">
                        <Trash2 className="size-6" />
                    </AlertDialogMedia>

                    <div className="flex-1 space-y-1.5">
                        <AlertDialogTitle>
                            Delete {itemType}
                        </AlertDialogTitle>

                        <AlertDialogDescription className="space-y-2">
                            <p>
                                Are you sure you want to delete{" "}
                                <strong className="font-medium text-foreground">
                                    &quot;{itemName}&quot;
                                </strong>
                                ?
                            </p>

                            <p>{description}</p>
                        </AlertDialogDescription>
                    </div>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                        variant="destructive"
                        onClick={onConfirm}
                    >
                        {confirmLabel}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}