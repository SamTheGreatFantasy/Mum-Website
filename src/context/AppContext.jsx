import React, { createContext, useContext, useRef } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useBasket } from '../hooks/useBasket';
import { useFavourites } from '../hooks/useFavourites';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';
import clickMp3 from '../assets/Sounds/click.mp3';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // ─── Navigation ───────────────────────────────────────────────────────────
  const [page, setPage] = useLocalStorage('knitting-page', 'home');
  const [activeTab, setActiveTab] = React.useState('pattern');

  // ─── Appearance ───────────────────────────────────────────────────────────
  const [theme, setTheme] = useLocalStorage('knitting-theme', 'light');
  const [accent, setAccent] = useLocalStorage('knitting-accent', 'warm');
  const [clickSound, setClickSound] = useLocalStorage('knitting-click-sound', true);

  // ─── Account ──────────────────────────────────────────────────────────────
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  const [showProfileForm, setShowProfileForm] = React.useState(true);
  const [profile, setProfile] = useLocalStorage('knitting-profile', {
    displayName: '',
    realName: '',
    email: '',
    bio: '',
    memberSince: '',
    patternsCompleted: '0',
  });
  const [profileSaved, setProfileSaved] = React.useState(false);
  const [signInError, setSignInError] = React.useState('');
  const [showSignOutConfirm, setShowSignOutConfirm] = React.useState(false);

  // ─── Basket / Favourites / Recently viewed ────────────────────────────────
  const basket = useBasket();
  const favourites = useFavourites();
  const recentlyViewed = useRecentlyViewed();

  // ─── Sound ────────────────────────────────────────────────────────────────
  const audioContextRef = useRef(null);
  const clickAudioRef = useRef(null);

  React.useEffect(() => {
    clickAudioRef.current = new Audio(clickMp3);
    clickAudioRef.current.preload = 'auto';
  }, []);

  const createAudioContext = () => {
    const AudioCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtor || typeof AudioCtor !== 'function') return null;
    if (!audioContextRef.current) audioContextRef.current = new AudioCtor();
    if (audioContextRef.current?.state === 'suspended') audioContextRef.current.resume();
    return audioContextRef.current;
  };

  const handleClick = () => {
    if (!clickSound) return;
    if (clickAudioRef.current) {
      clickAudioRef.current.currentTime = 0;
      try { clickAudioRef.current.play().catch(() => {}); } catch {}
      return;
    }
    const ctx = createAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    osc1.type = 'triangle'; osc1.frequency.setValueAtTime(320, now);
    osc2.type = 'sine';     osc2.frequency.setValueAtTime(200, now);
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1800, now);
    filter.frequency.exponentialRampToValueAtTime(1200, now + 0.14);
    filter.Q.setValueAtTime(5, now);
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.14, now + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
    osc1.connect(filter); osc2.connect(filter);
    filter.connect(gain);  gain.connect(ctx.destination);
    osc1.start(now); osc2.start(now);
    osc1.stop(now + 0.18); osc2.stop(now + 0.18);
  };

  const handleHover = () => {};

  // ─── Account actions ──────────────────────────────────────────────────────
  // Validation helpers
  const isEmailValid = /.+@.+\..+/.test(profile.email.trim());
  const VALID_MONTHS = ['january','february','march','april','may','june','july','august','september','october','november','december'];
  const _memberMatch = /^([A-Za-z]+)\s(\d{4})$/.exec(profile.memberSince.trim());
  const isMemberSinceValid = !!_memberMatch && VALID_MONTHS.includes(_memberMatch[1].toLowerCase());
  const isPatternsValid = /^\d{1,3}$/.test(profile.patternsCompleted.trim());
  const isRealNameValid = /^[A-Za-z\s]+$/.test(profile.realName.trim());
  const isBioValid = profile.bio.trim().length >= 1 && profile.bio.trim().length <= 1000;
  const isProfileComplete = [
    profile.displayName, profile.realName, profile.email,
    profile.bio, profile.memberSince, profile.patternsCompleted,
  ].every((v) => String(v).trim() !== '');
  const isProfileValid = isProfileComplete && isEmailValid && isMemberSinceValid && isPatternsValid && isRealNameValid && isBioValid;

  const handleSignIn = () => {
    handleClick();
    if (!isProfileValid) {
      setSignInError('Please enter a valid real name, email, member since date, and patterns count before signing in.');
      return;
    }
    setSignInError('');
    setIsSignedIn(true);
    setProfileSaved(false);
    setShowProfileForm(false);
  };

  const handleSignOut = () => {
    handleClick();
    setIsSignedIn(false);
    setProfileSaved(false);
    setShowProfileForm(true);
    setProfile({ displayName: '', realName: '', email: '', bio: '', memberSince: '', patternsCompleted: '0' });
    setShowSignOutConfirm(false);
  };

  const handleProfileSave = () => {
    handleClick();
    setProfileSaved(true);
    setShowProfileForm(false);
  };

  const handleProfileFieldChange = (field, value) => {
    if (signInError) setSignInError('');
    if (field === 'bio') { setProfile((c) => ({ ...c, bio: value.slice(0, 1000) })); return; }
    if (field === 'realName') { setProfile((c) => ({ ...c, realName: value.replace(/\d/g, '') })); return; }
    if (field === 'memberSince') {
      const match = value.trim().match(/^([A-Za-z]+)\s(\d{4})$/);
      setProfile((c) => ({ ...c, memberSince: match ? `${match[1]} ${match[2]}` : value }));
      return;
    }
    if (field === 'patternsCompleted') {
      const digits = value.replace(/\D/g, '');
      const num = digits ? Number(digits) : 0;
      setProfile((c) => ({ ...c, patternsCompleted: num > 999 ? '999' : String(num) }));
      return;
    }
    setProfile((c) => ({ ...c, [field]: value }));
  };

  const avatarLabel = isSignedIn && profile.realName.trim()
    ? profile.realName.trim().split(/\s+/)[0].slice(0, 1).toUpperCase()
    : '';

  const handleTab = (tab) => { handleClick(); setActiveTab(tab); };

  return (
    <AppContext.Provider value={{
      // navigation
      page, setPage, activeTab, setActiveTab, handleTab,
      // appearance
      theme, setTheme, accent, setAccent, clickSound, setClickSound,
      // account
      isSignedIn, showProfileForm, setShowProfileForm,
      profile, setProfile, profileSaved, setProfileSaved,
      signInError, setSignInError,
      isEmailValid, isMemberSinceValid, isPatternsValid, isRealNameValid, isBioValid,
      isProfileComplete, isProfileValid,
      handleSignIn, handleSignOut, handleProfileSave, handleProfileFieldChange,
      avatarLabel,
      showSignOutConfirm, setShowSignOutConfirm,
      // basket (spread hook)
      ...basket,
      // favourites (spread hook — isFavourite, toggleFavourite, favourites, setFavourites)
      ...favourites,
      // recently viewed
      ...recentlyViewed,
      // sound
      handleClick, handleHover,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
