import { useState, useEffect, useRef } from 'react';
import { Menu, X, Search, LogIn, User, LogOut } from 'lucide-react';
import logoHeader from '../assets/logo-cabe-2.webp';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface HeaderProps {
  onLogoClick?: () => void;
}

export function Header({ onLogoClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const { user, signOut } = useAuth();
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        const { data } = await supabase
          .from('profiles')
          .select('profile_image_url')
          .eq('user_id', user.id)
          .maybeSingle();

        if (data?.profile_image_url) {
          setProfilePhoto(data.profile_image_url);
        }
      };
      fetchProfile();
    }
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogoClick = () => {
    if (onLogoClick) {
      onLogoClick();
    } else {
      window.location.href = '/';
    }
  };

  const closeMenu = () => setIsMenuOpen(false);

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/';
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

          <div className="hidden md:flex items-center gap-3">
            <a
              href="/search"
              className="text-white/90 hover:text-white text-sm font-semibold px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all hover:scale-105"
            >
              Buscar
            </a>
            {user ? (
              <div className="relative" ref={profileMenuRef}>
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/30 hover:border-white/60 transition-all hover:scale-105"
                  aria-label="Menu do perfil"
                >
                  {profilePhoto ? (
                    <img src={profilePhoto} alt="Perfil" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-white/20 flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                  )}
                </button>

                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg overflow-hidden animate-in slide-in-from-top-2 duration-200">
                    <a
                      href="/profile"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors text-gray-700 font-medium"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <User className="w-5 h-5" />
                      Meu Perfil
                    </a>
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors text-gray-700 font-medium text-left"
                    >
                      <LogOut className="w-5 h-5" />
                      Sair
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <a
                href="/login"
                className="text-white/90 hover:text-white text-sm font-semibold px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all hover:scale-105"
              >
                Entrar
              </a>
            )}
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
            {user ? (
              <>
                <a
                  href="/profile"
                  onClick={closeMenu}
                  className="flex items-center gap-3 text-white/90 hover:text-white hover:bg-white/10 px-4 py-3 rounded-xl transition-all font-semibold"
                >
                  <User className="w-5 h-5" />
                  Meu Perfil
                </a>
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 text-white/90 hover:text-white hover:bg-white/10 px-4 py-3 rounded-xl transition-all font-semibold text-left"
                >
                  <LogOut className="w-5 h-5" />
                  Sair
                </button>
              </>
            ) : (
              <a
                href="/login"
                onClick={closeMenu}
                className="flex items-center gap-3 text-white/90 hover:text-white hover:bg-white/10 px-4 py-3 rounded-xl transition-all font-semibold"
              >
                <LogIn className="w-5 h-5" />
                Entrar
              </a>
            )}
          </div>
        )}
      </div>

      <div className="h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400" />
    </header>
  );
}
