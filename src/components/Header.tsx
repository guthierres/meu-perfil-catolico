import { Church } from 'lucide-react';

interface HeaderProps {
  onLogoClick?: () => void;
}

export function Header({ onLogoClick }: HeaderProps) {
  const handleLogoClick = () => {
    if (onLogoClick) {
      onLogoClick();
    } else {
      window.location.href = '/';
    }
  };

  return (
    <header className="bg-gradient-to-r from-amber-900 via-orange-900 to-amber-900 shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={handleLogoClick}
            className="group flex items-center gap-3 hover:scale-105 transition-transform duration-300"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
              <div className="relative bg-white/10 backdrop-blur-sm p-3 rounded-2xl border-2 border-white/30 group-hover:bg-white/20 transition-all">
                <Church className="w-8 h-8 text-white" strokeWidth={2.5} />
              </div>
            </div>
            <div className="text-left">
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight group-hover:tracking-wide transition-all">
                CATOLID
              </h1>
              <p className="text-xs text-amber-200 font-medium hidden sm:block">
                Sua Identidade Católica Digital
              </p>
            </div>
          </button>

          <a
            href="/search"
            className="text-white/90 hover:text-white text-sm font-semibold px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all hover:scale-105"
          >
            Buscar Carteirinha
          </a>
        </div>
      </div>

      <div className="h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400" />
    </header>
  );
}
