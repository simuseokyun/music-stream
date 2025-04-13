export interface DefaultTheme {
    colors: {
        primary: string;
        secondary: string;
        background: string;
        text: string;
        subText: string;
    };
    fontSizes: {
        small: string;
        medium: string;
        large: string;
        xlarge: string;
    };
    spacing: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
    };
    breakpoints: {
        mobile: string;
        tablet: string;
    };
}

export const theme: DefaultTheme = {
    colors: {
        primary: '#65d46e;', // 메인 컬러
        secondary: '#1c1c1c', // 보조 컬러
        background: '#ffffff',
        text: '#ffffff',
        subText: '#A0A0A0',
    },

    fontSizes: {
        small: '12px',
        medium: '14px',
        large: '24px',
        xlarge: '32px',
    },
    spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
    },
    breakpoints: {
        mobile: '425px',
        tablet: '768px',
    },
};
