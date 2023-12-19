

export type Colors = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'contrast' | 'shade' | 'white' | 'black';

export const badgeColorBorderConfig: {
  [color in Colors]: string;
} = {
  primary: 'dsr-border-primary',
  secondary: 'dsr-border-secondary',
  success: 'dsr-border-green-700 dark:dsr-border-green-500',
  danger: 'dsr-border-red-600 dark:dsr-border-red-500',
  warning: 'dsr-border-yellow-600 dark:dsr-border-yellow-400',
  contrast: 'dsr-border-contrast',
  shade: 'dsr-border-neutral-600 dark:dsr-border-neutral-400',
  white: 'dsr-border-neutral-100',
  black: 'dsr-border-black',
};

export const badgeColorVariantConfig: {
  variant: 'solid' | 'outline' | 'minimal';
  color: Colors;
  className: string | string[];
}[] = [
  // solid
  { variant: 'solid', color: 'primary', className: 'dsr-bg-primary dsr-text-neutral-100' },
  { variant: 'solid', color: 'secondary', className: 'dsr-bg-secondary dsr-text-neutral-100' },
  { variant: 'solid', color: 'success', className: 'dsr-bg-green-600 dark:dsr-bg-green-700 dsr-text-neutral-100' },
  { variant: 'solid', color: 'danger', className: 'dsr-bg-red-500 dark:dsr-bg-red-700 dsr-text-neutral-100' },
  { variant: 'solid', color: 'warning', className: 'dsr-bg-yellow-500 dsr-text-neutral-900 dark:dsr-bg-yellow-600 dark:dsr-text-neutral-100' },
  { variant: 'solid', color: 'contrast', className: 'dsr-bg-contrast dsr-text-neutral-100 dark:dsr-text-neutral-900' },
  {
    variant: 'solid', color: 'shade',
    className: [
      'dsr-bg-neutral-500 dsr-text-neutral-100 dsr-border-neutral-500',
      'dark:dsr-bg-neutral-800 dark:dsr-border-neutral-500',
    ],
  },
  { variant: 'solid', color: 'white', className: 'dsr-bg-white dsr-text-neutral-900' },
  { variant: 'solid', color: 'black', className: 'dsr-bg-black dsr-text-neutral-200' },
  // outline
  { variant: 'outline', color: 'primary', className: 'dsr-text-primary' },
  { variant: 'outline', color: 'secondary', className: 'dsr-text-secondary' },
  { variant: 'outline', color: 'success', className: 'dsr-text-green-600 dark:dsr-text-green-300' },
  { variant: 'outline', color: 'danger', className: 'dsr-text-red-600 dark:dsr-text-red-300' },
  { variant: 'outline', color: 'warning', className: 'dsr-text-yellow-700 dark:dsr-text-yellow-500' },
  { variant: 'outline', color: 'contrast', className: 'dsr-text-contrast' },
  { variant: 'outline', color: 'shade', className: 'dsr-text-neutral-500 dark:dsr-text-neutral-400' },
  { variant: 'outline', color: 'white', className: 'dsr-text-white' },
  { variant: 'outline', color: 'black', className: 'dsr-text-black' },
  // minimal
  { variant: 'minimal', color: 'primary', className: 'dsr-text-primary dsr-bg-primary/50' },
  { variant: 'minimal', color: 'secondary', className: 'dsr-text-secondary dsr-bg-secondary/50' },
  { variant: 'minimal', color: 'success', className: 'dsr-text-green-600 dark:dsr-text-green-300 dsr-bg-green-200 dark:dsr-bg-green-800' },
  { variant: 'minimal', color: 'danger', className: 'dsr-text-red-600 dark:dsr-text-red-300 dsr-bg-red-200 dark:dsr-bg-red-800' },
  { variant: 'minimal', color: 'warning', className: 'dsr-text-yellow-600 dark:dsr-text-yellow-300 dsr-bg-yellow-100 dark:dsr-bg-yellow-600' },
  { variant: 'minimal', color: 'white', className: 'dsr-bg-white dsr-text-neutral-700 dark:dsr-bg-neutral-300 dark:dsr-text-black' },
  { variant: 'minimal', color: 'black', className: 'dsr-bg-black dsr-text-neutral-200 dark:dsr-bg-neutral-800 dark:dsr-text-white' },
  { variant: 'minimal', color: 'contrast', className: 'dsr-bg-neutral-600 dark:dsr-bg-neutral-300 dsr-text-neutral-100 dark:dsr-text-neutral-900' },
  {
    variant: 'minimal', color: 'shade',
    className: 'dsr-text-neutral-600 dark:dsr-text-neutral-300 dsr-bg-neutral-200 dark:dsr-bg-neutral-800',
  },
];
