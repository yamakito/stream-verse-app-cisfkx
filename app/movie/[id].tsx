
import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, commonStyles, buttonStyles } from '../../styles/commonStyles';
import { mockMovies } from '../../data/mockData';
import VideoPlayer from '../../components/VideoPlayer';

const { width } = Dimensions.get('window');

export default function MovieDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [showPlayer, setShowPlayer] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  const movie = mockMovies.find(m => m.id === id);

  if (!movie) {
    return (
      <SafeAreaView style={commonStyles.container}>
        <View style={commonStyles.center}>
          <Text style={commonStyles.text}>Movie not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (showPlayer) {
    return (
      <VideoPlayer
        videoUrl={movie.videoUrl}
        title={movie.title}
        onClose={() => setShowPlayer(false)}
        subtitles={movie.subtitles}
        quality={movie.quality}
      />
    );
  }

  const handleAddToWatchlist = () => {
    setIsInWatchlist(!isInWatchlist);
    console.log(`${isInWatchlist ? 'Removed from' : 'Added to'} watchlist: ${movie.title}`);
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        <View style={styles.headerContainer}>
          <Image source={{ uri: movie.backdrop }} style={styles.backdropImage} />
          
          <LinearGradient
            colors={['transparent', 'rgba(20, 20, 20, 0.8)', colors.background]}
            style={styles.gradient}
          />
          
          {/* Back Button */}
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          
          {/* Movie Info Overlay */}
          <View style={styles.movieInfoOverlay}>
            <Image source={{ uri: movie.poster }} style={styles.posterImage} />
            <View style={styles.movieDetails}>
              <Text style={styles.movieTitle}>{movie.title}</Text>
              <View style={styles.metaRow}>
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
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[buttonStyles.playButton, styles.playButton]} 
            onPress={() => setShowPlayer(true)}
          >
            <Ionicons name="play" size={20} color={colors.background} />
            <Text style={styles.playButtonText}>Play</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[buttonStyles.addButton, styles.addButton]} 
            onPress={handleAddToWatchlist}
          >
            <Ionicons 
              name={isInWatchlist ? "checkmark" : "add"} 
              size={20} 
              color={colors.text} 
            />
            <Text style={styles.addButtonText}>
              {isInWatchlist ? 'In List' : 'My List'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.shareButton}>
            <Ionicons name="share-outline" size={20} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.description}>{movie.description}</Text>
        </View>

        {/* Movie Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Details</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Director:</Text>
            <Text style={styles.detailValue}>{movie.director}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Cast:</Text>
            <Text style={styles.detailValue}>{movie.cast.join(', ')}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Language:</Text>
            <Text style={styles.detailValue}>{movie.language}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Subtitles:</Text>
            <Text style={styles.detailValue}>{movie.subtitles.join(', ')}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Quality:</Text>
            <Text style={styles.detailValue}>{movie.quality.join(', ')}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerContainer: {
    position: 'relative',
    height: 300,
  },
  backdropImage: {
    width: width,
    height: 300,
    position: 'absolute',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 150,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 8,
    zIndex: 1,
  },
  movieInfoOverlay: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  posterImage: {
    width: 100,
    height: 150,
    borderRadius: 8,
    marginRight: 16,
  },
  movieDetails: {
    flex: 1,
  },
  movieTitle: {
    ...commonStyles.title,
    fontSize: 24,
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  year: {
    ...commonStyles.textSecondary,
    fontSize: 14,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    ...commonStyles.textSecondary,
    fontSize: 14,
  },
  duration: {
    ...commonStyles.textSecondary,
    fontSize: 14,
  },
  genres: {
    ...commonStyles.textSecondary,
    fontSize: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
    alignItems: 'center',
  },
  playButton: {
    flex: 1,
  },
  playButtonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  addButton: {
    flex: 1,
  },
  addButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  shareButton: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 20,
    padding: 12,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sectionTitle: {
    ...commonStyles.subtitle,
    fontSize: 18,
    marginBottom: 12,
  },
  description: {
    ...commonStyles.text,
    fontSize: 16,
    lineHeight: 24,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailLabel: {
    ...commonStyles.textSecondary,
    fontSize: 14,
    width: 80,
    fontWeight: '500',
  },
  detailValue: {
    ...commonStyles.text,
    fontSize: 14,
    flex: 1,
  },
});
