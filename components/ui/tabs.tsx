"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

export function Tabs({ children }: { children: React.ReactNode }) { return <div>{children}</div>; }
export function TabsList({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("inline-flex rounded-md bg-slate-100 p-1", className)} {...props} />;
}
export function TabsTrigger({ active, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }) {
  return <button className={cn("rounded px-3 py-1.5 text-sm", active ? "bg-white shadow" : "text-slate-600", className)} {...props} />;
}
