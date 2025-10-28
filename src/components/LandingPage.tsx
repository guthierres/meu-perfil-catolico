import { useState } from 'react';
import { Cross, Users, Share2, CheckCircle, ArrowRight, Music, Palette, Sparkles, Search, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Profile } from '../types/profile';
import { Header } from './Header';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const [searchId, setSearchId] = useState('');
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchId.trim() || searchId.length !== 6) {
      setSearchError('Digite um ID válido de 6 dígitos');
      return;
    }

    setSearching(true);
    setSearchError('');

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('slug')
        .eq('card_id', searchId.trim())
        .maybeSingle();

      if (error) throw error;

      if (!data || !data.slug) {
        setSearchError('Carteirinha não encontrada');
        return;
      }

      window.location.href = `/p/${data.slug}`;
    } catch (err) {
      console.error('Erro ao buscar:', err);
      setSearchError('Erro ao buscar. Tente novamente.');
    } finally {
      setSearching(false);
    }
  };

  return (
    <>
    <Header />
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/40 to-orange-50/30 overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-amber-200/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-[500px] h-[500px] bg-orange-200/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-stone-200/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="text-center mb-20">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-200/30 to-orange-200/30 blur-3xl rounded-full"></div>
            <img
              src="/logo.webp"
              alt="CATOLID Logo"
              className="relative z-10 w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 object-contain mx-auto animate-[float_3s_ease-in-out_infinite] drop-shadow-2xl transition-transform hover:scale-110"
            />
          </div>
          <p className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-8">
            Compartilhe sua fé de forma <span className="font-bold text-amber-800">moderna</span> e <span className="font-bold text-orange-700">personalizada</span>.<br className="hidden md:block" />
            Crie sua carteirinha católica digital em minutos e conecte-se com toda a comunidade.
          </p>

          <div className="max-w-md mx-auto mb-8">
            <form onSubmit={handleSearch} className="relative">
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2 shadow-xl border-2 border-amber-200/50">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={searchId}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                      setSearchId(value);
                      setSearchError('');
                    }}
                    placeholder="Buscar por ID (6 dígitos)"
                    maxLength={6}
                    className="flex-1 px-4 py-3 text-lg font-mono font-bold text-center rounded-xl border-2 border-transparent focus:border-amber-500 focus:outline-none tracking-widest"
                  />
                  <button
                    type="submit"
                    disabled={searching || searchId.length !== 6}
                    className="px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl font-semibold hover:from-amber-700 hover:to-orange-700 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {searching ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Search className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {searchError && (
                  <p className="text-red-600 text-sm mt-2 text-center font-medium">{searchError}</p>
                )}
              </div>
            </form>
            <p className="text-sm text-gray-600 text-center mt-3">
              Digite o ID de 6 dígitos para encontrar uma carteirinha
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          <div className="group bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-2 border-amber-100/50 hover:border-amber-200 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-600 to-orange-600 rounded-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-white" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Identidade Católica</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Crie um perfil completo com suas informações religiosas, paróquia, múltiplas pastorais e santo de devoção.
              </p>
            </div>
          </div>

          <div className="group bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-2 border-green-100/50 hover:border-green-200 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Share2 className="w-8 h-8 text-white" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Compartilhe Facilmente</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Tenha um link personalizado único para compartilhar no Instagram, WhatsApp e redes sociais.
              </p>
            </div>
          </div>

          <div className="group bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-2 border-amber-100/50 hover:border-amber-200 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Palette className="w-8 h-8 text-white" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Totalmente Personalizável</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Escolha cores, gradientes, imagens de fundo e crie uma carteirinha com sua personalidade.
              </p>
            </div>
          </div>

          <div className="group bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-2 border-orange-100/50 hover:border-orange-200 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Music className="w-8 h-8 text-white" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Músicas Incorporadas</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Adicione suas músicas católicas favoritas do Spotify ou YouTube direto no seu perfil.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-10 md:p-14 shadow-2xl mb-20 border-2 border-amber-100/50">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center bg-gradient-to-r from-amber-800 to-orange-700 bg-clip-text text-transparent">
            Por que usar o CATOLID?
          </h2>
          <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
            A plataforma que conecta católicos do mundo todo através de suas identidades digitais
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-5 p-5 rounded-2xl hover:bg-amber-50/50 transition-colors duration-300">
              <div className="flex-shrink-0 mt-1">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-2 text-lg">Testemunhe sua fé digitalmente</h4>
                <p className="text-gray-600 leading-relaxed">
                  Com o CATOLID, você tem uma plataforma moderna para compartilhar sua identidade católica com o mundo inteiro.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-5 p-5 rounded-2xl hover:bg-amber-50/50 transition-colors duration-300">
              <div className="flex-shrink-0 mt-1">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-2 text-lg">Conecte-se com outros católicos</h4>
                <p className="text-gray-600 leading-relaxed">
                  Mostre sua paróquia, múltiplas pastorais e crie conexões com outros membros da comunidade católica.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-5 p-5 rounded-2xl hover:bg-amber-50/50 transition-colors duration-300">
              <div className="flex-shrink-0 mt-1">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-2 text-lg">Compartilhe músicas católicas</h4>
                <p className="text-gray-600 leading-relaxed">
                  Adicione suas músicas e hinos católicos favoritos do Spotify ou YouTube para inspirar outros fiéis.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-5 p-5 rounded-2xl hover:bg-amber-50/50 transition-colors duration-300">
              <div className="flex-shrink-0 mt-1">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-2 text-lg">Inspire através da Palavra</h4>
                <p className="text-gray-600 leading-relaxed">
                  Compartilhe suas passagens bíblicas favoritas e frases inspiradoras que guiam sua caminhada espiritual.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-5 p-5 rounded-2xl hover:bg-amber-50/50 transition-colors duration-300">
              <div className="flex-shrink-0 mt-1">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-2 text-lg">Seu link único catolid.com</h4>
                <p className="text-gray-600 leading-relaxed">
                  Tenha seu próprio link personalizado catolid.com/seu-nome para adicionar na bio do Instagram, compartilhar no WhatsApp e em todas as redes sociais, deixando sua fé sempre visível.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-5 p-5 rounded-2xl hover:bg-amber-50/50 transition-colors duration-300">
              <div className="flex-shrink-0 mt-1">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-2 text-lg">100% Gratuito</h4>
                <p className="text-gray-600 leading-relaxed">
                  Crie e personalize sua carteirinha católica gratuitamente. Sem custos ocultos, sempre grátis.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center space-y-6">
          <button
            onClick={onGetStarted}
            className="group inline-flex items-center gap-4 bg-gradient-to-r from-amber-700 via-orange-700 to-amber-800 text-white px-14 py-6 rounded-2xl font-bold text-xl hover:from-amber-800 hover:via-orange-800 hover:to-amber-900 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 relative overflow-hidden"
          >
            <span className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
            <span className="relative flex items-center gap-4">
              <Sparkles className="w-7 h-7 animate-pulse" strokeWidth={2.5} />
              Criar Meu CATOLID Agora
              <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform" strokeWidth={2.5} />
            </span>
          </button>
          <p className="text-gray-700 font-semibold text-lg">✨ É grátis e leva menos de 5 minutos • catolid.com</p>
        </div>
      </div>
    </div>
    </>
  );
}
