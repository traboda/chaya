# Chaya UI

<p align="center">
  <img alt="MIT License" src="https://img.shields.io/github/license/traboda/chaya"/>
  <img alt="NPM Downloads" src="https://img.shields.io/npm/dm/chaya-ui.svg?style=flat"/>
  <img alt="Github Stars" src="https://badgen.net/github/stars/traboda/chaya" />
</p>

Chaya is a collection of reusable components, and other frontend utility functions for React, 
that are used to design a consistent, modern and accessible frontend for Traboda platforms.

- Fully Typed
- Supports Dark Mode & Custom Theming

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

```ts
import {ReactNode} from "react";

// external libraries for example usecase
import Link from 'next/link';
import { Search, X } from 'react-feather';

import DSRContextProvider from "./DSRContextProvider";

const AppView = ({ children }: { children: ReactNode  }) => (
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