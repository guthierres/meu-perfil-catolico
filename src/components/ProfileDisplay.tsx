import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Cross, Church, Calendar, Sparkles, BookOpen, LogOut, Edit, Music, Award } from 'lucide-react';
import { Profile } from '../types/profile';
import { MusicEmbed } from './MusicEmbed';
import { WalletCard } from './WalletCard';
import { ProfileTabs } from './ProfileTabs';
import { getDisplayName, getCivilStatusLabel, getSacramentLabel } from '../lib/profileUtils';
import { Header } from './Header';

interface ProfileDisplayProps {
  onEdit: () => void;
}

export function ProfileDisplay({ onEdit }: ProfileDisplayProps) {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'profile' | 'wallet'>('profile');

  useEffect(() => {
    loadProfile();
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;

    setLoading(true);
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (data) {
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

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 p-4">
        <div className="text-center max-w-md">
          <Cross className="w-20 h-20 text-amber-600 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Crie seu Perfil Católico</h2>
          <p className="text-gray-600 mb-8">
            Preencha suas informações para criar sua carteirinha católica digital
          </p>
          <button
            onClick={onEdit}
            className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-amber-700 hover:to-orange-700 transition shadow-lg"
          >
            Criar Perfil
          </button>
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
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-amber-600 to-orange-700 p-2 rounded-xl">
                  <Cross className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-amber-700 to-orange-700 bg-clip-text text-transparent">
                    ID Católico
                  </h1>
                  <p className="text-xs text-gray-600">Meu Perfil</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={onEdit}
                  className="bg-white px-4 py-2 rounded-xl font-semibold hover:bg-gray-50 transition shadow-sm flex items-center gap-2 text-gray-800"
                >
                  <Edit className="w-4 h-4" />
                  <span className="hidden sm:inline">Editar</span>
                </button>
                <button
                  onClick={signOut}
                  className="bg-white px-4 py-2 rounded-xl font-semibold hover:bg-gray-50 transition shadow-sm flex items-center gap-2 text-gray-800"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Sair</span>
                </button>
              </div>
            </div>
          </div>

          <ProfileTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            primaryColor={profile.primary_color}
          />

          {activeTab === 'wallet' ? (
            <WalletCard profile={profile} />
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
                  <div className="group relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-card via-card to-muted/20 border border-border shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 group-hover:from-primary/20 group-hover:to-primary/10 transition-colors">
                        <Calendar
                          className="w-6 h-6"
                          style={{ color: profile.primary_color }}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-muted-foreground mb-1">Data de Batismo</p>
                        <p className="text-lg font-bold text-foreground">
                          {new Date(profile.baptism_date).toLocaleDateString('pt-BR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-full"></div>
                  </div>
                )}

                {profile.parish && (
                  <div className="group relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-card via-card to-muted/20 border border-border shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 group-hover:from-primary/20 group-hover:to-primary/10 transition-colors">
                        <Church
                          className="w-6 h-6"
                          style={{ color: profile.primary_color }}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-muted-foreground mb-1">Paróquia</p>
                        <p className="text-lg font-bold text-foreground">{profile.parish}</p>
                      </div>
                    </div>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-full"></div>
                  </div>
                )}

                {profile.pastorals && profile.pastorals.length > 0 && (
                  <div className="group relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-card via-card to-muted/20 border border-border shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-secondary/10 to-secondary/5 group-hover:from-secondary/20 group-hover:to-secondary/10 transition-colors">
                        <Sparkles
                          className="w-6 h-6"
                          style={{ color: profile.secondary_color }}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-muted-foreground mb-3">
                          {profile.pastorals.length === 1 ? 'Pastoral' : 'Pastorais'}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {profile.pastorals.map((pastoral, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-secondary/10 to-secondary/5 border-l-4 hover:from-secondary/15 hover:to-secondary/10 transition-colors"
                              style={{ borderColor: profile.secondary_color }}
                            >
                              {pastoral}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-secondary/5 to-transparent rounded-bl-full"></div>
                  </div>
                )}

                {profile.priest_name && (
                  <div className="group relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-card via-card to-muted/20 border border-border shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-secondary/10 to-secondary/5 group-hover:from-secondary/20 group-hover:to-secondary/10 transition-colors">
                        <Cross
                          className="w-6 h-6"
                          style={{ color: profile.secondary_color }}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-muted-foreground mb-1">Pároco</p>
                        <p className="text-lg font-bold text-foreground">{profile.priest_name}</p>
                      </div>
                    </div>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-secondary/5 to-transparent rounded-bl-full"></div>
                  </div>
                )}

                {profile.sacraments && profile.sacraments.length > 0 && (
                  <div className="group relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-card via-card to-muted/20 border border-border shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-secondary/10 to-secondary/5 group-hover:from-secondary/20 group-hover:to-secondary/10 transition-colors">
                        <Award
                          className="w-6 h-6"
                          style={{ color: profile.secondary_color }}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-muted-foreground mb-3">
                          Sacramentos Recebidos ({profile.sacraments.length})
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {profile.sacraments.map((sacrament, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-secondary/10 to-secondary/5 border-l-4 hover:from-secondary/15 hover:to-secondary/10 transition-colors"
                              style={{ borderColor: profile.secondary_color }}
                            >
                              {getSacramentLabel(sacrament)}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-secondary/5 to-transparent rounded-bl-full"></div>
                  </div>
                )}
              </div>

              {(profile.patron_saint || profile.saint_image_url) && (
                <div className="group relative overflow-hidden rounded-3xl p-8 mb-8 bg-gradient-to-br from-card via-primary/5 to-secondary/5 border-2 border-border shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10">
                        <Sparkles className="w-6 h-6" style={{ color: profile.primary_color }} />
                      </div>
                      <h3 className="text-xl font-bold text-foreground">Santo de Devoção</h3>
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      {profile.saint_image_url && (
                        <div 
                          className="w-32 h-32 rounded-3xl overflow-hidden shadow-xl flex-shrink-0 ring-4 ring-offset-4 ring-offset-card group-hover:scale-105 transition-transform"
                          style={{ 
                            '--tw-ring-color': profile.secondary_color,
                            boxShadow: `0 0 0 4px var(--card), 0 0 0 8px ${profile.secondary_color}`
                          } as React.CSSProperties}
                        >
                          <img
                            src={profile.saint_image_url}
                            alt={profile.patron_saint}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      {profile.patron_saint && (
                        <p className="text-2xl font-bold text-center md:text-left bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                          {profile.patron_saint}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {profile.inspiration_quote && (
                <div className="group relative overflow-hidden rounded-3xl p-8 mb-6 bg-gradient-to-br from-card via-secondary/5 to-primary/5 border-l-4 shadow-lg hover:shadow-xl transition-all duration-300"
                  style={{ borderColor: profile.secondary_color }}
                >
                  <div className="absolute top-0 left-0 text-[120px] font-serif text-secondary/5 leading-none">"</div>
                  <div className="relative">
                    <p className="text-lg md:text-xl italic text-foreground leading-relaxed mb-4 pl-8">
                      {profile.inspiration_quote}
                    </p>
                    {profile.quote_author && (
                      <p className="text-sm font-semibold text-muted-foreground text-right pr-4">
                        — {profile.quote_author}
                      </p>
                    )}
                  </div>
                  <div className="absolute bottom-0 right-0 text-[120px] font-serif text-primary/5 leading-none rotate-180">"</div>
                </div>
              )}

              {profile.bible_passage && (
                <div className="group relative overflow-hidden rounded-3xl p-8 mb-6 bg-gradient-to-br from-card via-primary/5 to-secondary/5 border-l-4 shadow-lg hover:shadow-xl transition-all duration-300"
                  style={{ borderColor: profile.primary_color }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10">
                      <BookOpen className="w-6 h-6" style={{ color: profile.primary_color }} />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">Passagem Bíblica</h3>
                  </div>
                  <p className="text-base md:text-lg text-foreground leading-relaxed whitespace-pre-line pl-4 border-l-2 border-primary/20">
                    {profile.bible_passage}
                  </p>
                </div>
              )}

              {profile.music_embeds && profile.music_embeds.length > 0 && (
                <div className="group relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-card via-secondary/5 to-primary/5 border-l-4 shadow-lg hover:shadow-xl transition-all duration-300"
                  style={{ borderColor: profile.secondary_color }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-secondary/20 to-secondary/10">
                      <Music className="w-6 h-6" style={{ color: profile.secondary_color }} />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">Músicas</h3>
                  </div>
                  <div className="space-y-6">
                    {profile.music_embeds.map((embed, index) => (
                      <div key={index} className="rounded-2xl overflow-hidden border border-border shadow-md hover:shadow-lg transition-shadow">
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
            <p className="text-white text-sm font-medium drop-shadow-lg">
              Carteirinha Católica Digital
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
