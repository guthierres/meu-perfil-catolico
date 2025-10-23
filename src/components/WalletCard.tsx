import { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Church, Calendar, User, Star, Download, Share2, Wallet } from 'lucide-react';
import { Profile } from '../types/profile';
import { getCivilStatusLabel } from '../lib/profileUtils';
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


  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 rounded-3xl p-8 border border-amber-300/50 shadow-xl"
        style={{
          background: 'linear-gradient(135deg, hsl(var(--sacred-gold) / 0.1) 0%, hsl(var(--sacred-amber) / 0.15) 50%, hsl(var(--sacred-gold) / 0.1) 100%)',
        }}
      >
        <h3 className="text-xl font-bold mb-3 flex items-center gap-3"
          style={{ color: 'hsl(var(--sacred-brown))' }}
        >
          <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg">
            <Wallet className="w-6 h-6 text-white" />
          </div>
          Adicionar à Carteira Digital
        </h3>
        <p className="text-sm mb-6"
          style={{ color: 'hsl(var(--foreground) / 0.7)' }}
        >
          Salve sua carteirinha católica e tenha acesso rápido mesmo offline
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={handleDownload}
            className="flex items-center justify-center gap-2 px-5 py-3.5 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all text-sm font-semibold border-2 hover:scale-105 transform duration-200"
            style={{ 
              color: 'hsl(var(--sacred-brown))',
              borderColor: 'hsl(var(--sacred-gold) / 0.3)'
            }}
          >
            <Download className="w-5 h-5" />
            Baixar Imagem
          </button>
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-2 px-5 py-3.5 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all text-sm font-semibold border-2 hover:scale-105 transform duration-200"
            style={{ 
              color: 'hsl(var(--sacred-brown))',
              borderColor: 'hsl(var(--sacred-gold) / 0.3)'
            }}
          >
            <Share2 className="w-5 h-5" />
            Compartilhar
          </button>
          <button
            onClick={handleSaveToWallet}
            className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all text-sm font-semibold text-white hover:scale-105 transform duration-200"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--sacred-gold)) 0%, hsl(var(--sacred-amber)) 100%)'
            }}
          >
            <Wallet className="w-5 h-5" />
            Salvar na Carteira
          </button>
        </div>
      </div>

      <div className="flex justify-center">
        <div
          ref={cardRef}
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #5a7a9f 0%, #7891b3 50%, #5a7a9f 100%)',
            width: '390px',
            height: '650px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 80px rgba(90, 122, 159, 0.2)',
          }}
        >
          {/* Decorative overlay */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/10" />
            
            {/* Decorative churches */}
            <div className="absolute inset-0 opacity-5">
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
            
            {/* Decorative border */}
            <div className="absolute inset-3 border-2 border-white/10 rounded-2xl" />
          </div>

          <div className="relative h-full px-8 py-8 flex flex-col text-white">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2 tracking-wide" style={{ fontFamily: 'Georgia, serif', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                  Carteirinha Católica
                </h2>
                <div className="flex items-center gap-2 text-xs opacity-90">
                  <Church className="w-4 h-4" />
                  <span style={{ fontFamily: 'system-ui, sans-serif' }}>Católico Apostólico Romano</span>
                </div>
              </div>
              <div className="bg-white/10 p-2 rounded-xl backdrop-blur-sm">
                <Church className="w-8 h-8" />
              </div>
            </div>

            {/* Photo */}
            {profile.profile_image_url && (
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white/40 shadow-2xl">
                    <img
                      src={profile.profile_image_url}
                      alt="Foto"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Decorative corners */}
                  <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-white/60" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-white/60" />
                  <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-white/60" />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-white/60" />
                </div>
              </div>
            )}

            {/* Information */}
            <div className="flex-1 space-y-4">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                <p className="text-xs opacity-70 uppercase tracking-wider mb-1.5 font-medium">NOME COMPLETO</p>
                <p className="text-lg font-bold leading-tight">
                  {profile.full_name}
                </p>
              </div>

              {profile.civil_status && (
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                  <p className="text-xs opacity-70 uppercase tracking-wider mb-1.5 font-medium">ESTADO DE VIDA</p>
                  <p className="text-sm font-semibold">
                    {getCivilStatusLabel(profile.civil_status)}
                  </p>
                </div>
              )}

              {profile.parish && (
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                  <div className="flex items-center gap-2 opacity-70 mb-1.5">
                    <Church className="w-3.5 h-3.5" />
                    <span className="text-xs uppercase tracking-wider font-medium">PARÓQUIA</span>
                  </div>
                  <p className="font-semibold text-sm leading-tight">{profile.parish}</p>
                </div>
              )}

              {profile.priest_name && (
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                  <div className="flex items-center gap-2 opacity-70 mb-1.5">
                    <User className="w-3.5 h-3.5" />
                    <span className="text-xs uppercase tracking-wider font-medium">PÁROCO</span>
                  </div>
                  <p className="font-semibold text-sm">{profile.priest_name}</p>
                </div>
              )}

              {profile.baptism_date && (
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                  <div className="flex items-center gap-2 opacity-70 mb-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span className="text-xs uppercase tracking-wider font-medium">DATA DE BATISMO</span>
                  </div>
                  <p className="font-semibold text-sm">
                    {new Date(profile.baptism_date).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              )}

              {profile.patron_saint && (
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                  <div className="flex items-center gap-2 opacity-70 mb-1.5">
                    <Star className="w-3.5 h-3.5" />
                    <span className="text-xs uppercase tracking-wider font-medium">SANTO DE DEVOÇÃO</span>
                  </div>
                  <p className="font-semibold text-sm">{profile.patron_saint}</p>
                </div>
              )}
            </div>

            {/* QR Code at bottom */}
            <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/20">
              <div>
                <p className="text-xs opacity-70 mb-1">Perfil Digital</p>
                <p className="text-xs font-mono opacity-90">{profile.slug || 'perfil'}</p>
              </div>
              <div className="bg-white p-2.5 rounded-xl shadow-xl">
                <QRCodeSVG 
                  value={profileUrl}
                  size={70}
                  level="H"
                  includeMargin={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl p-8 border-2 shadow-xl"
        style={{
          background: 'linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--muted)) 100%)',
          borderColor: 'hsl(var(--sacred-gold) / 0.3)'
        }}
      >
        <h4 className="font-bold text-lg mb-4 flex items-center gap-2"
          style={{ color: 'hsl(var(--sacred-brown))' }}
        >
          <span className="text-2xl">💡</span>
          Como usar sua carteirinha:
        </h4>
        <div className="text-sm space-y-3"
          style={{ color: 'hsl(var(--foreground) / 0.8)' }}
        >
          <p className="flex items-start gap-3">
            <span className="text-xl">📱</span>
            <span><strong>iOS (iPhone):</strong> Baixe a imagem e adicione às fotos favoritas ou como papel de parede da tela de bloqueio</span>
          </p>
          <p className="flex items-start gap-3">
            <span className="text-xl">🤖</span>
            <span><strong>Android:</strong> Salve a imagem e adicione como papel de parede da tela de bloqueio para acesso rápido</span>
          </p>
          <p className="flex items-start gap-3">
            <span className="text-xl">💻</span>
            <span><strong>Computador:</strong> Salve a imagem e mantenha em uma pasta de fácil acesso</span>
          </p>
          <div className="mt-4 pt-4 border-t"
            style={{ borderColor: 'hsl(var(--sacred-gold) / 0.2)' }}
          >
            <p className="flex items-start gap-3">
              <span className="text-xl">📲</span>
              <span><strong>QR Code:</strong> Compartilhe seu perfil facilmente! Outras pessoas podem escanear o QR code na carteirinha para acessar seu perfil digital.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
