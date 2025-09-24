
export interface Movie {
  id: string;
  title: string;
  description: string;
  poster: string;
  backdrop: string;
  year: number;
  genre: string[];
  rating: number;
  duration: number;
  videoUrl: string;
  trailerUrl?: string;
  cast: string[];
  director: string;
  language: string;
  subtitles: string[];
  quality: string[];
  isTrending?: boolean;
  isNew?: boolean;
  continueWatching?: {
    progress: number;
    timestamp: number;
  };
}

export interface TVShow extends Movie {
  seasons: Season[];
  totalSeasons: number;
  totalEpisodes: number;
}

export interface Season {
  id: string;
  seasonNumber: number;
  title: string;
  episodes: Episode[];
  year: number;
}

export interface Episode {
  id: string;
  title: string;
  description: string;
  episodeNumber: number;
  duration: number;
  videoUrl: string;
  thumbnail: string;
  airDate: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  watchlist: string[];
  continueWatching: {
    movieId: string;
    progress: number;
    timestamp: number;
  }[];
  preferences: {
    language: string;
    autoplay: boolean;
    quality: string;
  };
}

export interface VideoPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  isFullscreen: boolean;
  quality: string;
  subtitles: boolean;
  volume: number;
  isLoading: boolean;
}
