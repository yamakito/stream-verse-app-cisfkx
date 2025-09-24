
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack, useGlobalSearchParams, router, usePathname } from 'expo-router';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform } from 'react-native';
import { useEffect } from 'react';
import { setupErrorLogging } from '../utils/errorLogger';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import BottomNavigation from '../components/BottomNavigation';
import { colors } from '../styles/commonStyles';

const STORAGE_KEY = 'emulated_device';

export default function RootLayout() {
  const actualInsets = useSafeAreaInsets();
  const { emulate } = useGlobalSearchParams<{ emulate?: string }>();
  const [storedEmulate, setStoredEmulate] = useState<string | null>(null);
  const pathname = usePathname();
  
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    // Set up global error logging
    setupErrorLogging();

    if (Platform.OS === 'web') {
      // If there's a new emulate parameter, store it
      if (emulate) {
        localStorage.setItem(STORAGE_KEY, emulate);
        setStoredEmulate(emulate);
      } else {
        // If no emulate parameter, try to get from localStorage
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          setStoredEmulate(stored);
        }
      }
    }
  }, [emulate]);

  let insetsToUse = actualInsets;

  if (Platform.OS === 'web') {
    const simulatedInsets = {
      ios: { top: 47, bottom: 20, left: 0, right: 0 },
      android: { top: 40, bottom: 0, left: 0, right: 0 },
    };

    // Use stored emulate value if available, otherwise use the current emulate parameter
    const deviceToEmulate = storedEmulate || emulate;
    insetsToUse = deviceToEmulate ? simulatedInsets[deviceToEmulate as keyof typeof simulatedInsets] || actualInsets : actualInsets;
  }

  const getActiveTab = () => {
    if (pathname === '/') return 'home';
    if (pathname === '/search') return 'search';
    if (pathname === '/watchlist') return 'watchlist';
    if (pathname === '/profile') return 'profile';
    return 'home';
  };

  const handleTabPress = (tab: string) => {
    switch (tab) {
      case 'home':
        router.push('/');
        break;
      case 'search':
        router.push('/search');
        break;
      case 'watchlist':
        router.push('/watchlist');
        break;
      case 'profile':
        router.push('/profile');
        break;
    }
  };

  const shouldShowBottomNav = () => {
    const mainTabs = ['/', '/search', '/watchlist', '/profile'];
    return mainTabs.includes(pathname);
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Stack
            screenOptions={{
              headerShown: false,
              animation: 'default',
            }}
          />
          
          {shouldShowBottomNav() && (
            <BottomNavigation
              activeTab={getActiveTab()}
              onTabPress={handleTabPress}
            />
          )}
        </View>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
