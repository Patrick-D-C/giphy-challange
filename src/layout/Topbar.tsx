import { Menu, User } from "lucide-react";
import Logo from "../components/Logo";

interface TopbarProps {
  onMenuClick?: () => void;
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  return (
    <header className="h-14 flex items-center justify-between px-3 sm:px-4 bg-blue-700">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Abrir menu"
          className="lg:hidden rounded-md p-2 text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-white/60"
        >
          <Menu size={20} />
        </button>
        <Logo />
      </div>

      <div className="text-sm sm:text-md font-semibold text-white flex gap-2 sm:gap-3 items-center">
        <span className="hidden sm:inline">Patrick Cremonese</span>
        <User
          size={34}
          className="shrink-0 rounded-full text-slate-900 bg-white p-1"
        />
      </div>
    </header>
  );
}
