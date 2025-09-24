
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, commonStyles } from '../styles/commonStyles';
import { mockMovies } from '../data/mockData';
import { Movie } from '../types/Movie';
import MovieCard from '../components/MovieCard';

export default function WatchlistScreen() {
  // Mock watchlist - in a real app, this would come from user data
  const [watchlist, setWatchlist] = useState<Movie[]>(mockMovies.slice(0, 3));

  const handleMoviePress = (movie: Movie) => {
    router.push(`/movie/${movie.id}`);
  };

  const handleRemoveFromWatchlist = (movie: Movie) => {
    setWatchlist(prev => prev.filter(m => m.id !== movie.id));
    console.log('Removed from watchlist:', movie.title);
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={styles.header}>
        <Text style={commonStyles.title}>My List</Text>
        <Text style={styles.subtitle}>
          {watchlist.length} {watchlist.length === 1 ? 'movie' : 'movies'}
        </Text>
      </View>

      {watchlist.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="bookmark-outline" size={64} color={colors.textSecondary} />
          <Text style={styles.emptyTitle}>Your watchlist is empty</Text>
          <Text style={styles.emptyDescription}>
            Add movies and TV shows to your list to watch them later
          </Text>
          <TouchableOpacity 
            style={styles.browseButton}
            onPress={() => router.push('/search')}
          >
            <Text style={styles.browseButtonText}>Browse Movies</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          <View style={styles.moviesGrid}>
            {watchlist.map((movie) => (
              <View key={movie.id} style={styles.movieCardContainer}>
                <MovieCard
                  movie={movie}
                  onPress={() => handleMoviePress(movie)}
                  onAddToWatchlist={() => handleRemoveFromWatchlist(movie)}
                  size="medium"
                />
                <TouchableOpacity 
                  style={styles.removeButton}
                  onPress={() => handleRemoveFromWatchlist(movie)}
                >
                  <Ionicons name="close" size={16} color={colors.text} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 16,
  },
  subtitle: {
    ...commonStyles.textSecondary,
    fontSize: 14,
    marginTop: 4,
  },
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    ...commonStyles.title,
    fontSize: 20,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    ...commonStyles.textSecondary,
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  browseButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  browseButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  moviesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  movieCardContainer: {
    width: '48%',
    marginBottom: 16,
    position: 'relative',
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
