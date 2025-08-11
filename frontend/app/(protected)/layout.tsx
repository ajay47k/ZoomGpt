"use client";

import { PageSpinner } from "@/components/ui/page-spinner";
import useAuth from "@/hooks/useAuth";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

export default function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return <PageSpinner />;
  }

  if (!user) {
    redirect("/login");
  }

  return <>{children}</>;
}
