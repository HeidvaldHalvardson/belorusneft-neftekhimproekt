declare module '*.scss' {
    const styles: { [className: string]: string };
    export default styles;
}

declare module '*.svg' {
    import type * as React from 'react';
    const ReactComponent: React.FunctionComponent<
        React.SVGProps<SVGSVGElement> & { title?: string }
    >;
    export default ReactComponent;
}

declare const __IS_DEV__: boolean;
