export {};

declare module '@emotion/react' {
    export interface Theme {
        primary: string
        primaryTextColor: string
        secondary: string
        secondaryTextColor: string
        color: string
        background: string
        backgroundDark: string
    }
}