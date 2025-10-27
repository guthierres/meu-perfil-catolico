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
    <div className="space-y-4 px-2 sm:px-0">
      <div className="rounded-3xl p-4 sm:p-8 border-2 shadow-xl"
        style={{
          background: 'linear-gradient(135deg, hsl(var(--sacred-gold) / 0.08) 0%, hsl(var(--sacred-amber) / 0.12) 50%, hsl(var(--sacred-gold) / 0.08) 100%)',
          borderColor: 'hsl(var(--sacred-gold) / 0.3)'
        }}
      >
        <h3 className="text-base sm:text-xl font-bold mb-2 sm:mb-3 flex items-center gap-2 sm:gap-3"
          style={{ color: 'hsl(var(--sacred-brown))' }}
        >
          <div className="p-1.5 sm:p-2 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg">
            <Wallet className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
          </div>
          <span className="text-sm sm:text-xl">Adicionar à Carteira Digital</span>
        </h3>
        <p className="text-xs sm:text-sm mb-4 sm:mb-6"
          style={{ color: 'hsl(var(--foreground) / 0.7)' }}
        >
          Salve sua carteirinha católica e tenha acesso rápido mesmo offline
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
          <button
            onClick={handleDownload}
            className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2.5 sm:py-3.5 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all text-xs sm:text-sm font-semibold border-2 hover:scale-105 transform duration-200 active:scale-95"
            style={{ 
              color: 'hsl(var(--sacred-brown))',
              borderColor: 'hsl(var(--sacred-gold) / 0.3)'
            }}
          >
            <Download className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Baixar</span>
          </button>
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2.5 sm:py-3.5 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all text-xs sm:text-sm font-semibold border-2 hover:scale-105 transform duration-200 active:scale-95"
            style={{ 
              color: 'hsl(var(--sacred-brown))',
              borderColor: 'hsl(var(--sacred-gold) / 0.3)'
            }}
          >
            <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Compartilhar</span>
          </button>
          <button
            onClick={handleSaveToWallet}
            className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2.5 sm:py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all text-xs sm:text-sm font-semibold text-white hover:scale-105 transform duration-200 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--sacred-gold)) 0%, hsl(var(--sacred-amber)) 100%)'
            }}
          >
            <Wallet className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="whitespace-nowrap">Salvar na Carteira</span>
          </button>
        </div>
      </div>

      <div className="flex justify-center overflow-x-auto py-2">
        <div
          ref={cardRef}
          className="relative rounded-3xl overflow-hidden mx-auto"
          style={{
            background: 'linear-gradient(135deg, #1e3a5f 0%, #2d5a8c 25%, #3a6fa8 50%, #2d5a8c 75%, #1e3a5f 100%)',
            width: '340px',
            height: '640px',
            maxWidth: '95vw',
            boxShadow: '0 25px 70px rgba(0, 0, 0, 0.35), 0 0 100px rgba(58, 111, 168, 0.25), inset 0 1px 2px rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* Decorative overlay */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Enhanced gradient overlay with shine effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20" />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent" />

            {/* Central decorative cross */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.04]">
              <div className="relative">
                <div className="absolute w-1.5 h-56 bg-gradient-to-b from-white/50 via-white to-white/50 left-1/2 -translate-x-1/2 rounded-full" />
                <div className="absolute w-56 h-1.5 bg-gradient-to-r from-white/50 via-white to-white/50 top-1/2 -translate-y-1/2 rounded-full" />
              </div>
            </div>

            {/* Decorative churches with glow */}
            <div className="absolute inset-0 opacity-[0.06]">
              <div className="absolute top-12 right-8">
                <div className="absolute inset-0 blur-xl bg-white/20" />
                <Church className="w-24 h-24 text-white relative" strokeWidth={1.5} />
              </div>
              <div className="absolute bottom-20 left-8 rotate-12">
                <div className="absolute inset-0 blur-xl bg-white/20" />
                <Church className="w-20 h-20 text-white relative" strokeWidth={1.5} />
              </div>
            </div>

            {/* Enhanced authenticity seal */}
            <div className="absolute top-4 right-4 w-20 h-20">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400/30 to-yellow-500/30 blur-md" />
              <div className="relative w-full h-full rounded-full border-2 border-amber-300/40 flex items-center justify-center bg-gradient-to-br from-amber-400/10 to-yellow-500/10 backdrop-blur-sm shadow-xl">
                <div className="text-center">
                  <div className="text-[9px] font-extrabold text-amber-200/90 tracking-wider leading-tight mb-0.5">AUTÊNTICA</div>
                  <div className="text-[7px] font-semibold text-amber-300/70">2024</div>
                  <div className="absolute inset-0 rounded-full border border-amber-400/20" />
                </div>
              </div>
            </div>

            {/* Enhanced decorative borders */}
            <div className="absolute inset-3 border-2 border-white/20 rounded-2xl" />
            <div className="absolute inset-4 border border-white/10 rounded-2xl" />

            {/* Corner accents */}
            <div className="absolute top-5 left-5 w-8 h-8 border-t-2 border-l-2 border-white/30 rounded-tl-xl" />
            <div className="absolute top-5 right-5 w-8 h-8 border-t-2 border-r-2 border-white/30 rounded-tr-xl" />
            <div className="absolute bottom-5 left-5 w-8 h-8 border-b-2 border-l-2 border-white/30 rounded-bl-xl" />
            <div className="absolute bottom-5 right-5 w-8 h-8 border-b-2 border-r-2 border-white/30 rounded-br-xl" />
          </div>

          <div className="relative h-full px-6 py-7 flex flex-col text-white">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex-1">
                <h2 className="text-xl font-extrabold tracking-wide leading-tight mb-1.5" style={{ fontFamily: 'Georgia, serif', textShadow: '0 3px 15px rgba(0,0,0,0.4), 0 1px 3px rgba(255,255,255,0.1)' }}>
                  CARTEIRINHA CATÓLICA
                </h2>
                <div className="flex items-center gap-2 text-[10px] opacity-95 font-medium">
                  <Church className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={2} />
                  <span style={{ fontFamily: 'system-ui, sans-serif', letterSpacing: '0.02em' }}>Católico Apostólico Romano</span>
                </div>
              </div>
              <div className="bg-gradient-to-br from-white/15 to-white/5 p-2 rounded-xl backdrop-blur-sm flex-shrink-0 border border-white/20 shadow-lg">
                <Church className="w-6 h-6" strokeWidth={2} />
              </div>
            </div>

            {/* Photo + Name Section */}
            <div className="flex gap-4 mb-5">
              {profile.profile_image_url && (
                <div className="relative flex-shrink-0">
                  <div className="w-24 h-32 rounded-xl overflow-hidden border-3 border-white/50 shadow-2xl ring-1 ring-white/20">
                    <img
                      src={profile.profile_image_url}
                      alt="Foto"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-3 border-l-3 border-amber-300/80 rounded-tl" />
                  <div className="absolute -top-1.5 -right-1.5 w-4 h-4 border-t-3 border-r-3 border-amber-300/80 rounded-tr" />
                  <div className="absolute -bottom-1.5 -left-1.5 w-4 h-4 border-b-3 border-l-3 border-amber-300/80 rounded-bl" />
                  <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-3 border-r-3 border-amber-300/80 rounded-br" />
                </div>
              )}
              <div className="flex-1 flex flex-col justify-center min-w-0 gap-2">
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/20 shadow-lg">
                  <p className="text-[9px] opacity-80 uppercase tracking-widest mb-1 font-bold" style={{ letterSpacing: '0.1em' }}>NOME COMPLETO</p>
                  <p className="text-sm font-extrabold leading-tight break-words" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.3)', wordBreak: 'break-word' }}>
                    {profile.full_name}
                  </p>
                </div>
                {profile.civil_status && (
                  <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/20 shadow-lg">
                    <p className="text-[9px] opacity-80 uppercase tracking-widest mb-1 font-bold" style={{ letterSpacing: '0.1em' }}>ESTADO DE VIDA</p>
                    <p className="text-sm font-bold">
                      {getCivilStatusLabel(profile.civil_status)}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Other Information */}
            <div className="flex-1 grid grid-cols-2 gap-2.5 mb-5">
              {profile.parish && (
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/20 col-span-2 shadow-lg">
                  <div className="flex items-center gap-2 opacity-85 mb-1">
                    <Church className="w-3 h-3 flex-shrink-0" strokeWidth={2} />
                    <span className="text-[9px] uppercase tracking-widest font-bold" style={{ letterSpacing: '0.1em' }}>PARÓQUIA</span>
                  </div>
                  <p className="font-bold text-[11px] leading-tight">{profile.parish}</p>
                </div>
              )}

              {profile.priest_name && (
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/20 shadow-lg">
                  <div className="flex items-center gap-1.5 opacity-85 mb-1">
                    <User className="w-3 h-3 flex-shrink-0" strokeWidth={2} />
                    <span className="text-[9px] uppercase tracking-widest font-bold" style={{ letterSpacing: '0.1em' }}>PÁROCO</span>
                  </div>
                  <p className="font-bold text-[11px]">{profile.priest_name}</p>
                </div>
              )}

              {profile.baptism_date && (
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/20 shadow-lg">
                  <div className="flex items-center gap-1.5 opacity-85 mb-1">
                    <Calendar className="w-3 h-3 flex-shrink-0" strokeWidth={2} />
                    <span className="text-[9px] uppercase tracking-widest font-bold" style={{ letterSpacing: '0.1em' }}>BATISMO</span>
                  </div>
                  <p className="font-bold text-[11px]">
                    {new Date(profile.baptism_date).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              )}

              {profile.patron_saint && (
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/20 col-span-2 shadow-lg">
                  <div className="flex items-center gap-1.5 opacity-85 mb-1">
                    <Star className="w-3 h-3 flex-shrink-0" strokeWidth={2} />
                    <span className="text-[9px] uppercase tracking-widest font-bold" style={{ letterSpacing: '0.1em' }}>SANTO DE DEVOÇÃO</span>
                  </div>
                  <p className="font-bold text-[11px]">{profile.patron_saint}</p>
                </div>
              )}
            </div>

            {/* QR Code and ID at bottom */}
            <div className="mt-auto pt-4 pb-2 border-t-2 border-white/25">
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] opacity-80 mb-1 font-semibold uppercase tracking-wider">ID da Carteirinha</p>
                  <p className="text-xl font-mono font-extrabold tracking-widest" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>{profile.card_id}</p>
                </div>
                <div className="bg-white p-2 rounded-xl shadow-2xl flex-shrink-0 ring-2 ring-white/30">
                  <QRCodeSVG
                    value={profileUrl}
                    size={60}
                    level="H"
                    includeMargin={false}
                  />
                </div>
              </div>
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-lg p-2.5 border border-white/20">
                <p className="text-[8px] opacity-75 mb-0.5 font-semibold uppercase tracking-wider">Perfil Digital</p>
                <p className="text-[11px] font-mono opacity-95 font-bold break-all">{profile.slug || 'perfil'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl p-4 sm:p-8 border-2 shadow-xl"
        style={{
          background: 'linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--muted)) 100%)',
          borderColor: 'hsl(var(--sacred-gold) / 0.3)'
        }}
      >
        <h4 className="font-bold text-sm sm:text-lg mb-3 sm:mb-4 flex items-center gap-2"
          style={{ color: 'hsl(var(--sacred-brown))' }}
        >
          <span className="text-lg sm:text-2xl">💡</span>
          <span>Como usar sua carteirinha:</span>
        </h4>
        <div className="text-xs sm:text-sm space-y-2 sm:space-y-3"
          style={{ color: 'hsl(var(--foreground) / 0.8)' }}
        >
          <p className="flex items-start gap-2 sm:gap-3">
            <span className="text-base sm:text-xl flex-shrink-0">📱</span>
            <span><strong>iOS (iPhone):</strong> Baixe a imagem e adicione às fotos favoritas ou como papel de parede da tela de bloqueio</span>
          </p>
          <p className="flex items-start gap-2 sm:gap-3">
            <span className="text-base sm:text-xl flex-shrink-0">🤖</span>
            <span><strong>Android:</strong> Salve a imagem e adicione como papel de parede da tela de bloqueio para acesso rápido</span>
          </p>
          <p className="flex items-start gap-2 sm:gap-3">
            <span className="text-base sm:text-xl flex-shrink-0">💻</span>
            <span><strong>Computador:</strong> Salve a imagem e mantenha em uma pasta de fácil acesso</span>
          </p>
          <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t"
            style={{ borderColor: 'hsl(var(--sacred-gold) / 0.2)' }}
          >
            <p className="flex items-start gap-2 sm:gap-3">
              <span className="text-base sm:text-xl flex-shrink-0">📲</span>
              <span><strong>QR Code:</strong> Compartilhe seu perfil facilmente! Outras pessoas podem escanear o QR code na carteirinha para acessar seu perfil digital.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
