import { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Church, Calendar, User, Star, Download, Share2, Wallet } from 'lucide-react';
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
          className="relative rounded-3xl overflow-hidden shadow-2xl"
          style={{
            background: `linear-gradient(135deg, rgb(114, 137, 169) 0%, rgb(125, 147, 178) 100%)`,
            width: '390px',
            height: '650px',
          }}
        >
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute top-8 right-8">
              <Church className="w-32 h-32 text-white" strokeWidth={1} />
            </div>
            <div className="absolute bottom-16 left-8 rotate-12">
              <Church className="w-24 h-24 text-white" strokeWidth={1} />
            </div>
            <div className="absolute top-1/3 left-1/4 -rotate-45">
              <Church className="w-20 h-20 text-white" strokeWidth={0.8} />
            </div>
          </div>

          <div className="relative h-full px-8 py-8 flex flex-col text-white">
            <div className="flex items-start justify-between mb-8">
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                  Carteirinha Católica
                </h2>
                <div className="flex items-center gap-2 text-sm opacity-90">
                  <Church className="w-5 h-5" />
                  <span style={{ fontFamily: 'system-ui, sans-serif' }}>Católico Apostólico Romano</span>
                </div>
              </div>
              <Church className="w-10 h-10 opacity-90" />
            </div>

            {profile.profile_image_url && (
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/30 shadow-xl">
                  <img
                    src={profile.profile_image_url}
                    alt="Foto"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}

            <div className="flex-1 space-y-6">
              <div>
                <p className="text-xs opacity-70 uppercase tracking-wider mb-1 font-medium">NOME COMPLETO</p>
                <p className="text-xl font-bold">
                  {profile.full_name}
                </p>
              </div>

              {profile.civil_status && (
                <div>
                  <p className="text-xs opacity-70 uppercase tracking-wider mb-1 font-medium">ESTADO DE VIDA</p>
                  <p className="text-base font-semibold">
                    {getCivilStatusLabel(profile.civil_status)}
                  </p>
                </div>
              )}

              {profile.parish && (
                <div>
                  <div className="flex items-center gap-2 opacity-70 mb-1">
                    <Church className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-wider font-medium">PARÓQUIA</span>
                  </div>
                  <p className="font-semibold text-base leading-tight">{profile.parish}</p>
                </div>
              )}

              {profile.priest_name && (
                <div>
                  <div className="flex items-center gap-2 opacity-70 mb-1">
                    <User className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-wider font-medium">PÁROCO</span>
                  </div>
                  <p className="font-semibold text-base">{profile.priest_name}</p>
                </div>
              )}

              {profile.baptism_date && (
                <div>
                  <div className="flex items-center gap-2 opacity-70 mb-1">
                    <Calendar className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-wider font-medium">DATA DE BATISMO</span>
                  </div>
                  <p className="font-semibold text-base">
                    {new Date(profile.baptism_date).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              )}

              {profile.patron_saint && (
                <div>
                  <div className="flex items-center gap-2 opacity-70 mb-1">
                    <Star className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-wider font-medium">SANTO DE DEVOÇÃO</span>
                  </div>
                  <p className="font-semibold text-base">{profile.patron_saint}</p>
                </div>
              )}
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
