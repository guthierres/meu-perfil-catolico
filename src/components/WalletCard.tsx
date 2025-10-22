import { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Cross, Calendar, Church, Sparkles, Download, Share2, Wallet } from 'lucide-react';
import { Profile } from '../types/profile';
import { getDisplayName, getCivilStatusLabel } from '../lib/profileUtils';
import { downloadWalletAsImage, shareWallet, saveToWallet } from '../utils/walletDownload';

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

  const handleSaveToWallet = async () => {
    if (!cardRef.current) return;
    try {
      await saveToWallet(cardRef.current, profile, profileUrl);
    } catch (error) {
      console.error('Error saving to wallet:', error);
      alert('Erro ao salvar na carteira. Tente novamente.');
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
            onClick={handleSaveToWallet}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-amber-600 to-orange-600 rounded-xl shadow-sm hover:shadow-md transition text-sm font-semibold text-white"
          >
            <Wallet className="w-4 h-4" />
            Salvar na Carteira
          </button>
        </div>
      </div>

      <div className="flex justify-center">
        <div
          ref={cardRef}
          className="relative rounded-2xl overflow-hidden shadow-2xl"
          style={{
            background: `linear-gradient(135deg, rgba(${primaryRgb}, 1) 0%, rgba(${secondaryRgb}, 1) 100%)`,
            width: '420px',
            height: '264px',
          }}
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-6 right-6 text-white">
              <Cross className="w-28 h-28" strokeWidth={0.5} />
            </div>
            <div className="absolute bottom-6 left-6 text-white">
              <Cross className="w-20 h-20" strokeWidth={0.5} />
            </div>
          </div>

          <div className="relative h-full px-6 py-5 flex flex-col text-white">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h2 className="text-xs font-bold uppercase tracking-wider opacity-90 mb-1">
                  Carteirinha Católica
                </h2>
                <div className="flex items-center gap-1.5 text-[10px] opacity-80">
                  <Cross className="w-3 h-3" />
                  <span>Católico Apostólico Romano</span>
                </div>
              </div>
              {profile.profile_image_url && (
                <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-white/40 shadow-xl flex-shrink-0 ml-3">
                  <img
                    src={profile.profile_image_url}
                    alt="Foto"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="mb-3">
                <p className="text-[9px] opacity-70 uppercase tracking-wider mb-0.5 font-semibold">Nome Completo</p>
                <p className="text-base font-bold leading-tight">
                  {profile.full_name}
                </p>
              </div>

              {profile.civil_status && (
                <div className="mb-3">
                  <p className="text-[9px] opacity-70 uppercase tracking-wider mb-0.5 font-semibold">Estado Civil</p>
                  <p className="text-xs font-semibold">
                    {getCivilStatusLabel(profile.civil_status)}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                {profile.parish && (
                  <div>
                    <div className="flex items-center gap-1 opacity-70 mb-0.5">
                      <Church className="w-2.5 h-2.5" />
                      <span className="text-[9px] uppercase tracking-wider font-semibold">Paróquia</span>
                    </div>
                    <p className="font-semibold text-[11px] leading-tight">{profile.parish}</p>
                  </div>
                )}

                {profile.baptism_date && (
                  <div>
                    <div className="flex items-center gap-1 opacity-70 mb-0.5">
                      <Calendar className="w-2.5 h-2.5" />
                      <span className="text-[9px] uppercase tracking-wider font-semibold">Batismo</span>
                    </div>
                    <p className="font-semibold text-[11px]">
                      {new Date(profile.baptism_date).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                )}

                {profile.patron_saint && (
                  <div className="col-span-2">
                    <div className="flex items-center gap-1 opacity-70 mb-0.5">
                      <Sparkles className="w-2.5 h-2.5" />
                      <span className="text-[9px] uppercase tracking-wider font-semibold">Santo de Devoção</span>
                    </div>
                    <p className="font-semibold text-[11px]">{profile.patron_saint}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-auto pt-3 border-t border-white/30">
              <div className="flex items-end justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] opacity-70 uppercase tracking-wider mb-0.5 font-semibold">Perfil Online</p>
                  <p className="text-[10px] font-mono opacity-90 truncate">
                    {profile.slug ? `${window.location.host}/p/${profile.slug}` : 'Sem link'}
                  </p>
                </div>
                {profile.slug && (
                  <div className="bg-white p-1.5 rounded-lg shadow-lg flex-shrink-0">
                    <QRCodeSVG
                      value={profileUrl}
                      size={52}
                      level="H"
                      includeMargin={false}
                    />
                  </div>
                )}
              </div>
            </div>
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
