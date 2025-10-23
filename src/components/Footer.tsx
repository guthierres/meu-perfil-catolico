import { Church } from 'lucide-react';

interface FooterProps {
  onPrivacyClick?: () => void;
  onTermsClick?: () => void;
}

export function Footer({ onPrivacyClick, onTermsClick }: FooterProps) {
  return (
    <footer className="bg-gradient-to-r from-amber-900 to-orange-900 text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Church className="w-6 h-6" />
            <span className="font-semibold text-lg">ID Católico</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            {onPrivacyClick && (
              <button
                onClick={onPrivacyClick}
                className="hover:text-amber-200 transition-colors underline-offset-4 hover:underline"
              >
                Política de Privacidade
              </button>
            )}
            {onTermsClick && (
              <button
                onClick={onTermsClick}
                className="hover:text-amber-200 transition-colors underline-offset-4 hover:underline"
              >
                Termos de Uso
              </button>
            )}
          </div>

          <div className="text-sm text-amber-200">
            © 2025 ID Católico
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-amber-700/50 text-center text-xs text-amber-200">
          <p>
            Desenvolvido com fé para a comunidade católica
          </p>
        </div>
      </div>
    </footer>
  );
}
