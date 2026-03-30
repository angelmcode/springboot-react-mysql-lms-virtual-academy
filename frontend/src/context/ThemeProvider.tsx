import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext<any>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // Check the Hard Drive for their preference. If nothing is there, default to 'dark'
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  // The Engine: Every time 'theme' changes, update the HTML tag!
  useEffect(() => {
    const root = document.documentElement; // This grabs the <html> tag

    if (theme === 'dark') {
      root.classList.add('dark');    // Turns dark mode ON
    } else {
      root.classList.remove('dark'); // Turns dark mode OFF
    }

    localStorage.setItem('theme', theme); // Save it so it survives a refresh
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev: string) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);