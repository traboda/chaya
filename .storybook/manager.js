import { addons } from '@storybook/manager-api';
import './manager.css';

addons.setConfig({
    isFullscreen: false,
    showNav: true,
    showPanel: true,
    panelPosition: 'right',
    enableShortcuts: true,
    showToolbar: true,
    initialActive: 'sidebar',
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