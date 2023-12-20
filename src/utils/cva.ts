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

// Main function to handle variants and compound variants
const rcva = (input: any): any => {
  const { variants } = input;
  const cleaned: Variants = {}, computed: Variants[] = [];

  if (variants) {
    Object.entries(variants).forEach(([variant, value]) => {
      if (value) {
        Object.entries(value).forEach(([prop, propValue]) => {
          if (typeof propValue !== 'object' || Array.isArray(propValue)) {
            cleaned[variant] = {
              ...(cleaned[variant] as Variants),
              [prop]: propValue,
            };
          } else {
            if ((propValue as Variants).__default) {
              cleaned[variant] = {
                ...(cleaned[variant] as Variants),
                [prop]: (propValue as Variants).__default,
              };
            }
  
            recurCVA(propValue as Variants, [variant, prop], cleaned, computed);
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
