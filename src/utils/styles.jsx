
export const getBorderRadiusStyle = (round) => {
  switch (round) {
    case 1: return '0.15rem';
    case 2: return '0.25rem';
    case 3: return '0.5rem';
    case 4: return '1rem';
    case 5: return '2rem';
    default: return 0;
  }
};

export const getColorByVariant = (variant, theme = null) => {
    switch (variant) {
      case 'primary': return theme?.primary ? theme.primary : '#4A148C';
      case 'secondary': return theme?.secondary ? theme.secondary : '#AA00FF';
      case 'dark': return '#212121';
      case 'light': return '#FAFAFA';
      case 'success': return '#00C853';
      case 'warning': return '#FFD600';
      case 'danger': return '#D50000';
    }
};

export const getTextColorByVariant = (variant, theme = null) => {
  switch (variant) {
    case 'primary': return theme?.primaryTextColor ? theme.primaryTextColor : 'white';
    case 'secondary': return theme?.secondaryTextColor ? theme.secondaryTextColor : 'white';
    case 'dark': return 'white';
    case 'light': return 'black';
    case 'success': return 'black';
    case 'warning': return 'black';
    case 'danger': return 'white';
  }
}