export type ChayaColorType =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'contrast'
  | 'shade'
  | 'white'
  | 'black';
type ColorClassMap = { [color in ChayaColorType]: string };

export const EMPTY_COLOR_MAP: ColorClassMap = {
  primary: '',
  secondary: '',
  success: '',
  danger: '',
  warning: '',
  contrast: '',
  shade: '',
  white: '',
  black: '',
};

export const SOLID_BG_COLOR_MAP: ColorClassMap = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  success: 'bg-green-600 dark:bg-green-600',
  danger: 'bg-red-600 dark:bg-red-700',
  warning: 'bg-yellow-500 dark:bg-yellow-500',
  contrast: 'bg-contrast',
  shade: 'bg-neutral-500 dark:bg-neutral-700',
  white: 'bg-white dark:bg-neutral-200',
  black: 'bg-black dark:bg-neutral-900',
};

export const SOLID_TEXT_COLOR_MAP: ColorClassMap = {
  primary: 'text-neutral-100',
  secondary: 'text-neutral-100',
  success: 'text-neutral-900 dark:text-neutral-100',
  danger: 'text-neutral-900 dark:text-neutral-100',
  warning: 'text-neutral-900',
  contrast: 'text-neutral-100 dark:text-neutral-900',
  shade: 'text-neutral-100',
  white: 'text-neutral-900',
  black: 'text-neutral-200',
};

export const MINIMAL_BG_COLOR_MAP: ColorClassMap = {
  primary: 'bg-primary-minimal',
  secondary: 'bg-secondary-minimal',
  success: 'bg-green-100 dark:bg-green-900/60',
  danger: 'bg-red-50 dark:bg-red-950/60',
  warning: 'bg-yellow-50 dark:bg-yellow-900/50',
  contrast: 'bg-neutral-600 dark:bg-neutral-300',
  shade: 'bg-neutral-100 dark:bg-neutral-800/80',
  white: 'bg-neutral-50 dark:bg-neutral-300',
  black: 'bg-neutral-900 dark:bg-neutral-700',
};

export const TEXT_COLOR_MAP: ColorClassMap = {
  primary: 'text-primary dark:text-primary-bright',
  secondary: 'text-secondary dark:text-secondary-bright',
  success: 'text-green-700 dark:text-green-400',
  danger: 'text-red-700 dark:text-red-400',
  warning: 'text-yellow-700 dark:text-yellow-300',
  contrast: 'text-neutral-100 dark:text-neutral-900',
  shade: 'text-neutral-600 dark:text-neutral-300',
  white: 'text-neutral-800 dark:text-black',
  black: 'text-neutral-100 dark:text-white',
};

export const TRANSPARENT_BG_TEXT_COLOR_MAP: ColorClassMap = {
  ...TEXT_COLOR_MAP,
  contrast: 'text-neutral-900 dark:text-neutral-100',
  black: 'text-black dark:text-neutral-900',
  white: 'text-white dark:text-neutral-100',
};

export const BORDER_COLOR_MAP: ColorClassMap = {
  primary: 'border-primary',
  secondary: 'border-secondary',
  success: 'border-green-600 dark:border-green-500',
  danger: 'border-red-600 dark:border-red-600',
  warning: 'border-yellow-500 dark:border-yellow-400',
  contrast: 'border-contrast',
  shade: 'border-neutral-400 dark:border-neutral-500',
  white: 'border-neutral-200 dark:border-neutral-600',
  black: 'border-black dark:border-neutral-700',
};

export const BORDER_COLOR_SOLID_MAP: ColorClassMap = {
  primary: 'border-primary/20 dark:border-primary/70',
  secondary: 'border-secondary/20 dark:border-secondary/70',
  success: 'border-green-600/20 dark:border-green-500/70',
  danger: 'border-red-600/20 dark:border-red-600/70',
  warning: 'border-yellow-500/20 dark:border-yellow-400/70',
  contrast: 'border-contrast/20 dark:border-contrast/70',
  shade: 'border-neutral-400/20 dark:border-neutral-500/70',
  white: 'border-neutral-200/20 dark:border-neutral-600/70',
  black: 'border-black/20 dark:border-neutral-700/70',
};

export const BORDER_COLOR_OUTLINE_MAP: ColorClassMap = {
  primary: 'border-primary/60 dark:border-primary/80',
  secondary: 'border-secondary/60 dark:border-secondary/80',
  success: 'border-green-600/60 dark:border-green-500/80',
  danger: 'border-red-500/60 dark:border-red-500/80',
  warning: 'border-yellow-500/60 dark:border-yellow-400/80',
  contrast: 'border-contrast/60 dark:border-contrast/80',
  shade: 'border-neutral-400/60 dark:border-neutral-500/80',
  white: 'border-neutral-200/60 dark:border-neutral-600/80',
  black: 'border-black/60 dark:border-neutral-700/80',
};

export const colorMapper = <Type extends { [key: string]: string | string[] }>(
  maps: ColorClassMap[],
  object: Type
) => {
  return maps
    .map((map) => {
      return Object.keys(map).map((color) => {
        return {
          color: color as ChayaColorType,
          className: map[color as ChayaColorType],
          ...(object as { [key: string]: string | string[] }),
        };
      });
    })
    .flat();
};

export const colorVariantMapper = <Type extends string | string[]>(
  maps: ColorClassMap[],
  variant: Type
) => {
  return colorMapper(maps, { variant });
};
