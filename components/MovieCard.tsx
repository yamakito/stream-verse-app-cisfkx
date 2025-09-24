
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, commonStyles } from '../styles/commonStyles';
import { Movie } from '../types/Movie';

interface MovieCardProps {
  movie: Movie;
  onPress: () => void;
  onAddToWatchlist?: () => void;
  size?: 'small' | 'medium' | 'large';
}

export default function MovieCard({ movie, onPress, onAddToWatchlist, size = 'medium' }: MovieCardProps) {
  const cardStyle = size === 'small' ? styles.smallCard : size === 'large' ? styles.largeCard : styles.mediumCard;
  const imageStyle = size === 'small' ? styles.smallImage : size === 'large' ? styles.largeImage : styles.mediumImage;

  return (
    <TouchableOpacity style={cardStyle} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: movie.poster }} style={imageStyle} />
        
        {movie.isTrending && (
          <View style={styles.trendingBadge}>
            <Ionicons name="trending-up" size={12} color={colors.text} />
            <Text style={styles.badgeText}>Trending</Text>
          </View>
        )}
        
        {movie.isNew && (
          <View style={styles.newBadge}>
            <Text style={styles.badgeText}>New</Text>
          </View>
        )}

        <TouchableOpacity 
          style={styles.watchlistButton}
          onPress={(e) => {
            e.stopPropagation();
            onAddToWatchlist?.();
          }}
        >
          <Ionicons name="add" size={16} color={colors.text} />
        </TouchableOpacity>
      </View>
      
      {size !== 'small' && (
        <View style={styles.cardContent}>
          <Text style={styles.movieTitle} numberOfLines={2}>
            {movie.title}
          </Text>
          <View style={styles.movieMeta}>
            <Text style={styles.movieYear}>{movie.year}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={12} color={colors.warning} />
              <Text style={styles.movieRating}>{movie.rating}</Text>
            </View>
          </View>
          <Text style={styles.movieGenres}>
            {movie.genre.slice(0, 2).join(' • ')}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  smallCard: {
    width: 100,
    marginRight: 8,
  },
  mediumCard: {
    width: 140,
    marginRight: 12,
  },
  largeCard: {
    width: 160,
    marginRight: 16,
  },
  imageContainer: {
    position: 'relative',
  },
  smallImage: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  mediumImage: {
    width: 140,
    height: 210,
    borderRadius: 8,
  },
  largeImage: {
    width: 160,
    height: 240,
    borderRadius: 8,
  },
  trendingBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: colors.primary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  newBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: colors.success,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: {
    color: colors.text,
    fontSize: 10,
    fontWeight: '600',
  },
  watchlistButton: {
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
  cardContent: {
    paddingTop: 8,
  },
  movieTitle: {
    ...commonStyles.text,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  movieMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  movieYear: {
    ...commonStyles.textSecondary,
    fontSize: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  movieRating: {
    ...commonStyles.textSecondary,
    fontSize: 12,
  },
  movieGenres: {
    ...commonStyles.textSecondary,
    fontSize: 11,
  },
});
