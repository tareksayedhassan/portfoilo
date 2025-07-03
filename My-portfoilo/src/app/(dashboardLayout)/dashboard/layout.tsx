"use client";
import SideBar from "@/components/dashboard/sidebar";
import TopBar from "@/components/dashboard/TopBar";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <TopBar />
      <div style={{ display: "flex", flex: 1 }}>
        <div style={{ width: "180px", flexShrink: 0 }}>
          <SideBar />
        </div>

        <main
          style={{
            flex: 1,
            padding: "3rem",
            backgroundColor: "#f9f9f9",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "1200px",
              marginTop: "4rem",
            }}
          >
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
