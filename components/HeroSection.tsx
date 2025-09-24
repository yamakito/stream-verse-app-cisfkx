
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, commonStyles, buttonStyles } from '../styles/commonStyles';
import { Movie } from '../types/Movie';

interface HeroSectionProps {
  movie: Movie;
  onPlay: () => void;
  onAddToWatchlist: () => void;
}

const { width } = Dimensions.get('window');

export default function HeroSection({ movie, onPlay, onAddToWatchlist }: HeroSectionProps) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: movie.backdrop }} style={styles.heroImage} />
      
      <LinearGradient
        colors={['transparent', 'rgba(20, 20, 20, 0.8)', colors.background]}
        style={styles.gradient}
      />
      
      <View style={styles.content}>
        <Text style={styles.title}>{movie.title}</Text>
        <View style={styles.metaContainer}>
          <Text style={styles.year}>{movie.year}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color={colors.warning} />
            <Text style={styles.rating}>{movie.rating}</Text>
          </View>
          <Text style={styles.duration}>{movie.duration}m</Text>
        </View>
        <Text style={styles.genres}>
          {movie.genre.join(' • ')}
        </Text>
        <Text style={styles.description} numberOfLines={3}>
          {movie.description}
        </Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[buttonStyles.playButton, styles.playButton]} onPress={onPlay}>
            <Ionicons name="play" size={20} color={colors.background} />
            <Text style={styles.playButtonText}>Play</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[buttonStyles.addButton, styles.addButton]} onPress={onAddToWatchlist}>
            <Ionicons name="add" size={20} color={colors.text} />
            <Text style={styles.addButtonText}>My List</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: 500,
    marginBottom: 24,
  },
  heroImage: {
    width: width,
    height: 500,
    position: 'absolute',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 300,
  },
  content: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  title: {
    ...commonStyles.title,
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 8,
  },
  year: {
    ...commonStyles.textSecondary,
    fontSize: 16,
    fontWeight: '500',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    ...commonStyles.textSecondary,
    fontSize: 16,
    fontWeight: '500',
  },
  duration: {
    ...commonStyles.textSecondary,
    fontSize: 16,
    fontWeight: '500',
  },
  genres: {
    ...commonStyles.textSecondary,
    fontSize: 14,
    marginBottom: 12,
  },
  description: {
    ...commonStyles.text,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  playButton: {
    flex: 1,
    maxWidth: 120,
  },
  playButtonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  addButton: {
    flex: 1,
    maxWidth: 120,
  },
  addButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
