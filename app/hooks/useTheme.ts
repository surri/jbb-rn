import '@react-navigation/native'

declare module '@react-navigation/native' {
    export type ExtendedTheme = {
        dark: boolean;
        colors: {
            primary: string,
            background: string,
            card: string,
            text: string,
            border: string,
            inactive: string,
            placeHolder: string,
            notification: string,
            active: string,
        };
    };
    export function useTheme(): ExtendedTheme;
}