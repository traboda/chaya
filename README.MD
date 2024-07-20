<div align="center">
    <img src="/public/chaya-icon.svg" height="100" alt="ChayaUI" />
    <h1 style="margin-top: 12px">Chaya UI</h1>
    <p style="font-size: 110%">Chaya UI is a modern, data-first component library for React.</p>
    <div align="center">
      <img alt="GNU GPL v3 License" src="https://img.shields.io/github/license/chaya-ui/chaya-ui?style=for-the-badge"/>
      <a href="https://www.npmjs.com/package/chaya-ui">
        <img alt="Latest Version on NPM" src="https://img.shields.io/npm/v/chaya-ui.svg?style=for-the-badge"/>
      </a>
      <a href="https://www.npmjs.com/package/chaya-ui">
        <img alt="NPM Downloads" src="https://img.shields.io/npm/dm/chaya-ui.svg?style=for-the-badge"/>
      </a>
      <a href="https://github.com/chaya-ui/chaya-ui/stargazers">
        <img alt="Github Stars" src="https://img.shields.io/github/stars/chaya-ui/chaya-ui?style=for-the-badge" />
      </a>
    </div>
</div>

Chaya UI provides a wide range of modern, data-first components that help you build your SaaS applications faster,
and with less code. Our components are designed to be minimal, modern, and fully accessible, and are built on top
of best-in-class tools/libraries like **TypeScript**,  **Tailwind CSS**,  **Radix Primitives**, etc.

- 40+ UI components, 4+ hooks, and even more to come
- Built with TypeScript, fully typed
- Styled with Tailwind CSS (v3)
- Supports Dark Mode & Custom Theming

## Looking to Explore?

Checkout examples from our Storybook: [chaya.traboda.com](https://chaya.traboda.com/)

## Installing Chaya

1. Install the package by running - 
```bash
npm install chaya-ui
```
or with yarn, as 
```bash
yarn add chaya-ui
```


## Setting Up & Usage

To start using the components, please follow the below steps:

1. Wrap your Application in a `ChayaProvider` provided by `chaya-ui`

    ```tsx
    import { ReactNode } from "react";
    import { ChayaProvider } from 'chaya-ui';

    const AppView = ({ children }: { children: ReactNode }) => (
      <ChayaProvider>
        {children}
      </ChayaProvider>
    );
    ```

2. Update your `tailwind.config.js` to process styles for components from `chaya-ui`

    ```js
    const theme = require('chaya-ui/tailwind-theme');
    
    /** @type {import('tailwindcss').Config} */
    module.exports = {
     content: [
         'node_modules/chaya-ui/**/*.js',
         // ...
     ],
     // ...
     theme: {
         extend: theme,
     },
     // ...
    };
    ```

3. Import the components from `chaya-ui` and use them in your application.

    ```tsx
    import { Button } from 'chaya-ui';

    const App = () => (
      <Button 
        onClick={() => console.log('I was clicked')} 
        variant="outline" 
        color="danger"
      >
          Click Me
      </Button>
    );
    ```

## Development Guide

We use `npm` as the package manager

```bash
npm run dev
```

This will start the storybook and loads the stories from `./stories` at [localhost:6006](http://localhost:6006).

The package can be build using the command:

```bash
npm run build
```

Type checks and linting commands are also available in the package

```bash
npm run lint
npm run type-check
```

## Credits

- Icons used in the package are from [Remix Icons](https://remixicons.com).

## Contributions

Contributions are welcome. Please open an issue or a PR.

## Licensing

This project is licensed under the [GNU General Public License V3](LICENSE).
