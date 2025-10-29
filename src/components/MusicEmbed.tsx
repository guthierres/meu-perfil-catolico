import React from 'react';
import { ExternalLink, Music } from 'lucide-react';

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

const extractSpotifyId = (url: string): string | null => {
  const patterns = [
    /spotify\.com\/(?:intl-[a-z]{2}\/)?track\/([a-zA-Z0-9]+)/,
    /spotify\.com\/(?:intl-[a-z]{2}\/)?playlist\/([a-zA-Z0-9]+)/,
    /spotify\.com\/(?:intl-[a-z]{2}\/)?album\/([a-zA-Z0-9]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
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
    const spotifyId = extractSpotifyId(embed.url);

    if (!spotifyId) {
      return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
          URL do Spotify inválida
        </div>
      );
    }

    return (
      <div className="relative group">
        {editable && onRemove && (
          <button
            onClick={onRemove}
            className="absolute -top-2 -right-2 z-10 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
            title="Remover música"
          >
            ×
          </button>
        )}
        <a
          href={embed.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-400 rounded-lg p-6 hover:shadow-xl hover:scale-[1.02] transition-all duration-200 group"
        >
          <div className="flex items-center gap-4">
            <div className="bg-green-500 p-3 rounded-xl flex-shrink-0 group-hover:bg-green-600 transition-colors">
              <Music className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              {embed.title && (
                <p className="text-lg font-bold text-gray-800 mb-1 truncate">{embed.title}</p>
              )}
              <p className="text-sm text-green-700 font-semibold flex items-center gap-2">
                <span>Ouvir no Spotify</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </p>
            </div>
          </div>
        </a>
      </div>
    );
  }

  if (embed.type === 'youtube') {
    const youtubeId = extractYoutubeId(embed.url);

    if (!youtubeId) {
      return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
          URL do YouTube inválida
        </div>
      );
    }

    return (
      <div className="relative group">
        {editable && onRemove && (
          <button
            onClick={onRemove}
            className="absolute -top-2 -right-2 z-10 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
            title="Remover vídeo"
          >
            ×
          </button>
        )}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {embed.title && (
            <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
              <p className="text-sm font-medium text-gray-700">{embed.title}</p>
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
            />
          </div>
        </div>
      </div>
    );
  }

  return null;
};
