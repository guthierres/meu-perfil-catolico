import { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Cross, Calendar, Church, Sparkles, Download, Share2, Wallet } from 'lucide-react';
import { Profile } from '../types/profile';
import { getDisplayName, getCivilStatusLabel } from '../lib/profileUtils';
import { downloadWalletAsImage, shareWallet } from '../utils/walletDownload';

interface WalletCardProps {
  profile: Profile;
}

export function WalletCard({ profile }: WalletCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const baseUrl = window.location.origin;
  const profileUrl = profile.slug ? `${baseUrl}/p/${profile.slug}` : baseUrl;

  const handleDownload = async () => {
    if (!cardRef.current) return;
    try {
      await downloadWalletAsImage(cardRef.current, `carteira-${profile.slug || 'catolica'}.png`);
    } catch (error) {
      console.error('Error downloading wallet:', error);
      alert('Erro ao baixar a carteira. Tente novamente.');
    }
  };

  const handleShare = async () => {
    if (!cardRef.current) return;
    try {
      await shareWallet(cardRef.current, `Carteirinha Católica - ${profile.full_name}`);
    } catch (error) {
      console.error('Error sharing wallet:', error);
      alert('Erro ao compartilhar a carteira. Tente novamente.');
    }
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
      : '128, 128, 128';
  };

  const primaryRgb = hexToRgb(profile.primary_color);
  const secondaryRgb = hexToRgb(profile.secondary_color);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
        <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
          <Wallet className="w-5 h-5 text-amber-600" />
          Adicionar à Carteira Digital
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Salve sua carteirinha católica e tenha acesso rápido mesmo offline
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={handleDownload}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-white rounded-xl shadow-sm hover:shadow-md transition text-sm font-semibold text-gray-700 border border-gray-200"
          >
            <Download className="w-4 h-4" />
            Baixar Imagem
          </button>
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-white rounded-xl shadow-sm hover:shadow-md transition text-sm font-semibold text-gray-700 border border-gray-200"
          >
            <Share2 className="w-4 h-4" />
            Compartilhar
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-amber-600 to-orange-600 rounded-xl shadow-sm hover:shadow-md transition text-sm font-semibold text-white"
          >
            <Wallet className="w-4 h-4" />
            Salvar na Carteira
          </button>
        </div>
      </div>

      <div
        ref={cardRef}
        className="relative w-full max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white/50"
        style={{
          background: `linear-gradient(135deg, rgba(${primaryRgb}, 1) 0%, rgba(${secondaryRgb}, 1) 100%)`,
          aspectRatio: '1.586',
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4 text-white">
            <Cross className="w-32 h-32" strokeWidth={0.5} />
          </div>
          <div className="absolute bottom-4 left-4 text-white">
            <Cross className="w-24 h-24" strokeWidth={0.5} />
          </div>
        </div>

        <div className="relative h-full p-6 flex flex-col text-white">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider opacity-90 mb-1">
                Carteirinha Católica
              </h2>
              <div className="flex items-center gap-1 text-xs opacity-80">
                <Cross className="w-3 h-3" />
                <span>Católico Apostólico Romano</span>
              </div>
            </div>
            {profile.profile_image_url && (
              <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-white/30 shadow-lg flex-shrink-0">
                <img
                  src={profile.profile_image_url}
                  alt="Foto"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          <div className="flex-1 space-y-3">
            <div>
              <p className="text-xs opacity-70 uppercase tracking-wide mb-1">Nome</p>
              <p className="text-lg font-bold leading-tight">
                {getDisplayName(profile.full_name, profile.civil_status)}
              </p>
              {profile.civil_status && (
                <p className="text-xs opacity-80 mt-0.5">
                  {getCivilStatusLabel(profile.civil_status)}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              {profile.parish && (
                <div>
                  <div className="flex items-center gap-1 opacity-70 mb-1">
                    <Church className="w-3 h-3" />
                    <span className="uppercase tracking-wide">Paróquia</span>
                  </div>
                  <p className="font-semibold leading-tight">{profile.parish}</p>
                </div>
              )}

              {profile.baptism_date && (
                <div>
                  <div className="flex items-center gap-1 opacity-70 mb-1">
                    <Calendar className="w-3 h-3" />
                    <span className="uppercase tracking-wide">Batismo</span>
                  </div>
                  <p className="font-semibold">
                    {new Date(profile.baptism_date).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              )}

              {profile.patron_saint && (
                <div className="col-span-2">
                  <div className="flex items-center gap-1 opacity-70 mb-1">
                    <Sparkles className="w-3 h-3" />
                    <span className="uppercase tracking-wide">Santo de Devoção</span>
                  </div>
                  <p className="font-semibold">{profile.patron_saint}</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-end justify-between mt-4 pt-4 border-t border-white/20">
            <div className="flex-1">
              <p className="text-xs opacity-70 uppercase tracking-wide mb-1">Acesse o perfil</p>
              <p className="text-xs font-mono opacity-90 break-all">
                {profile.slug ? `/p/${profile.slug}` : 'Sem link público'}
              </p>
            </div>
            {profile.slug && (
              <div className="ml-4 bg-white p-2 rounded-lg">
                <QRCodeSVG
                  value={profileUrl}
                  size={64}
                  level="M"
                  includeMargin={false}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
        <h4 className="font-semibold text-gray-800 mb-3">💡 Como usar sua carteirinha:</h4>
        <div className="text-sm space-y-2 text-gray-600">
          <p><strong>📱 iOS (iPhone):</strong> Baixe a imagem e adicione às fotos favoritas ou como papel de parede da tela de bloqueio</p>
          <p><strong>🤖 Android:</strong> Salve a imagem e adicione como papel de parede da tela de bloqueio para acesso rápido</p>
          <p><strong>💻 Computador:</strong> Salve a imagem e mantenha em uma pasta de fácil acesso</p>
        </div>
      </div>
    </div>
  );
}
