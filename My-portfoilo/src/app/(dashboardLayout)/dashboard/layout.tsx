"use client";
import MobileSideBar from "@/components/CustomUi/MobileSideBar";
import SideBar from "@/components/dashboard/sidebar";
import TopBar from "@/components/dashboard/TopBar";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ backgroundColor: "#f9f9f9" }}>
      <div
        style={{ height: "100vh", display: "flex", flexDirection: "column" }}
      >
        <TopBar />
        <div style={{ display: "flex", flex: 1 }}>
          {/* desktop sidebae */}
          <div className="hidden xl:flex items-center gap-8">
            <div style={{ width: "140px", flexShrink: 0 }}>
              <SideBar />
            </div>
          </div>
          {/* mobile Nav */}
          <div className="xl:hidden">
            <div style={{ flexShrink: 0 }}>
              <MobileSideBar />
            </div>
          </div>
          <main
            style={{
              flex: 1,
              padding: "2rem",
              paddingLeft: "10rem",
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
    </div>
  );
}
