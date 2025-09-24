
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { colors, commonStyles } from '../styles/commonStyles';
import { Movie } from '../types/Movie';
import MovieCard from './MovieCard';

interface MovieRowProps {
  title: string;
  movies: Movie[];
  onMoviePress: (movie: Movie) => void;
  onAddToWatchlist?: (movie: Movie) => void;
  size?: 'small' | 'medium' | 'large';
}

export default function MovieRow({ 
  title, 
  movies, 
  onMoviePress, 
  onAddToWatchlist, 
  size = 'medium' 
}: MovieRowProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onPress={() => onMoviePress(movie)}
            onAddToWatchlist={() => onAddToWatchlist?.(movie)}
            size={size}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    ...commonStyles.subtitle,
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
});
