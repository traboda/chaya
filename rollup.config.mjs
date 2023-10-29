import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import preserveDirectives from "rollup-plugin-preserve-directives";

import dts from 'rollup-plugin-dts';
import postcss from 'rollup-plugin-postcss';
import nodePolyfills from 'rollup-plugin-polyfill-node';

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        dir: 'dist',
        preserveModules: true,
        exports: 'named',
        entryFileNames: '[name].js',
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        exclude: ['**/stories/**'],
      }),
      postcss({
        modules: true,
        minimize: true,
      }),
      terser(),
      nodePolyfills(),
      preserveDirectives({
        supressPreserveModulesWarning: true,
      }),
    ],
    external: ["react", "react-dom", "nanoid"]
  },
  {
    input: 'dist/types/index.d.ts',
    output: [{ dir: 'dist', format: 'esm' }],
    plugins: [dts()],
  },
];