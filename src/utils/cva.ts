import { defineConfig } from 'cva';
import { extendTailwindMerge } from 'tailwind-merge';

const merge = extendTailwindMerge({
  prefix: 'dsr-',
});

const { cva, cx, compose } = defineConfig({
  hooks: {
    onComplete: (className) => merge(className),
  },
});

type StringToBoolean<T> = T extends 'true' | 'false' ? boolean : T;

type ClassBasicValue = string | number | null | boolean | undefined;
type ClassValue = ClassArray | ClassDictionary | ClassBasicValue;
type ClassDictionary = Record<string, any>;
type ClassArray = ClassValue[];
type CVAConfigBase = {
  base?: ClassValue;
};
type CVAVariantIndiv = Record<string, ClassValue>;
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

type RCVAVariantShape<T extends CVAVariantShape> = Partial<{
  [K in keyof T]?: Record<keyof T[K], ClassBasicValue> | RCVAVariantShape<T>;
}>;
type CVACompoundVariantType<V> = { [Variant in keyof V]?: StringToBoolean<keyof V[Variant]> | StringToBoolean<keyof V[Variant]>[] | undefined };
type CVACompoundVariants<V> = (CVAClassProp & CVACompoundVariantType<V>)[];

// Recursive function to handle compound variants
const recurCVA = <T extends CVAVariantShape>(
  variants: RCVAVariantShape<T>,
  nest: string[] = [],
  cleaned: CVAVariantIndiv = {},
  computed: CVACompoundVariants<T> = [],
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
          ...nest.reduce((acc: CVAVariantIndiv, _, i, arr) => {
            if (i % 2 === 0) acc[arr[i]] = arr[i + 1];
            return acc;
          }, {}) as CVACompoundVariantType<T>,
          className: propValue as ClassValue,
        });
        nest.pop();
      } else recurCVA(propValue as RCVAVariantShape<T>, nest, cleaned, computed);
    });

    nest.pop();
  });
};


// Main function to handle variants and compound variants
const rcva = <V extends Record<string, Record<string, ClassBasicValue | RCVAVariantShape<V>>>>(input: CVAConfigBase & {
  variants?: V,
  compoundVariants?: CVACompoundVariants<V>,
  defaultVariants?: CVAVariantSchema<V>
}): (props?: CVAVariantSchema<V> & CVAClassProp) => string => {
  const { variants } = input;
  const cleaned: CVAVariantShape = {}, 
    computed: CVACompoundVariants<V> = [];

  if (variants) {
    Object.entries(variants).forEach(([variant, value]) => {
      if (value) {
        Object.entries(value).forEach(([prop, propValue]) => {
          if (typeof propValue !== 'object' || Array.isArray(propValue)) {
            cleaned[variant] = {
              ...cleaned[variant],
              [prop]: propValue,
            };
          } else {
            if (propValue?.__default) {
              cleaned[variant] = {
                ...cleaned[variant],
                [prop]: propValue.__default,
              };
            }

            recurCVA(propValue as RCVAVariantShape<V>, [variant, prop], cleaned, computed);
          }
        });
      }
    });
  }

  input.variants = cleaned as V;
  input.compoundVariants = [
    ...(input.compoundVariants ?? []),
    ...computed,
  ];

  return cva(input as Parameters<typeof cva>[0]);
};


export { rcva, cva, cx, compose };
