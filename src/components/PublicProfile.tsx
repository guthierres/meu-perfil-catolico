import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Cross, Church, Calendar, Sparkles, BookOpen, Home, Music, Award } from 'lucide-react';
import { Profile } from '../types/profile';
import { MusicEmbed } from './MusicEmbed';
import { ProfileTabs } from './ProfileTabs';
import { getDisplayName, getCivilStatusLabel, getSacramentLabel } from '../lib/profileUtils';
import { Header } from './Header';

interface PublicProfileProps {
  slug: string;
}

export function PublicProfile({ slug }: PublicProfileProps) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'wallet'>('profile');

  useEffect(() => {
    loadProfile();
  }, [slug]);

  const loadProfile = async () => {
    setLoading(true);
    setNotFound(false);

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (error || !data) {
      setNotFound(true);
    } else {
      setProfile(data);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Carregando perfil...</p>
        </div>
      </div>
    );
  }

  if (notFound || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 p-4">
        <div className="text-center max-w-md">
          <Cross className="w-20 h-20 text-amber-600 mx-auto mb-6 opacity-50" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Perfil não encontrado</h2>
          <p className="text-gray-600 mb-8">
            Este perfil não existe ou foi removido.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-amber-700 hover:to-orange-700 transition shadow-lg"
          >
            <Home className="w-5 h-5" />
            Voltar ao Início
          </a>
        </div>
      </div>
    );
  }

  const backgroundStyle =
    profile.background_type === 'gradient' || profile.background_type === 'custom-gradient'
      ? { background: profile.background_value }
      : profile.background_type === 'image'
      ? {
          backgroundImage: `url(${profile.background_value})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }
      : { backgroundColor: profile.background_value };

  const overlayOpacity = profile.background_type === 'image'
    ? profile.background_overlay_opacity || 0.3
    : 0.2;

  return (
    <>
      <Header />
      <div className="min-h-screen" style={backgroundStyle}>
        <div
          className="min-h-screen backdrop-blur-sm"
          style={{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})` }}
        >
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="flex justify-end gap-3 mb-6">
            <a
              href="/"
              className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-xl font-semibold hover:bg-white transition shadow-lg flex items-center gap-2 text-gray-800"
            >
              <Home className="w-5 h-5" />
              Criar Minha Carteirinha
            </a>
          </div>

          <ProfileTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            primaryColor={profile.primary_color}
          />

          {activeTab === 'wallet' ? (
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 text-center">
              <Cross className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Acesso Restrito</h3>
              <p className="text-gray-600 mb-6">
                A carteirinha digital só está disponível para o dono do perfil quando logado.
              </p>
              <a
                href="/"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-amber-700 hover:to-orange-700 transition shadow-lg"
              >
                <Home className="w-5 h-5" />
                Criar Minha Carteirinha
              </a>
            </div>
          ) : (
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
            {profile.cover_image_url && (
              <div className="h-48 md:h-64 overflow-hidden relative">
                <img
                  src={profile.cover_image_url}
                  alt="Capa"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
            )}

            <div className="relative px-6 pb-8">
              {profile.profile_image_url ? (
                <div className={`${profile.cover_image_url ? '-mt-20' : 'mt-8'} mb-6 flex justify-center`}>
                  <div
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 shadow-xl"
                    style={{ borderColor: profile.primary_color }}
                  >
                    <img
                      src={profile.profile_image_url}
                      alt="Perfil"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              ) : (
                <div className="pt-8"></div>
              )}

              <div className="text-center mb-8">
                <h1
                  className="text-3xl md:text-4xl font-bold mb-2"
                  style={{ color: profile.primary_color }}
                >
                  {getDisplayName(profile.full_name, profile.civil_status)}
                </h1>
                <div className="flex flex-col items-center gap-1">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Cross className="w-4 h-4" />
                    <span className="font-medium">Católico Apostólico Romano</span>
                  </div>
                  {profile.civil_status && (
                    <span className="text-sm text-gray-500">
                      {getCivilStatusLabel(profile.civil_status)}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid gap-4 mb-8">
                {profile.baptism_date && (
                  <div className="group relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-white via-white to-gray-50/30 border border-gray-200 shadow-sm hover:shadow-lg hover:border-gray-300 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-gray-100 to-gray-50 group-hover:scale-105 transition-transform">
                        <Calendar
                          className="w-6 h-6"
                          style={{ color: profile.primary_color }}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-500 mb-1">Data de Batismo</p>
                        <p className="text-lg font-bold text-gray-800">
                          {new Date(profile.baptism_date).toLocaleDateString('pt-BR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="absolute top-0 right-0 w-24 h-24 opacity-50" style={{ background: `radial-gradient(circle at top right, ${profile.primary_color}10, transparent)` }}></div>
                  </div>
                )}

                {profile.parish && (
                  <div className="group relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-white via-white to-gray-50/30 border border-gray-200 shadow-sm hover:shadow-lg hover:border-gray-300 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-gray-100 to-gray-50 group-hover:scale-105 transition-transform">
                        <Church
                          className="w-6 h-6"
                          style={{ color: profile.primary_color }}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-500 mb-1">Paróquia</p>
                        <p className="text-lg font-bold text-gray-800">{profile.parish}</p>
                      </div>
                    </div>
                    <div className="absolute top-0 right-0 w-24 h-24 opacity-50" style={{ background: `radial-gradient(circle at top right, ${profile.primary_color}10, transparent)` }}></div>
                  </div>
                )}

                {profile.pastorals && profile.pastorals.length > 0 && (
                  <div className="group relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-white via-white to-gray-50/30 border border-gray-200 shadow-sm hover:shadow-lg hover:border-gray-300 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-gray-100 to-gray-50 group-hover:scale-105 transition-transform">
                        <Sparkles
                          className="w-6 h-6"
                          style={{ color: profile.secondary_color }}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-500 mb-3">
                          {profile.pastorals.length === 1 ? 'Pastoral' : 'Pastorais'}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {profile.pastorals.map((pastoral, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold bg-white border-2 hover:scale-105 transition-transform shadow-sm"
                              style={{ borderColor: profile.secondary_color, color: profile.secondary_color }}
                            >
                              {pastoral}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-0 right-0 w-24 h-24 opacity-50" style={{ background: `radial-gradient(circle at top right, ${profile.secondary_color}10, transparent)` }}></div>
                  </div>
                )}

                {profile.priest_name && (
                  <div className="group relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-white via-white to-gray-50/30 border border-gray-200 shadow-sm hover:shadow-lg hover:border-gray-300 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-gray-100 to-gray-50 group-hover:scale-105 transition-transform">
                        <Cross
                          className="w-6 h-6"
                          style={{ color: profile.secondary_color }}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-500 mb-1">Pároco</p>
                        <p className="text-lg font-bold text-gray-800">{profile.priest_name}</p>
                      </div>
                    </div>
                    <div className="absolute top-0 right-0 w-24 h-24 opacity-50" style={{ background: `radial-gradient(circle at top right, ${profile.secondary_color}10, transparent)` }}></div>
                  </div>
                )}

                {profile.sacraments && profile.sacraments.length > 0 && (
                  <div className="group relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-white via-white to-gray-50/30 border border-gray-200 shadow-sm hover:shadow-lg hover:border-gray-300 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-gray-100 to-gray-50 group-hover:scale-105 transition-transform">
                        <Award
                          className="w-6 h-6"
                          style={{ color: profile.secondary_color }}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-500 mb-3">
                          Sacramentos Recebidos ({profile.sacraments.length})
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {profile.sacraments.map((sacrament, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold bg-white border-2 hover:scale-105 transition-transform shadow-sm"
                              style={{ borderColor: profile.secondary_color, color: profile.secondary_color }}
                            >
                              {getSacramentLabel(sacrament)}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-0 right-0 w-24 h-24 opacity-50" style={{ background: `radial-gradient(circle at top right, ${profile.secondary_color}10, transparent)` }}></div>
                  </div>
                )}
              </div>

              {(profile.patron_saint || profile.saint_image_url) && (
                <div className="group relative overflow-hidden rounded-3xl p-8 mb-8 bg-gradient-to-br from-white via-gray-50/50 to-white border-2 shadow-xl hover:shadow-2xl transition-all duration-300"
                  style={{ borderColor: profile.primary_color }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `radial-gradient(circle at top right, ${profile.primary_color}05, transparent)` }}></div>
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 rounded-xl" style={{ backgroundColor: `${profile.primary_color}20` }}>
                        <Sparkles className="w-6 h-6" style={{ color: profile.primary_color }} />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">Santo de Devoção</h3>
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      {profile.saint_image_url && (
                        <div
                          className="w-32 h-32 rounded-3xl overflow-hidden shadow-2xl flex-shrink-0 ring-4 ring-offset-4 ring-white group-hover:scale-105 transition-transform"
                          style={{
                            boxShadow: `0 0 0 4px white, 0 0 0 8px ${profile.secondary_color}`
                          }}
                        >
                          <img
                            src={profile.saint_image_url}
                            alt={profile.patron_saint}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      {profile.patron_saint && (
                        <p className="text-2xl md:text-3xl font-bold text-center md:text-left" style={{ color: profile.primary_color }}>
                          {profile.patron_saint}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {profile.inspiration_quote && (
                <div className="group relative overflow-hidden rounded-3xl p-8 mb-6 bg-gradient-to-br from-white via-gray-50/50 to-white border-l-4 shadow-xl hover:shadow-2xl transition-all duration-300"
                  style={{ borderColor: profile.secondary_color }}
                >
                  <div className="absolute top-0 left-0 text-[120px] font-serif opacity-5 leading-none" style={{ color: profile.secondary_color }}>"</div>
                  <div className="relative">
                    <p className="text-lg md:text-xl italic text-gray-800 leading-relaxed mb-4 pl-8">
                      {profile.inspiration_quote}
                    </p>
                    {profile.quote_author && (
                      <p className="text-sm font-semibold text-gray-600 text-right pr-4">
                        — {profile.quote_author}
                      </p>
                    )}
                  </div>
                  <div className="absolute bottom-0 right-0 text-[120px] font-serif opacity-5 leading-none rotate-180" style={{ color: profile.primary_color }}>"</div>
                </div>
              )}

              {profile.bible_passage && (
                <div className="group relative overflow-hidden rounded-3xl p-8 mb-6 bg-gradient-to-br from-white via-gray-50/50 to-white border-l-4 shadow-xl hover:shadow-2xl transition-all duration-300"
                  style={{ borderColor: profile.primary_color }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-xl" style={{ backgroundColor: `${profile.primary_color}20` }}>
                      <BookOpen className="w-6 h-6" style={{ color: profile.primary_color }} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Passagem Bíblica</h3>
                  </div>
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed whitespace-pre-line pl-4 border-l-2" style={{ borderColor: `${profile.primary_color}30` }}>
                    {profile.bible_passage}
                  </p>
                </div>
              )}

              {profile.music_embeds && profile.music_embeds.length > 0 && (
                <div className="group relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-white via-gray-50/50 to-white border-l-4 shadow-xl hover:shadow-2xl transition-all duration-300"
                  style={{ borderColor: profile.secondary_color }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-xl" style={{ backgroundColor: `${profile.secondary_color}20` }}>
                      <Music className="w-6 h-6" style={{ color: profile.secondary_color }} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Músicas</h3>
                  </div>
                  <div className="space-y-6">
                    {profile.music_embeds.map((embed, index) => (
                      <div key={index} className="rounded-2xl overflow-hidden border-2 border-gray-200 shadow-md hover:shadow-lg hover:border-gray-300 transition-all">
                        <MusicEmbed embed={embed} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          )}

          <div className="mt-8 text-center">
            <p className="text-white text-sm font-medium drop-shadow-lg mb-4">
              Carteirinha Católica Digital
            </p>
            <a
              href="/"
              className="inline-block text-white hover:text-amber-200 text-sm font-medium underline"
            >
              Crie a sua também
            </a>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
