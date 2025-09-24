
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, commonStyles } from '../styles/commonStyles';

export default function ProfileScreen() {
  const [autoplay, setAutoplay] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [downloadQuality, setDownloadQuality] = useState('HD');

  const settingsOptions = [
    {
      title: 'Account',
      items: [
        { label: 'Manage Profiles', icon: 'person-outline', onPress: () => console.log('Manage Profiles') },
        { label: 'Account Settings', icon: 'settings-outline', onPress: () => console.log('Account Settings') },
        { label: 'Privacy', icon: 'shield-outline', onPress: () => console.log('Privacy') },
      ]
    },
    {
      title: 'Playback',
      items: [
        { 
          label: 'Autoplay', 
          icon: 'play-circle-outline', 
          isSwitch: true, 
          value: autoplay, 
          onToggle: setAutoplay 
        },
        { 
          label: 'Download Quality', 
          icon: 'download-outline', 
          value: downloadQuality,
          onPress: () => console.log('Download Quality') 
        },
      ]
    },
    {
      title: 'Notifications',
      items: [
        { 
          label: 'Push Notifications', 
          icon: 'notifications-outline', 
          isSwitch: true, 
          value: notifications, 
          onToggle: setNotifications 
        },
      ]
    },
    {
      title: 'Support',
      items: [
        { label: 'Help Center', icon: 'help-circle-outline', onPress: () => console.log('Help Center') },
        { label: 'Contact Us', icon: 'mail-outline', onPress: () => console.log('Contact Us') },
        { label: 'About', icon: 'information-circle-outline', onPress: () => console.log('About') },
      ]
    }
  ];

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={styles.header}>
        <Text style={commonStyles.title}>Profile</Text>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* User Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person" size={48} color={colors.text} />
          </View>
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userEmail}>john.doe@example.com</Text>
          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Settings Sections */}
        {settingsOptions.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.items.map((item, itemIndex) => (
              <TouchableOpacity
                key={itemIndex}
                style={styles.settingItem}
                onPress={item.onPress}
                disabled={item.isSwitch}
              >
                <View style={styles.settingLeft}>
                  <Ionicons name={item.icon as any} size={24} color={colors.textSecondary} />
                  <Text style={styles.settingLabel}>{item.label}</Text>
                </View>
                <View style={styles.settingRight}>
                  {item.isSwitch ? (
                    <Switch
                      value={item.value}
                      onValueChange={item.onToggle}
                      trackColor={{ false: colors.backgroundAlt, true: colors.primary }}
                      thumbColor={colors.text}
                    />
                  ) : item.value ? (
                    <Text style={styles.settingValue}>{item.value}</Text>
                  ) : (
                    <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}

        {/* Sign Out Button */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.signOutButton}>
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>

        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  container: {
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.backgroundAlt,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.backgroundAlt,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  userName: {
    ...commonStyles.title,
    fontSize: 24,
    marginBottom: 4,
  },
  userEmail: {
    ...commonStyles.textSecondary,
    fontSize: 16,
    marginBottom: 16,
  },
  editProfileButton: {
    backgroundColor: colors.backgroundAlt,
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editProfileText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '500',
  },
  section: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    ...commonStyles.subtitle,
    fontSize: 18,
    marginBottom: 12,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingLabel: {
    ...commonStyles.text,
    fontSize: 16,
    marginLeft: 12,
  },
  settingRight: {
    alignItems: 'center',
  },
  settingValue: {
    ...commonStyles.textSecondary,
    fontSize: 14,
  },
  signOutButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  signOutText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  versionText: {
    ...commonStyles.textSecondary,
    fontSize: 12,
  },
});
