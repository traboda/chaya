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

const recurCVA = (variants: any, nest: any, cleaned: any, computed: any) => {
  if (typeof variants === 'string' || Array.isArray(variants)) return;

  Object.keys(variants).forEach((variant) => {
    if (typeof variants[variant] === 'string' || Array.isArray(variants[variant])) return;

    nest.push(variant);

    Object.keys(variants[variant]).forEach((prop) => {
      if (prop === '__default') return;

      nest.push(prop);
      
      if (typeof variants[variant][prop] === 'string' || Array.isArray(variants[variant][prop])) {
        const temp: any = {};
        for (let i = 0; i < nest.length; i += 2) temp[nest[i]] = nest[i + 1];
        computed.push({
          ...temp,
          className: variants[variant][prop],
        });
        nest.pop();
      }

      recurCVA(variants[variant][prop], nest, cleaned, computed);
    });

    nest.pop();
  });
};

const rcva = (input: any): any => {
  const { variants } = input;
  const cleaned: any = {}, computed: any = [];
  
  Object.keys(variants).forEach((variant) => {
    Object.keys(variants[variant]).forEach((prop) => {
      if (typeof variants[variant][prop] === 'string' || Array.isArray(variants[variant][prop])) {
        cleaned[variant] = {
          ...cleaned[variant],
          [prop]: variants[variant][prop],
        };
      } else {
        if (variants[variant][prop].__default) {
          cleaned[variant] = {
            ...cleaned[variant],
            [prop]: variants[variant][prop].__default,
          };
        }

        recurCVA(variants[variant][prop], [variant, prop], cleaned, computed);
      }
    });
  });

  input.variants = cleaned;
  input.compoundVariants = [ 
    ...(input.compoundVariants ?? []),
    ...computed,
  ];

  return cva(input);
};

export { rcva, cva, cx, compose };
