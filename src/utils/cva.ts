import { defineConfig, CVA } from 'cva';
import { extendTailwindMerge } from 'tailwind-merge';

const merge = extendTailwindMerge({
  prefix: 'dsr-',
});

const { cva, cx, compose } = defineConfig({
  hooks: {
    onComplete: (className) => merge(className),
  },
});

// Define the Variants type
type Variants = {
  [key: string]: string | string[] | Variants;
};

// Recursive function to handle compound variants
const recurCVA = (
  variants: Variants,
  nest: string[] = [],
  cleaned: Variants = {},
  computed: Variants[] = [],
): void => {
  if (typeof variants !== 'object' || Array.isArray(variants)) return;

  Object.entries(variants).forEach(([variant, value]) => {
    if (typeof value !== 'object' || Array.isArray(value)) return;

    nest.push(variant);

    Object.entries(value).forEach(([prop, propValue]) => {
      if (prop === '__default') return;

      nest.push(prop);

      if (typeof propValue !== 'object' || Array.isArray(propValue)) {
        computed.push({
          ...nest.reduce((acc, _, i, arr) => {
            if (i % 2 === 0) acc[arr[i]] = arr[i + 1];
            return acc;
          }, {} as Variants),
          className: propValue,
        });
        nest.pop();
      }

      recurCVA(propValue as Variants, nest, cleaned, computed);
    });

    nest.pop();
  });
};

type StringToBoolean<T> = T extends 'true' | 'false' ? boolean : T;

type ClassValue = ClassArray | ClassDictionary | string | number | null | boolean | undefined;
type ClassDictionary = Record<string, any>;
type ClassArray = ClassValue[];
type CVAConfigBase = {
  base?: ClassValue;
};
type CVAVariantShape = Record<string, Record<string, ClassValue>>;
type CVAVariantSchema<V extends CVAVariantShape> = {
  [Variant in keyof V]?: StringToBoolean<keyof V[Variant]> | undefined;
};
type CVAClassProp = {
  class?: ClassValue;
  className?: never;
} | {
  class?: never;
  className?: ClassValue;
};

// Main function to handle variants and compound variants
const rcva: CVA = <V>(input: V extends CVAVariantShape ? CVAConfigBase & {
  variants?: V;
  compoundVariants?: (V extends CVAVariantShape ? (CVAVariantSchema<V> | {
    [Variant in keyof V]?: StringToBoolean<keyof V[Variant]> | StringToBoolean<keyof V[Variant]>[] | undefined;
  }) & CVAClassProp : CVAClassProp)[];
  defaultVariants?: CVAVariantSchema<V>;
} : CVAConfigBase & {
  variants?: never;
  compoundVariants?: never;
  defaultVariants?: never;
}) => {
  const { variants } = input;
  const cleaned: typeof input.variants = {} as typeof input.variants, 
    computed: typeof input.compoundVariants = [];

  if (variants) {
    Object.entries(variants).forEach(([variant, value]) => {
      if (value) {
        Object.entries(value).forEach(([prop, propValue]) => {
          if (cleaned && (typeof propValue !== 'object' || Array.isArray(propValue))) {
            (cleaned[variant] as { [x: string]: any[] | ClassValue; }) = {
              ...cleaned[variant],
              [prop]: propValue,
            };
          } else {
            if (cleaned && (propValue as Variants).__default) {
              (cleaned[variant] as { [x: string]: any[] | ClassValue; }) = {
                ...(cleaned[variant] as Variants),
                [prop]: (propValue as Variants).__default,
              };
            }

            recurCVA(propValue as Variants, [variant, prop], cleaned as Variants, computed as Variants[]);
          }
        });
      }
    });
  }

  input.variants = cleaned;
  input.compoundVariants = [
    ...(input.compoundVariants ?? []),
    ...computed,
  ];

  return cva(input);
};


export { rcva, cva, cx, compose };
