import React from "react";
import ThemeContextDecorator from "../src/stories/components/ThemeContextDecorator";

export const decorators = [
    (Story: any) => (
        <ThemeContextDecorator>
            <Story />
        </ThemeContextDecorator>
    ),
];