import { useState } from 'react';
import { Search, Loader2, Church, AlertCircle, User } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Profile } from '../types/profile';
import { getDisplayName } from '../lib/profileUtils';
import { Header } from '../components/Header';

export default function SearchCard() {
  const [cardId, setCardId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [foundProfile, setFoundProfile] = useState<Profile | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cardId.trim()) {
      setError('Digite um ID válido');
      return;
    }

    if (!/^\d{6}$/.test(cardId.trim())) {
      setError('O ID deve ter 6 dígitos');
      return;
    }

    setLoading(true);
    setError('');
    setFoundProfile(null);

    try {
      const { data, error: searchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('card_id', cardId.trim())
        .maybeSingle();

      if (searchError) {
        throw searchError;
      }

      if (!data) {
        setError('Carteirinha não encontrada. Verifique o ID e tente novamente.');
        return;
      }

      const profile = data as Profile;
      setFoundProfile(profile);
    } catch (err) {
      console.error('Erro ao buscar carteirinha:', err);
      setError('Erro ao buscar carteirinha. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewProfile = () => {
    if (foundProfile?.slug) {
      window.location.href = `/p/${foundProfile.slug}`;
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center p-4"
        style={{
          background: 'linear-gradient(135deg, hsl(var(--sacred-gold) / 0.08) 0%, hsl(var(--sacred-amber) / 0.12) 50%, hsl(var(--sacred-gold) / 0.08) 100%)',
        }}
      >
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 shadow-xl mb-4">
            <Church className="w-10 h-10 text-white" strokeWidth={2} />
          </div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: 'hsl(var(--sacred-brown))' }}>
            Buscar Carteirinha
          </h1>
          <p className="text-sm" style={{ color: 'hsl(var(--foreground) / 0.7)' }}>
            Digite o ID de 6 dígitos da carteirinha católica
          </p>
        </div>

        <div className="rounded-3xl p-8 border-2 shadow-xl bg-white"
          style={{
            borderColor: 'hsl(var(--sacred-gold) / 0.3)'
          }}
        >
          <form onSubmit={handleSearch} className="space-y-6">
            <div>
              <label htmlFor="cardId" className="block text-sm font-semibold mb-2"
                style={{ color: 'hsl(var(--sacred-brown))' }}
              >
                ID da Carteirinha
              </label>
              <div className="relative">
                <input
                  id="cardId"
                  type="text"
                  value={cardId}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                    setCardId(value);
                    setError('');
                  }}
                  placeholder="000000"
                  maxLength={6}
                  className="w-full px-4 py-3 pr-12 text-2xl font-mono font-bold text-center rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-amber-500 tracking-widest"
                  style={{
                    borderColor: error ? '#ef4444' : 'hsl(var(--sacred-gold) / 0.3)',
                    color: 'hsl(var(--sacred-brown))'
                  }}
                  disabled={loading}
                />
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 opacity-40"
                  style={{ color: 'hsl(var(--sacred-brown))' }}
                />
              </div>
              {error && (
                <div className="mt-2 flex items-center gap-2 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || cardId.length !== 6}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all text-base font-bold text-white disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transform duration-200 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--sacred-gold)) 0%, hsl(var(--sacred-amber)) 100%)'
              }}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Buscando...</span>
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  <span>Buscar Carteirinha</span>
                </>
              )}
            </button>
          </form>

          {foundProfile && (
            <div className="mt-6 pt-6 border-t"
              style={{ borderColor: 'hsl(var(--sacred-gold) / 0.2)' }}
            >
              <div className="text-center space-y-4">
                <div className="flex flex-col items-center gap-3">
                  {foundProfile.profile_image_url ? (
                    <img
                      src={foundProfile.profile_image_url}
                      alt={foundProfile.full_name}
                      className="w-20 h-20 rounded-full object-cover border-4 shadow-lg"
                      style={{ borderColor: 'hsl(var(--sacred-gold))' }}
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full flex items-center justify-center border-4 shadow-lg"
                      style={{
                        borderColor: 'hsl(var(--sacred-gold))',
                        background: 'linear-gradient(135deg, hsl(var(--sacred-gold) / 0.2) 0%, hsl(var(--sacred-amber) / 0.2) 100%)'
                      }}
                    >
                      <User className="w-10 h-10" style={{ color: 'hsl(var(--sacred-brown))' }} />
                    </div>
                  )}
                  <div>
                    <h3 className="text-xl font-bold" style={{ color: 'hsl(var(--sacred-brown))' }}>
                      {getDisplayName(foundProfile.full_name || 'Sem nome', foundProfile.civil_status)}
                    </h3>
                    <p className="text-sm" style={{ color: 'hsl(var(--foreground) / 0.7)' }}>
                      ID: {foundProfile.card_id}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleViewProfile}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all text-sm font-bold text-white hover:scale-105 transform duration-200 active:scale-95"
                  style={{
                    background: 'linear-gradient(135deg, hsl(var(--sacred-gold)) 0%, hsl(var(--sacred-amber)) 100%)'
                  }}
                >
                  Ver Perfil Completo
                </button>
              </div>
            </div>
          )}

          <div className="mt-6 pt-6 border-t"
            style={{ borderColor: 'hsl(var(--sacred-gold) / 0.2)' }}
          >
            <a
              href="/"
              className="w-full text-sm font-semibold hover:underline transition-colors block text-center"
              style={{ color: 'hsl(var(--sacred-brown))' }}
            >
              Voltar para início
            </a>
          </div>
        </div>

        <div className="mt-6 rounded-2xl p-6 border-2 bg-white/80 backdrop-blur-sm"
          style={{
            borderColor: 'hsl(var(--sacred-gold) / 0.2)'
          }}
        >
          <h3 className="font-bold text-sm mb-3 flex items-center gap-2"
            style={{ color: 'hsl(var(--sacred-brown))' }}
          >
            <span className="text-lg">💡</span>
            <span>Como encontrar o ID?</span>
          </h3>
          <p className="text-xs leading-relaxed"
            style={{ color: 'hsl(var(--foreground) / 0.7)' }}
          >
            O ID de 6 dígitos está localizado na parte inferior da carteirinha digital, logo acima do perfil digital. Use este número para encontrar e validar qualquer carteirinha católica.
          </p>
        </div>
      </div>
    </div>
    </>
  );
}
