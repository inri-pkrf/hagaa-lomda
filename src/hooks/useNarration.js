import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { narrationMap } from '../Data/NarrationData';

export function useNarration() {
  const location = useLocation();
  const pathname = location.pathname.replace(/\/$/, '') || '/';

  const parseOverride = (value) => {
    if (!value) return null;
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return { srcs: parsed, autoplay: true };
      }
      if (parsed && typeof parsed === 'object') {
        return parsed;
      }
    } catch {
      return null;
    }
    return null;
  };

  const [override, setOverride] = useState(() =>
    parseOverride(sessionStorage.getItem('narrationOverride')),
  );

  useEffect(() => {
    const saved = sessionStorage.getItem('narrationOverride');
    setOverride(parseOverride(saved));
  }, [pathname]);

  useEffect(() => {
    const handleNarrationOverride = (e) => {
      const detail = e.detail;
      if (detail === null) {
        setOverride(null);
        return;
      }
      if (Array.isArray(detail)) {
        setOverride({ srcs: detail, autoplay: true });
        return;
      }
      if (typeof detail === 'string') {
        setOverride({ srcs: [detail], autoplay: true });
        return;
      }
      if (detail && typeof detail === 'object') {
        setOverride(detail);
        return;
      }
      setOverride(null);
    };
    window.addEventListener('setNarration', handleNarrationOverride);
    return () => window.removeEventListener('setNarration', handleNarrationOverride);
  }, []);

  // נקה את ה-override כשעוברים לדף שיש לו סאונד משלו
  useEffect(() => {
    if (narrationMap[pathname]) {
      sessionStorage.removeItem('narrationOverride');
      setOverride(null);
    }
  }, [pathname]);

  const srcs = override?.srcs || narrationMap[pathname] || null;
  const autoplay = override?.autoplay ?? true;
  const skipFullscreenCheck = override?.skipFullscreenCheck ?? false;

  return { srcs, autoplay, skipFullscreenCheck };
}
