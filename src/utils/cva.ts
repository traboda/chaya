import { defineConfig } from 'cva';
import { extendTailwindMerge } from 'tailwind-merge';

const merge = extendTailwindMerge({
  prefix: '',
});

export const { cva, cx, compose } = defineConfig({
  hooks: {
    onComplete: (className) => merge(className),
  },
});

