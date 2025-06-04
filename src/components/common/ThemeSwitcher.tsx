import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import './ThemeSwitcher.css';

const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      className="theme-switcher" 
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
          <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
          <path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0-5a1 1 0 0 0 1-1V1a1 1 0 0 0-2 0v.01A1 1 0 0 0 12 2zm0 19a1 1 0 0 0-1 1V22a1 1 0 1 0 2 0v-.01a1 1 0 0 0-1-.99zm9-10a1 1 0 0 0 1-1 1 1 0 0 0-1-1h-.01a1 1 0 0 0 0 2H21zm-19 0a1 1 0 0 0 1-1 1 1 0 0 0-1-1H2a1 1 0 0 0 0 2h.01zM4.929 4.929a1 1 0 0 0 1.414-1.414l-.707-.707a1 1 0 0 0-1.414 1.414l.707.707zm14.142 14.142a1 1 0 0 0 1.414-1.414l-.707-.707a1 1 0 0 0-1.414 1.414l.707.707zm-.707-14.142a1 1 0 0 0 1.414 1.414l.707-.707a1 1 0 1 0-1.414-1.414l-.707.707zM4.929 19.071a1 1 0 0 0 1.414 1.414l.707-.707a1 1 0 0 0-1.414-1.414l-.707.707z" />
        </svg>
      )}
    </button>
  );
};

export default ThemeSwitcher;
