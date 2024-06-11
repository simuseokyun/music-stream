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
        xs: '4px', // 매우 작은 여백
        sm: '8px', // 작은 여백
        md: '16px', // 중간 여백
        lg: '24px', // 큰 여백
        xl: '32px', // 매우 큰 여백
    },
    breakpoints: {
        mobile: '425px',
        tablet: '768px',
    },
};
