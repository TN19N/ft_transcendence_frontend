import React, { useState, useEffect } from 'react';

const Loader: React.FC = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="loader">
      <div className="loader-ball"></div>
    </div>
  );
};

export default Loader;
