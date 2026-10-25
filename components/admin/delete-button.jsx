"use client";

export function DeleteButton({ action }) {
  return (
    <form
      action={action}
      onSubmit={(e) => { if (!confirm("Delete this permanently?")) e.preventDefault(); }}
    >
      <button className="text-sm text-mute hover:text-signal">Delete</button>
    </form>
  );
}