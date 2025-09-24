
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, commonStyles } from '../styles/commonStyles';
import { mockMovies, genres } from '../data/mockData';
import { Movie } from '../types/Movie';
import SearchBar from '../components/SearchBar';
import GenreFilter from '../components/GenreFilter';
import MovieCard from '../components/MovieCard';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>(mockMovies);

  useEffect(() => {
    filterMovies();
  }, [searchQuery, selectedGenre]);

  const filterMovies = () => {
    let filtered = mockMovies;

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.genre.some(g => g.toLowerCase().includes(searchQuery.toLowerCase())) ||
        movie.cast.some(actor => actor.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by genre
    if (selectedGenre !== 'All') {
      filtered = filtered.filter(movie =>
        movie.genre.includes(selectedGenre)
      );
    }

    setFilteredMovies(filtered);
  };

  const handleMoviePress = (movie: Movie) => {
    router.push(`/movie/${movie.id}`);
  };

  const handleAddToWatchlist = (movie: Movie) => {
    console.log('Added to watchlist:', movie.title);
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={styles.header}>
        <Text style={commonStyles.title}>Search</Text>
      </View>
      
      <SearchBar onSearch={setSearchQuery} />
      
      <GenreFilter
        genres={genres}
        selectedGenre={selectedGenre}
        onGenreSelect={setSelectedGenre}
      />

      <ScrollView style={styles.resultsContainer} showsVerticalScrollIndicator={false}>
        {filteredMovies.length === 0 ? (
          <View style={styles.noResultsContainer}>
            <Text style={styles.noResultsText}>
              {searchQuery.trim() ? 'No movies found' : 'Start searching for movies and TV shows'}
            </Text>
          </View>
        ) : (
          <View style={styles.moviesGrid}>
            {filteredMovies.map((movie) => (
              <View key={movie.id} style={styles.movieCardContainer}>
                <MovieCard
                  movie={movie}
                  onPress={() => handleMoviePress(movie)}
                  onAddToWatchlist={() => handleAddToWatchlist(movie)}
                  size="medium"
                />
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  resultsContainer: {
    flex: 1,
  },
  noResultsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  noResultsText: {
    ...commonStyles.textSecondary,
    fontSize: 16,
    textAlign: 'center',
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
  },
});
