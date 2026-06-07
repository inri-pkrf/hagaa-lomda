import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { narrationMap } from '../Data/NarrationData';

export function useNarration() {
  const location = useLocation();
  const pathname = location.pathname.replace(/\/$/, '') || '/';

  const getInitialOverride = () => {
    const saved = sessionStorage.getItem('narrationOverride');
    return saved ? JSON.parse(saved) : null;
  };

  const [override, setOverride] = useState(getInitialOverride);

  useEffect(() => {
    // נקה את ה-override רק אם אין ערך ב-sessionStorage לדף הזה
    const saved = sessionStorage.getItem('narrationOverride');
    if (!saved) {
      setOverride(null);
    } else {
      setOverride(JSON.parse(saved));
    }
  }, [pathname]);

  useEffect(() => {
    const handleNarrationOverride = (e) => {
      setOverride(e.detail);
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

  return override || narrationMap[pathname] || null;
}