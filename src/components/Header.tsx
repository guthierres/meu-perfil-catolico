import logoHeader from '@/assets/logo-cabe-2.webp';

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

          <a
            href="/search"
            className="text-white/90 hover:text-white text-sm font-semibold px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all hover:scale-105"
          >
            Buscar
          </a>
        </div>
      </div>

      <div className="h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400" />
    </header>
  );
}
