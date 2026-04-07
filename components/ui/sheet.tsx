"use client";
import * as React from "react";

export function Sheet({ trigger, children }: { trigger: React.ReactNode; children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <div onClick={() => setOpen(true)}>{trigger}</div>
      {open && (
        <div className="fixed inset-0 z-50 bg-black/30" onClick={() => setOpen(false)}>
          <div className="h-full w-72 bg-white p-4" onClick={(e) => e.stopPropagation()}>{children}</div>
        </div>
      )}
    </>
  );
}
