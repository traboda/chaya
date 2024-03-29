export type ChayaColorType = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'contrast' | 'shade' | 'white' | 'black';
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
  success: 'bg-green-600 dark:bg-green-700',
  danger: 'bg-red-500 dark:bg-red-700',
  warning: 'bg-yellow-500 dark:bg-yellow-600',
  contrast: 'bg-contrast',
  shade: 'bg-neutral-500 dark:bg-neutral-800',
  white: 'bg-white',
  black: 'bg-black',
};

export const SOLID_TEXT_COLOR_MAP: ColorClassMap = {
  primary: 'text-neutral-100',
  secondary: 'text-neutral-100',
  success: 'text-neutral-100',
  danger: 'text-neutral-100',
  warning: 'text-neutral-900  dark:text-neutral-100',
  contrast: 'text-neutral-100 dark:text-neutral-900',
  shade: 'text-neutral-100',
  white: 'text-neutral-900',
  black: 'text-neutral-200',
};

export const MINIMAL_BG_COLOR_MAP: ColorClassMap = {
  primary: 'bg-primary-minimal',
  secondary: 'bg-secondary-minimal',
  success: 'bg-green-200 dark:bg-green-800',
  danger: 'bg-red-200 dark:bg-red-800',
  warning: 'bg-yellow-100 dark:bg-yellow-600',
  contrast: 'bg-neutral-600 dark:bg-neutral-300',
  shade: 'bg-neutral-200 dark:bg-neutral-800',
  white: 'bg-neutral-100 dark:bg-neutral-300',
  black: 'bg-neutral-900 dark:bg-neutral-700',
};

export const TEXT_COLOR_MAP: ColorClassMap = {
  primary: 'text-primary dark:text-primary-bright',
  secondary: 'text-secondary dark:text-secondary-bright',
  success: 'text-green-600 dark:text-green-300',
  danger: 'text-red-600 dark:text-red-300',
  warning: 'text-yellow-600 dark:text-yellow-300',
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
  success: 'border-green-700 dark:border-green-500',
  danger: 'border-red-600 dark:border-red-500',
  warning: 'border-yellow-600 dark:border-yellow-400',
  contrast: 'border-contrast',
  shade: 'border-neutral-600 dark:border-neutral-400',
  white: 'border-neutral-100',
  black: 'border-black',
};

export const colorMapper = <Type extends { [key: string]: string | string[] }>(maps: ColorClassMap[], object: Type) => {
  return maps.map((map) => {
    return Object.keys(map).map((color) => {
      return {
        color: color as ChayaColorType,
        className: map[color as ChayaColorType],
        ...object as { [key: string]: string | string[] },
      };
    });
  }).flat();
};

export const colorVariantMapper = <Type extends string | string[]>(maps: ColorClassMap[], variant: Type) => {
  return colorMapper(maps, { variant });
};
