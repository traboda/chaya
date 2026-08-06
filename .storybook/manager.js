import { addons } from 'storybook/manager-api';
import './manager.css';

addons.setConfig({
    isFullscreen: false,
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
