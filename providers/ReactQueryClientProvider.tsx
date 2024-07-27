"use client";

// react
import React from "react";
// react query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const ReactQueryClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const q = new QueryClient();

  return <QueryClientProvider client={q}>{children}</QueryClientProvider>;
};

export default ReactQueryClientProvider;
