import { useEffect, useRef, useState } from 'react';

export default function StatCard({ label, value, icon, variant = 'indigo' }) {
  const [displayed, setDisplayed] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const target = Number(value) || 0;
    if (target === 0) {
      setDisplayed(0);
      return;
    }

    let start = 0;
    const duration = 600;
    const startTime = performance.now();

    function animate(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      const current = Math.round(eased * target);
      setDisplayed(current);
      if (progress < 1) {
        ref.current = requestAnimationFrame(animate);
      }
    }

    ref.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(ref.current);
  }, [value]);

  return (
    <div className={`stat-card stat-${variant}`}>
      <div className="stat-card-icon">{icon}</div>
      <p className="stat-label">{label}</p>
      <p className="stat-value">{displayed}</p>
    </div>
  );
}
