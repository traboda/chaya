<div align="center">
    <img src="/public/chaya-icon.svg" height="100" alt="ChayaUI" />
    <h1 style="margin-top: 12px">Chaya UI</h1>
    <p style="font-size: 110%">Chaya UI is a modern, data-first component library for React.</p>
    <div align="center">
      <img alt="GNU GPL v3 License" src="https://img.shields.io/github/license/traboda/chaya?style=for-the-badge"/>
      <a href="https://www.npmjs.com/package/traboda-chaya-ui">
        <img alt="Latest Version on NPM" src="https://img.shields.io/npm/v/traboda-chaya-ui.svg?style=for-the-badge"/>
      </a>
      <a href="https://www.npmjs.com/package/traboda-chaya-ui">
        <img alt="NPM Downloads" src="https://img.shields.io/npm/dm/traboda-chaya-ui.svg?style=for-the-badge"/>
      </a>
      <a href="https://github.com/traboda/chaya/stargazers">
        <img alt="Github Stars" src="https://img.shields.io/github/stars/traboda/chaya?style=for-the-badge" />
      </a>
    </div>
</div>

Chaya UI provides a wide range of modern, data-first components that help you build your SaaS applications faster,
and with less code. Our components are designed to be minimal, modern, and fully accessible, and are built on top
of best-in-class tools/libraries like **TypeScript**, **Tailwind CSS**, **Radix Primitives**, etc.

- 40+ UI components, 4+ hooks, and even more to come
- Built with TypeScript, fully typed
- Styled with Tailwind CSS (v4)
- Supports Dark Mode & Custom Theming

## Looking to Explore?

Checkout examples from our Storybook: [chaya.traboda.com](https://chaya.traboda.com/)

## Installing Chaya

1. Install the package by running -

```bash
npm install traboda-chaya-ui
```

or with yarn, as

```bash
yarn add traboda-chaya-ui
```

## Setting Up & Usage

To start using the components, please follow the below steps:

1. Wrap your Application in a `ChayaProvider` provided by `traboda-chaya-ui`

   ```tsx
   import { ReactNode } from 'react';

   import { ChayaProvider } from 'traboda-chaya-ui';

   const AppView = ({ children }: { children: ReactNode }) => (
     <ChayaProvider>{children}</ChayaProvider>
   );
   ```

2. Update your CSS to include Tailwind and scan `traboda-chaya-ui` components

   ```css
   @import 'tailwindcss';
   @source '../../node_modules/traboda-chaya-ui';
   ```

   If you need the Chaya theme tokens in your Tailwind config, you can import them:

   ```js
   import theme from 'traboda-chaya-ui/tailwind-theme';
   ```

3. Import the components from `traboda-chaya-ui` and use them in your application.

   ```tsx
   import { Button } from 'traboda-chaya-ui';

   const App = () => (
     <Button onClick={() => console.log('I was clicked')} variant="outline" color="danger">
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
