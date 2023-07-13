import React from "react";
import ThemeContextDecorator from "./utils/ThemeContextDecorator";

export const decorators = [
    (Story: any) => (
        <ThemeContextDecorator>
            <style>
                {`
                    html {
                        background: var(--background)!important;
                        color: var(--color)!important;
                    }
                    .sb-show-main.sb-main-padded {
                        padding: 0!important;
                    }
                `}
            </style>
            <Story />
        </ThemeContextDecorator>
    ),
];