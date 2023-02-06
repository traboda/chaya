<div align="center">
    <img src="/src/assets/chaya-icon.svg" height="100" alt="ChayaUI" />
    <h1 style="margin-top: 12px">Chaya UI</h1>
    <p style="font-size: 110%">Chaya UI is a modern, functional design system & component library for React.</p>
    <div align="center">
      <img alt="GNU GPL v3 License" src="https://img.shields.io/github/license/traboda/chaya?style=for-the-badge"/>
      <a href="https://www.npmjs.com/package/chaya-ui">
        <img alt="Latest Version on NPM" src="https://img.shields.io/npm/v/chaya-ui.svg?style=for-the-badge"/>
      </a>
      <a href="https://www.npmjs.com/package/chaya-ui">
        <img alt="NPM Downloads" src="https://img.shields.io/npm/dm/chaya-ui.svg?style=for-the-badge"/>
      </a>
      <a href="https://github.com/traboda/chaya/stargazers">
        <img alt="Github Stars" src="https://img.shields.io/github/stars/traboda/chaya?style=for-the-badge" />
      </a>
    </div>
</div>

Chaya features a collection of reusable components, and other frontend utility functions for React, 
that are used to design a consistent, modern and accessible frontend for Traboda platforms.
Chaya makes it seamless to build a consistent and accessible frontend for your platforms made
with React.

- 32+ UI components, 4+ hooks, and even more to come
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

1. Wrap your Application in a `DSRContextProvider` provided by `chaya-ui`

    ```tsx
    import { ReactNode } from "react";

    // external libraries for example usecase
    import Link from 'next/link';
    import { Search, X } from 'react-feather';

    import { DSRContextProvider } from 'chaya-ui';
    import 'chaya-ui/dist/style.css'; // import this in your _app.tsx file

    const AppView = ({ children }: { children: ReactNode }) => (
      <DSRContextProvider
        linkWrapper={(link: string, component: ReactElement) => <Link href={link}>{component}</Link>}
        theme={{
          primary: '#019e4b',
          secondary: '#019e4b',
          background: '#fff',
          color: '#333'
        }}
        iconWrapper={(icon, props) => ({
          search: <Search {...props} />,
          times: <X {...props} />,
          // ...
        })[icon] ?? <>n/a</>}
      >
        {children}
      </DSRContextProvider>
    );
    ```

    - `linkWrapper` lets you wrap links with a custom component, for example, `next/link` or `react-router-dom/Link`
    so that the links are handled by the router of your choice.
    - `theme` lets you define the primary, secondary, background and color colors for the theme. These colors are used to
    generate the CSS variables for the theme.
    - `iconWrapper` lets you wrap icons with a custom component, for example, `react-feather` or `react-icons` so that the icons
    are rendered by the icon library of your choice.

2. Import the components from `chaya-ui` and use them in your application.

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
npm run storybook
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

## Contributions

Contributions are welcome. Please open an issue or a PR.

## Licensing

This project is licensed under the [GNU General Public License V3](LICENSE).

Made by Traboda with ❤️ in India 🇮🇳.