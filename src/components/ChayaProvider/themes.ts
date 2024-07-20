export const DEFAULT_LIGHT_THEME = {
  primary: '#0f51c3',
  primaryTextColor: '#fff',
  secondary: '#77019e',
  secondaryTextColor: '#fff',
  color: '#333',
  background: '#FAFAFA',
};

export const DEFAULT_DARK_THEME = {
  primary: '#1d66e5',
  primaryTextColor: '#fff',
  secondary: '#b64fd7',
  secondaryTextColor: '#fff',
  color: '#FAFAFA',
  background: '#212121',
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

