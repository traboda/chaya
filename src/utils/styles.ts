import { Theme } from "@emotion/react";

export const getBorderRadiusStyle = (round: number) => {
    switch (round) {
        case 1: return '0.15rem';
        case 2: return '0.25rem';
        case 3: return '0.5rem';
        case 4: return '1rem';
        case 5: return '2rem';
        default: return 0;
    }
};

export const getColorByVariant = (variant: string, theme: (Theme | null) = null) => {
    switch (variant) {
        case 'primary': return theme?.primary ? theme.primary : '#1e259b';
        case 'secondary': return theme?.secondary ? theme.secondary : '#2d35c1';
        case 'dark': return 'hsl(0,0%,-25%)';
        case 'light': return '#FAFAFA';
        case 'success': return '#00C853';
        case 'warning': return '#FFD600';
        case 'danger': return '#D50000';
        default: return '';
    }
};

export const getTextColorByVariant = (variant: string, theme: (Theme | null) = null) => {
    switch (variant) {
        case 'primary': return theme?.primaryTextColor ? theme.primaryTextColor : 'white';
        case 'secondary': return theme?.secondaryTextColor ? theme.secondaryTextColor : 'white';
        case 'dark': return 'white';
        case 'light': return 'black';
        case 'success': return 'black';
        case 'warning': return 'black';
        case 'danger': return 'white';
        default: return '';
    }
};
