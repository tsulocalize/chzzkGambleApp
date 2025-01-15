import React, { useState, useEffect } from 'react';
import './TipComponent.css';

export default function TipComponent ({tips}) {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tips.length);
    }, 10000); // Change every 10 seconds

    return () => clearInterval(timer);
  }, [tips.length]);

  return (
    <div className="tip-container">
      <div className="tip" key={currentTipIndex}>
        {tips[currentTipIndex]}
      </div>
    </div>
  );
};
