import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import StatusBar from "../components/StatusBar";

export default function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <Topbar onMenuClick={() => setIsSidebarOpen(true)} />

      <div className="flex flex-1">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {isSidebarOpen && (
          <button
            aria-label="Fechar menu lateral"
            className="fixed inset-0 z-20 bg-black/40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <div className="flex-1 flex flex-col">
          <StatusBar />
          <main className="flex-1 overflow-auto px-4 py-3 sm:px-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
