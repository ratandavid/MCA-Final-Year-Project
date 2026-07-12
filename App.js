import { StatusBar } from 'expo-status-bar';
import { useState, useRef } from 'react';
import { StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import ViewShot from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import { Ionicons } from '@expo/vector-icons';
import SignUp from './app/screens/SignUp';
import Login from './app/screens/Login';
import Home from './app/screens/Home';
import Cardview from './app/screens/Cardview';
import MyFav from './app/screens/MyFav';
import RemFav from './app/screens/RemFav';
import DarkTheme from './app/screens/DarkTheme';
import DailyReminder from './app/screens/DailyReminder';
import Sidebar from './app/components/Sidebar';

export default function App() {
  const [screen, setScreen] = useState('signup');
  const [previousScreen, setPreviousScreen] = useState('home');
  const [registeredUser, setRegisteredUser] = useState(null);
  const [userName, setUserName] = useState('');
  const [selectedMeditation, setSelectedMeditation] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const viewShotRef = useRef(null);

  const takeScreenshot = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Please allow media library access to save screenshots.');
        return;
      }
      const uri = await viewShotRef.current.capture();
      await MediaLibrary.saveToLibraryAsync(uri);
      Alert.alert('Screenshot Saved', 'Your screenshot has been saved to your gallery.');
    } catch {
      Alert.alert('Error', 'Could not take screenshot. Please try again.');
    }
  };

  const toggleFavorite = (meditation) => {
    setFavorites((current) => {
      const exists = current.some((item) => item.title === meditation.title);
      if (exists) {
        return current.filter((item) => item.title !== meditation.title);
      }
      return [...current, meditation];
    });
  };

  const openMeditation = (item, fromScreen) => {
    setSelectedMeditation(item);
    setPreviousScreen(fromScreen);
    setScreen('cardview');
  };

  const openRemoveFavorite = (item) => {
    setSelectedMeditation(item);
    setScreen('remfav');
  };

  const handleLogout = () => {
    setSidebarVisible(false);
    setUserName('');
    setScreen('login');
  };

  return (
    <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
    <ViewShot ref={viewShotRef} style={styles.viewShot} options={{ format: 'jpg', quality: 0.95 }}>
      {screen === 'signup' && (
        <SignUp
          registeredUser={registeredUser}
          onSignUpSuccess={(username, email, pass) => {
            setRegisteredUser({ username, email, pass });
            setUserName(username);
            setScreen('home');
          }}
          onNavigateToLogin={() => setScreen('login')}
        />
      )}
      {screen === 'login' && (
        <Login
          registeredUser={registeredUser}
          onLoginSuccess={(name) => {
            setUserName(name);
            setScreen('home');
          }}
          onNavigateToSignUp={() => setScreen('signup')}
        />
      )}
      {screen === 'home' && (
        <Home
          userName={userName}
          darkMode={darkMode}
          onSelectMeditation={(item) => openMeditation(item, 'home')}
          onOpenSettings={() => setSidebarVisible(true)}
          onOpenReminders={() => setScreen('reminders')}
        />
      )}
      {screen === 'cardview' && (
        <Cardview
          meditation={selectedMeditation}
          isFavorite={favorites.some((item) => item.title === selectedMeditation?.title)}
          onToggleFavorite={() => toggleFavorite(selectedMeditation)}
          onBack={() => setScreen(previousScreen)}
        />
      )}
      {screen === 'myfav' && (
        <MyFav
          favorites={favorites}
          onSelectMeditation={openRemoveFavorite}
          onOpenSettings={() => setSidebarVisible(true)}
          onBack={() => setScreen('home')}
        />
      )}
      {screen === 'remfav' && (
        <RemFav
          meditation={selectedMeditation}
          onRemoveFavorite={(item) => {
            toggleFavorite(item);
            setScreen('myfav');
          }}
          onOpenSettings={() => setSidebarVisible(true)}
          onBack={() => setScreen('myfav')}
        />
      )}
      {screen === 'darktheme' && (
        <DarkTheme
          darkMode={darkMode}
          onToggleDarkMode={setDarkMode}
          onOpenSettings={() => setSidebarVisible(true)}
          onBack={() => setScreen('home')}
        />
      )}
      {screen === 'reminders' && (
        <DailyReminder
          darkMode={darkMode}
          onOpenSettings={() => setSidebarVisible(true)}
          onBack={() => setScreen('home')}
        />
      )}


      <Sidebar
        visible={sidebarVisible}
        userName={userName}
        onClose={() => setSidebarVisible(false)}
        onLogout={handleLogout}
        onSelectItem={(key) => {
          setSidebarVisible(false);
          if (key === 'favourite') setScreen('myfav');
          if (key === 'settings') setScreen('darktheme');
          if (key === 'reminders') setScreen('reminders');
        }}
      />

      {/* Floating screenshot button */}
      <TouchableOpacity style={styles.screenshotBtn} onPress={takeScreenshot} activeOpacity={0.85}>
        <Ionicons name="camera" size={22} color="#fff" />
      </TouchableOpacity>
    </ViewShot>
    </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewShot: {
    flex: 1,
    width: '100%',
  },
  screenshotBtn: {
    position: 'absolute',
    bottom: 28,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#6C63FF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
});
