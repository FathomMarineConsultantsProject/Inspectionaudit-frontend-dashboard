import { useEffect, useState } from "react";

export default function StatCard({ title, value = 0, color, icon }) {
  const [displayValue, setDisplayValue] = useState(0);

  // Simple counter animation
  useEffect(() => {
    let start = 0;
    const duration = 500;
    const increment = value / (duration / 16);

    const counter = setInterval(() => {
      start += increment;
      if (start >= value) {
        clearInterval(counter);
        setDisplayValue(value);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(counter);
  }, [value]);

  return (
    <div className="stat-card" style={{ background: color }}>
      <div className="stat-content">
        <div className="stat-icon">
          {icon}
        </div>

        <div className="stat-text">
          <h4>{title}</h4>
          <h2>{displayValue}</h2>
        </div>
      </div>
    </div>
  );
}