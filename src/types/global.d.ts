declare module '*.scss' {
    const styles: { [className: string]: string };
    export default styles;
}

declare const __IS_DEV__: boolean;
