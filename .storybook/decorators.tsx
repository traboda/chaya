import React from "react";
import ThemeContextDecorator from "./utils/ThemeContextDecorator";

export const decorators = [
    (Story: any) => (
        <ThemeContextDecorator>
            <Story />
        </ThemeContextDecorator>
    ),
];