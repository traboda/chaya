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
  primary: 'dsr-bg-primary',
  secondary: 'dsr-bg-secondary',
  success: 'dsr-bg-green-600 dark:dsr-bg-green-700',
  danger: 'dsr-bg-red-500 dark:dsr-bg-red-700',
  warning: 'dsr-bg-yellow-500 dark:dsr-bg-yellow-600',
  contrast: 'dsr-bg-contrast',
  shade: 'dsr-bg-neutral-500 dark:dsr-bg-neutral-800',
  white: 'dsr-bg-white',
  black: 'dsr-bg-black',
};

export const SOLID_TEXT_COLOR_MAP: ColorClassMap = {
  primary: 'dsr-text-neutral-100',
  secondary: 'dsr-text-neutral-100',
  success: 'dsr-text-neutral-100',
  danger: 'dsr-text-neutral-100',
  warning: 'dsr-text-neutral-900  dark:dsr-text-neutral-100',
  contrast: 'dsr-text-neutral-100 dark:dsr-text-neutral-900',
  shade: 'dsr-text-neutral-100',
  white: 'dsr-text-neutral-900',
  black: 'dsr-text-neutral-200',
};

export const MINIMAL_BG_COLOR_MAP: ColorClassMap = {
  primary: 'dsr-bg-primary-minimal',
  secondary: 'dsr-bg-secondary-minimal',
  success: 'dsr-bg-green-200 dark:dsr-bg-green-800',
  danger: 'dsr-bg-red-200 dark:dsr-bg-red-800',
  warning: 'dsr-bg-yellow-100 dark:dsr-bg-yellow-600',
  contrast: 'dsr-bg-neutral-600 dark:dsr-bg-neutral-300',
  shade: 'dsr-bg-neutral-200 dark:dsr-bg-neutral-800',
  white: 'dsr-bg-neutral-100 dark:dsr-bg-neutral-300',
  black: 'dsr-bg-neutral-900 dark:dsr-bg-neutral-700',
};

export const TEXT_COLOR_MAP: ColorClassMap = {
  primary: 'dsr-text-primary dark:dsr-text-primary-bright',
  secondary: 'dsr-text-secondary dark:dsr-text-secondary-bright',
  success: 'dsr-text-green-600 dark:dsr-text-green-300',
  danger: 'dsr-text-red-600 dark:dsr-text-red-300',
  warning: 'dsr-text-yellow-600 dark:dsr-text-yellow-300',
  contrast: 'dsr-text-neutral-100 dark:dsr-text-neutral-900',
  shade: 'dsr-text-neutral-600 dark:dsr-text-neutral-300',
  white: 'dsr-text-neutral-800 dark:dsr-text-black',
  black: 'dsr-text-neutral-100 dark:dsr-text-white',
};

export const TRANSPARENT_BG_TEXT_COLOR_MAP: ColorClassMap = {
  ...TEXT_COLOR_MAP,
  contrast: 'dsr-text-neutral-900 dark:dsr-text-neutral-100',
  black: 'dsr-text-black dark:dsr-text-neutral-900',
  white: 'dsr-text-white dark:dsr-text-neutral-100',
};

export const BORDER_COLOR_MAP: ColorClassMap = {
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

export const colorMapper = <Type extends { [key: string]: string }>(maps: ColorClassMap[], object: Type) => {
  return maps.map((map) => {
    return Object.keys(map).map((color) => {
      return {
        color: color as ChayaColorType,
        className: map[color as ChayaColorType],
        ...object,
      };
    });
  }).flat();
};

export const colorVariantMapper = <Type extends string>(maps: ColorClassMap[], variant: Type) => {
  return colorMapper(maps, { variant });
};
