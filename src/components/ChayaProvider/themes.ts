export const DEFAULT_LIGHT_THEME = {
  primary: '#0f51c3',
  primaryTextColor: '#fff',
  secondary: '#77019e',
  secondaryTextColor: '#fff',
  color: '#333',
  background: '#FAFAFA',
};

export const DEFAULT_DARK_THEME = {
  primary: '#4B8BF5',
  primaryTextColor: '#fff',
  secondary: '#c571e0',
  secondaryTextColor: '#fff',
  color: '#F0F0F0',
  background: '#1A1A1A',
};

type THEMES = 'DEFAULT' | 'SOLARIZED';

export const getTheme = (theme: THEMES, isDarkMode: boolean) => {
  if (isDarkMode) {
    switch (theme) {
      default:
        return DEFAULT_DARK_THEME;
    }
  }
  switch (theme) {
    default:
      return DEFAULT_LIGHT_THEME;
  }
};
