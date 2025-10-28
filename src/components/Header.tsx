import { useState } from 'react';
import { Menu, X, Search, LogIn } from 'lucide-react';
import logoHeader from '@/assets/logo-cabe-2.webp';

interface HeaderProps {
  onLogoClick?: () => void;
}

export function Header({ onLogoClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogoClick = () => {
    if (onLogoClick) {
      onLogoClick();
    } else {
      window.location.href = '/';
    }
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="bg-gradient-to-r from-amber-900 via-orange-900 to-amber-900 shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={handleLogoClick}
            className="group flex items-center gap-2 hover:scale-105 transition-transform duration-300"
          >
            <img
              src={logoHeader}
              alt="CATOLID"
              className="h-10 sm:h-12 md:h-14 w-auto object-contain"
            />
          </button>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="/search"
              className="text-white/90 hover:text-white text-sm font-semibold px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all hover:scale-105"
            >
              Buscar
            </a>
            <a
              href="/login"
              className="text-white/90 hover:text-white text-sm font-semibold px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all hover:scale-105"
            >
              Entrar
            </a>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2 animate-in slide-in-from-top-2 duration-200">
            <a
              href="/search"
              onClick={closeMenu}
              className="flex items-center gap-3 text-white/90 hover:text-white hover:bg-white/10 px-4 py-3 rounded-xl transition-all font-semibold"
            >
              <Search className="w-5 h-5" />
              Buscar
            </a>
            <a
              href="/login"
              onClick={closeMenu}
              className="flex items-center gap-3 text-white/90 hover:text-white hover:bg-white/10 px-4 py-3 rounded-xl transition-all font-semibold"
            >
              <LogIn className="w-5 h-5" />
              Entrar
            </a>
          </div>
        )}
      </div>

      <div className="h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400" />
    </header>
  );
}
