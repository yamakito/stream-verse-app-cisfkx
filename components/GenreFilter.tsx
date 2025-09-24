
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { colors, commonStyles } from '../styles/commonStyles';

interface GenreFilterProps {
  genres: string[];
  selectedGenre: string;
  onGenreSelect: (genre: string) => void;
}

export default function GenreFilter({ genres, selectedGenre, onGenreSelect }: GenreFilterProps) {
  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {genres.map((genre) => (
          <TouchableOpacity
            key={genre}
            style={[
              styles.genreButton,
              selectedGenre === genre && styles.selectedGenreButton
            ]}
            onPress={() => onGenreSelect(genre)}
          >
            <Text style={[
              styles.genreText,
              selectedGenre === genre && styles.selectedGenreText
            ]}>
              {genre}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  genreButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.backgroundAlt,
    borderWidth: 1,
    borderColor: colors.grey,
  },
  selectedGenreButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  genreText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '500',
  },
  selectedGenreText: {
    color: colors.text,
    fontWeight: '600',
  },
});
