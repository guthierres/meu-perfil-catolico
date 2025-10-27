import { Cross, Users, Share2, CheckCircle, ArrowRight, Music, Palette, Sparkles, Search } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-amber-50/50 overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-[500px] h-[500px] bg-amber-200/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-sky-200/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-br from-blue-600 via-blue-700 to-sky-800 rounded-3xl mb-8 shadow-2xl transform hover:scale-110 hover:rotate-3 transition-all duration-500 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent rounded-3xl"></div>
            <Cross className="w-14 h-14 text-white relative z-10" strokeWidth={2.5} />
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-blue-900 via-sky-700 to-blue-900 bg-clip-text text-transparent leading-tight">
            CATOLID
          </h1>
          <p className="text-2xl md:text-3xl text-blue-800 max-w-4xl mx-auto mb-6 font-bold">
            Sua Identidade Católica Digital
          </p>
          <p className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Compartilhe sua fé de forma <span className="font-bold text-blue-700">moderna</span> e <span className="font-bold text-sky-700">personalizada</span>.<br className="hidden md:block" />
            Crie sua carteirinha católica digital em minutos e conecte-se com toda a comunidade.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          <div className="group bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-2 border-blue-100/50 hover:border-blue-200 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
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

          <div className="group bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-2 border-sky-100/50 hover:border-sky-200 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-sky-500 to-sky-600 rounded-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Music className="w-8 h-8 text-white" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Músicas Incorporadas</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Adicione suas músicas católicas favoritas do Spotify ou YouTube direto no seu perfil.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-10 md:p-14 shadow-2xl mb-20 border-2 border-blue-100/50">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center bg-gradient-to-r from-blue-800 to-sky-700 bg-clip-text text-transparent">
            Por que usar o CATOLID?
          </h2>
          <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
            A plataforma que conecta católicos do mundo todo através de suas identidades digitais
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-5 p-5 rounded-2xl hover:bg-blue-50/50 transition-colors duration-300">
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

            <div className="flex items-start gap-5 p-5 rounded-2xl hover:bg-blue-50/50 transition-colors duration-300">
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

            <div className="flex items-start gap-5 p-5 rounded-2xl hover:bg-blue-50/50 transition-colors duration-300">
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

            <div className="flex items-start gap-5 p-5 rounded-2xl hover:bg-blue-50/50 transition-colors duration-300">
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

            <div className="flex items-start gap-5 p-5 rounded-2xl hover:bg-blue-50/50 transition-colors duration-300">
              <div className="flex-shrink-0 mt-1">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-2 text-lg">Seu link único catolid.com</h4>
                <p className="text-gray-600 leading-relaxed">
                  Tenha seu próprio link personalizado catolid.com/seu-nome para compartilhar em todas as redes sociais e deixar sua fé sempre visível.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-5 p-5 rounded-2xl hover:bg-blue-50/50 transition-colors duration-300">
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
            className="group inline-flex items-center gap-4 bg-gradient-to-r from-blue-600 via-blue-700 to-sky-700 text-white px-14 py-6 rounded-2xl font-bold text-xl hover:from-blue-700 hover:via-blue-800 hover:to-sky-800 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 relative overflow-hidden"
          >
            <span className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
            <span className="relative flex items-center gap-4">
              <Sparkles className="w-7 h-7 animate-pulse" strokeWidth={2.5} />
              Criar Meu CATOLID Agora
              <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform" strokeWidth={2.5} />
            </span>
          </button>
          <p className="text-gray-700 font-semibold text-lg">✨ É grátis e leva menos de 5 minutos • catolid.com</p>

          <div className="pt-8 border-t border-gray-200/50 max-w-md mx-auto">
            <a
              href="/search"
              className="group inline-flex items-center gap-3 text-blue-700 hover:text-blue-800 font-semibold text-base hover:underline transition-all"
            >
              <Search className="w-5 h-5 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
              Buscar carteirinha por ID
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
