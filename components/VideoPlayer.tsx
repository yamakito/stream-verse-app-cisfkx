
import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/commonStyles';
import { VideoPlayerState } from '../types/Movie';

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  onClose: () => void;
  subtitles?: string[];
  quality?: string[];
}

const { width, height } = Dimensions.get('window');

export default function VideoPlayer({ videoUrl, title, onClose, subtitles = [], quality = [] }: VideoPlayerProps) {
  const videoRef = useRef<Video>(null);
  const [playerState, setPlayerState] = useState<VideoPlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    isFullscreen: true,
    quality: quality[0] || '720p',
    subtitles: false,
    volume: 1.0,
    isLoading: true,
  });
  const [showControls, setShowControls] = useState(true);
  const [controlsTimeout, setControlsTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (showControls) {
      if (controlsTimeout) {
        clearTimeout(controlsTimeout);
      }
      const timeout = setTimeout(() => {
        setShowControls(false);
      }, 3000);
      setControlsTimeout(timeout);
    }
    return () => {
      if (controlsTimeout) {
        clearTimeout(controlsTimeout);
      }
    };
  }, [showControls]);

  const handlePlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setPlayerState(prev => ({
        ...prev,
        isPlaying: status.isPlaying || false,
        currentTime: status.positionMillis || 0,
        duration: status.durationMillis || 0,
        isLoading: false,
      }));
    }
  };

  const togglePlayPause = async () => {
    if (videoRef.current) {
      if (playerState.isPlaying) {
        await videoRef.current.pauseAsync();
      } else {
        await videoRef.current.playAsync();
      }
    }
  };

  const seekTo = async (position: number) => {
    if (videoRef.current) {
      await videoRef.current.setPositionAsync(position);
    }
  };

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleScreenTouch = () => {
    setShowControls(!showControls);
  };

  const skipForward = () => {
    const newPosition = Math.min(playerState.currentTime + 10000, playerState.duration);
    seekTo(newPosition);
  };

  const skipBackward = () => {
    const newPosition = Math.max(playerState.currentTime - 10000, 0);
    seekTo(newPosition);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.videoContainer} 
        activeOpacity={1}
        onPress={handleScreenTouch}
      >
        <Video
          ref={videoRef}
          source={{ uri: videoUrl }}
          style={styles.video}
          resizeMode={ResizeMode.CONTAIN}
          shouldPlay={false}
          isLooping={false}
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        />
        
        {playerState.isLoading && (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        )}

        {showControls && (
          <View style={styles.controlsOverlay}>
            {/* Top Controls */}
            <View style={styles.topControls}>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Ionicons name="arrow-back" size={24} color={colors.text} />
              </TouchableOpacity>
              <Text style={styles.videoTitle}>{title}</Text>
              <View style={styles.topRightControls}>
                <TouchableOpacity style={styles.controlButton}>
                  <Ionicons name="settings-outline" size={24} color={colors.text} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Center Controls */}
            <View style={styles.centerControls}>
              <TouchableOpacity onPress={skipBackward} style={styles.skipButton}>
                <Ionicons name="play-back" size={32} color={colors.text} />
                <Text style={styles.skipText}>10</Text>
              </TouchableOpacity>
              
              <TouchableOpacity onPress={togglePlayPause} style={styles.playButton}>
                <Ionicons 
                  name={playerState.isPlaying ? "pause" : "play"} 
                  size={48} 
                  color={colors.text} 
                />
              </TouchableOpacity>
              
              <TouchableOpacity onPress={skipForward} style={styles.skipButton}>
                <Ionicons name="play-forward" size={32} color={colors.text} />
                <Text style={styles.skipText}>10</Text>
              </TouchableOpacity>
            </View>

            {/* Bottom Controls */}
            <View style={styles.bottomControls}>
              <View style={styles.progressContainer}>
                <Text style={styles.timeText}>
                  {formatTime(playerState.currentTime)}
                </Text>
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { width: `${(playerState.currentTime / playerState.duration) * 100}%` }
                    ]} 
                  />
                </View>
                <Text style={styles.timeText}>
                  {formatTime(playerState.duration)}
                </Text>
              </View>
              
              <View style={styles.bottomRightControls}>
                <TouchableOpacity style={styles.controlButton}>
                  <Ionicons name="chatbubble-outline" size={20} color={colors.text} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.controlButton}>
                  <Ionicons name="expand-outline" size={20} color={colors.text} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  videoContainer: {
    flex: 1,
    position: 'relative',
  },
  video: {
    width: width,
    height: height,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  loadingText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '600',
  },
  controlsOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'space-between',
  },
  topControls: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
  },
  closeButton: {
    padding: 8,
  },
  videoTitle: {
    flex: 1,
    color: colors.text,
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 16,
  },
  topRightControls: {
    flexDirection: 'row',
  },
  centerControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 40,
  },
  playButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 40,
    padding: 20,
  },
  skipButton: {
    alignItems: 'center',
    position: 'relative',
  },
  skipText: {
    position: 'absolute',
    color: colors.text,
    fontSize: 12,
    fontWeight: '600',
    bottom: 8,
  },
  bottomControls: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 50,
    gap: 16,
  },
  progressContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  timeText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '500',
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  bottomRightControls: {
    flexDirection: 'row',
    gap: 16,
  },
  controlButton: {
    padding: 8,
  },
});
