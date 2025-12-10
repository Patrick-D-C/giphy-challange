import { NavLink } from "react-router-dom";
import { Home, Star, Grid2x2, Info, X } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinkBase =
  "flex items-center gap-3 px-4 py-2 rounded-md text-md font-semibold transition-all duration-150";
const navLinkInactive =
  "text-slate-300 hover:bg-slate-800 hover:text-white hover:translate-x-1";
const navLinkActive =
  "bg-blue-600 text-white translate-x-1 shadow-sm";

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 w-64 bg-slate-900 text-slate-100 p-4 border-r border-slate-800 transform transition-transform duration-200 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:static lg:translate-x-0 lg:w-56 lg:min-h-screen`}
    >
      <div className="flex items-center justify-between mb-4 lg:hidden">
        <span className="font-semibold text-white">Menu</span>
        <button
          onClick={onClose}
          aria-label="Fechar menu"
          className="p-1 rounded-md hover:bg-slate-800"
        >
          <X size={18} />
        </button>
      </div>

      <nav className="space-y-1">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `${navLinkBase} ${
              isActive ? navLinkActive : navLinkInactive
            }`
          }
          onClick={onClose}
        >
          <Home size={18} className="shrink-0" />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            `${navLinkBase} ${
              isActive ? navLinkActive : navLinkInactive
            }`
          }
          onClick={onClose}
        >
          <Star size={18} className="shrink-0" />
          <span>Favoritos</span>
        </NavLink>

        <NavLink
          to="/categories"
          className={({ isActive }) =>
            `${navLinkBase} ${
              isActive ? navLinkActive : navLinkInactive
            }`
          }
          onClick={onClose}
        >
          <Grid2x2 size={18} className="shrink-0" />
          <span>Categorias</span>
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            `${navLinkBase} ${
              isActive ? navLinkActive : navLinkInactive
            }`
          }
          onClick={onClose}
        >
          <Info size={18} className="shrink-0" />
          <span>Sobre</span>
        </NavLink>
      </nav>
    </aside>
  );
}
