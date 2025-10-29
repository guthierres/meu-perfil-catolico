import React from 'react';
import { Music } from 'lucide-react';

export interface MusicEmbedData {
  type: 'spotify' | 'youtube';
  url: string;
  title: string;
}

interface MusicEmbedProps {
  embed: MusicEmbedData;
  onRemove?: () => void;
  editable?: boolean;
}

const extractSpotifyData = (url: string): { id: string; type: 'track' | 'playlist' | 'album' } | null => {
  const patterns = [
    { regex: /spotify\.com\/(?:intl-[a-z]{2}\/)?track\/([a-zA-Z0-9]+)/, type: 'track' as const },
    { regex: /spotify\.com\/(?:intl-[a-z]{2}\/)?playlist\/([a-zA-Z0-9]+)/, type: 'playlist' as const },
    { regex: /spotify\.com\/(?:intl-[a-z]{2}\/)?album\/([a-zA-Z0-9]+)/, type: 'album' as const },
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern.regex);
    if (match) return { id: match[1], type: pattern.type };
  }
  return null;
};

const extractYoutubeId = (url: string): string | null => {
  const patterns = [
    /youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/,
    /youtu\.be\/([a-zA-Z0-9_-]+)/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
};

export const MusicEmbed: React.FC<MusicEmbedProps> = ({ embed, onRemove, editable = false }) => {
  if (embed.type === 'spotify') {
    const spotifyData = extractSpotifyData(embed.url);

    if (!spotifyData) {
      return (
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 text-destructive">
          URL do Spotify inválida
        </div>
      );
    }

    const embedUrl = `https://open.spotify.com/embed/${spotifyData.type}/${spotifyData.id}`;

    return (
      <div className="relative group">
        {editable && onRemove && (
          <button
            onClick={onRemove}
            className="absolute -top-2 -right-2 z-10 bg-destructive text-destructive-foreground rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-destructive/90 shadow-lg"
            title="Remover música"
          >
            ×
          </button>
        )}
        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
          {embed.title && (
            <div className="px-4 py-3 bg-muted/50 border-b border-border">
              <div className="flex items-center gap-2">
                <Music className="w-4 h-4 text-primary" />
                <p className="text-sm font-semibold text-foreground truncate">{embed.title}</p>
              </div>
            </div>
          )}
          <div className="p-2">
            <iframe
              src={embedUrl}
              className="w-full rounded-lg"
              height="152"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title={embed.title || 'Spotify Player'}
            />
          </div>
        </div>
      </div>
    );
  }

  if (embed.type === 'youtube') {
    const youtubeId = extractYoutubeId(embed.url);

    if (!youtubeId) {
      return (
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 text-destructive">
          URL do YouTube inválida
        </div>
      );
    }

    return (
      <div className="relative group">
        {editable && onRemove && (
          <button
            onClick={onRemove}
            className="absolute -top-2 -right-2 z-10 bg-destructive text-destructive-foreground rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-destructive/90 shadow-lg"
            title="Remover vídeo"
          >
            ×
          </button>
        )}
        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
          {embed.title && (
            <div className="px-4 py-3 bg-muted/50 border-b border-border">
              <p className="text-sm font-semibold text-foreground">{embed.title}</p>
            </div>
          )}
          <div className="relative" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}`}
              className="absolute top-0 left-0 w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              title={embed.title || 'YouTube Video'}
            />
          </div>
        </div>
      </div>
    );
  }

  return null;
};
