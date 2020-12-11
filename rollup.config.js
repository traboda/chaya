import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import image from '@rollup/plugin-image';
import url from '@rollup/plugin-url';
import filesize from 'rollup-plugin-filesize';
import postcss from 'rollup-plugin-postcss';

import pkg from './package.json';

const INPUT_FILE_PATH = 'src/index.js';

const OUTPUT_NAME = 'TRABODA_DESIGN_SYSTEM';

const GLOBALS = {
    react: 'React',
    'react-dom': 'ReactDOM',
    'prop-types': 'PropTypes',
    'shortid': 'shortid',
    'classnames': 'classnames'
};

const PLUGINS = [
    resolve({
        // required to detect .jsx files
        extensions: ['.jsx', '.js']
    }),
    // required to process css files
    postcss({
        extract: true,
        plugins: []
    }),
    babel({
        babelHelpers: 'runtime',
        exclude: 'node_modules/**',
    }),
    image(), // required to process image
    url(),
    commonjs(),
    // terser(),
    // shows file size in the cli after build
    filesize(),
];

const EXTERNAL = [
    'react',
    'react-dom',
    'prop-types',
    'classnames',
    'shortid'
];

const OUTPUT_DATA = [
    { file: pkg.browser, format: 'umd'  },
    { file: pkg.main, format: 'cjs'     },
    { file: pkg.module, format: 'es'    },
];

const config = OUTPUT_DATA.map(({ file, format }) => ({
    input: INPUT_FILE_PATH,
    output: { file, format, name: OUTPUT_NAME, globals: GLOBALS, },
    external: EXTERNAL,
    plugins: PLUGINS,
}));

export default config;