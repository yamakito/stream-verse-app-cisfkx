
import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, commonStyles } from '../styles/commonStyles';
import { mockMovies, featuredContent, trendingContent, newReleases } from '../data/mockData';
import { Movie } from '../types/Movie';
import HeroSection from '../components/HeroSection';
import MovieRow from '../components/MovieRow';
import VideoPlayer from '../components/VideoPlayer';

export default function HomeScreen() {
  const [showPlayer, setShowPlayer] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleMoviePress = (movie: Movie) => {
    router.push(`/movie/${movie.id}`);
  };

  const handlePlayMovie = (movie: Movie) => {
    setSelectedMovie(movie);
    setShowPlayer(true);
  };

  const handleAddToWatchlist = (movie: Movie) => {
    console.log('Added to watchlist:', movie.title);
  };

  if (showPlayer && selectedMovie) {
    return (
      <VideoPlayer
        videoUrl={selectedMovie.videoUrl}
        title={selectedMovie.title}
        onClose={() => {
          setShowPlayer(false);
          setSelectedMovie(null);
        }}
        subtitles={selectedMovie.subtitles}
        quality={selectedMovie.quality}
      />
    );
  }

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <HeroSection
          movie={featuredContent}
          onPlay={() => handlePlayMovie(featuredContent)}
          onAddToWatchlist={() => handleAddToWatchlist(featuredContent)}
        />

        {/* Trending Now */}
        <MovieRow
          title="Trending Now"
          movies={trendingContent}
          onMoviePress={handleMoviePress}
          onAddToWatchlist={handleAddToWatchlist}
          size="large"
        />

        {/* New Releases */}
        <MovieRow
          title="New Releases"
          movies={newReleases}
          onMoviePress={handleMoviePress}
          onAddToWatchlist={handleAddToWatchlist}
          size="medium"
        />

        {/* Popular Movies */}
        <MovieRow
          title="Popular Movies"
          movies={mockMovies}
          onMoviePress={handleMoviePress}
          onAddToWatchlist={handleAddToWatchlist}
          size="medium"
        />

        {/* Action Movies */}
        <MovieRow
          title="Action Movies"
          movies={mockMovies.filter(movie => movie.genre.includes('Action'))}
          onMoviePress={handleMoviePress}
          onAddToWatchlist={handleAddToWatchlist}
          size="medium"
        />

        {/* Drama Movies */}
        <MovieRow
          title="Drama Movies"
          movies={mockMovies.filter(movie => movie.genre.includes('Drama'))}
          onMoviePress={handleMoviePress}
          onAddToWatchlist={handleAddToWatchlist}
          size="medium"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
