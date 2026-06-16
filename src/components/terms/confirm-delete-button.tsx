"use client";

type ConfirmDeleteButtonProps = {
    label?: string;
};

export function ConfirmDeleteButton({ label = "Delete", }: ConfirmDeleteButtonProps) {
    return (
        <button
            type="submit"
            className="text-sm"
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