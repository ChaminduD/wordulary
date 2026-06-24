"use client";

type ConfirmDeleteButtonProps = {
    label?: string;
};

export function ConfirmDeleteButton({ label = "Delete", }: ConfirmDeleteButtonProps) {
    return (
        <button
            type="submit"
            className="rounded border px-3 py-1 text-sm"
            onClick={(event) => {
                const confirmed = window.confirm("Delete this term?");

                if (!confirmed) {
                    event.preventDefault();
                }
            }}
        >
            {label}
        </button>
    );
}