import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';
import { GLOBALS_UPDATED } from 'storybook/internal/core-events';


const lightTheme = create({
    base: 'light',
    brandTitle: 'Chaya UI',
});

const darkTheme = create({
    base: 'dark',
    brandTitle: 'Chaya UI',
});

addons.setConfig({
    isFullscreen: false,
    theme: lightTheme,
    layout: {
        showNav: true,
        showPanel: true,
        panelPosition: 'right',
        showToolbar: true,
        initialActive: 'sidebar',
    },
    ui: {
        enableShortcuts: true,
    },
    sidebar: {
        showRoots: true,
        collapsedRoots: ['other'],
        filters: {
            patterns: (item) => {
                return !item.tags.includes('unlisted');
            }
        }
    },
    toolbar: {
        title: { hidden: false },
        zoom: { hidden: false },
        eject: { hidden: false },
        copy: { hidden: false },
        fullscreen: { hidden: false },
    },
});

addons.register('chaya-theme-sync', () => {
    const channel = addons.getChannel();
    channel.on(GLOBALS_UPDATED, (event) => {
        const isDark = event?.globals?.theme === 'dark';
        addons.setConfig({
            theme: isDark ? darkTheme : lightTheme,
        });
    });
});
