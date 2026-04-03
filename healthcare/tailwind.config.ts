import type { Config } from "tailwindcss";

const { fontFamily } = require("tailwindcss/defaultTheme");

const config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                green: {
                    500: "#39FF14", // Neon Green
                    600: "#0D2A1F",
                },
                blue: {
                    500: "#00F0FF", // Cyan
                    600: "#152432",
                },
                red: {
                    500: "#FF3131", // Bright Red
                    600: "#3E1716",
                    700: "#FF0000",
                },
                yellow: {
                    500: "#FFF01F", // Electric Yellow
                },
                pink: {
                    500: "#FF00FF", // Magenta
                },
                light: {
                    200: "#FFFFFF",
                },
                dark: {
                    200: "#000000",
                    300: "#131619",
                    400: "#1A1D21",
                    500: "#363A3D",
                    600: "#76828D",
                    700: "#ABB8C4",
                },
                neo: {
                    bg: "#F4F4F0",
                    primary: "#FFD000",
                    secondary: "#FF3399",
                    accent: "#00C1FF",
                }
            },
            boxShadow: {
                'neo': '4px 4px 0px 0px rgba(0,0,0,1)',
                'neo-lg': '8px 8px 0px 0px rgba(0,0,0,1)',
            },
            borderWidth: {
                '3': '3px',
                '4': '4px',
                '8': '8px',
            },
            fontFamily: {
                sans: ["Plus Jakarta Sans", ...fontFamily.sans],
            },
            backgroundImage: {
                appointments: "url('/assets/images/appointments-bg.png')",
                pending: "url('/assets/images/pending-bg.png')",
                cancelled: "url('/assets/images/cancelled-bg.png')",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
                "caret-blink": {
                    "0%,70%,100%": { opacity: "1" },
                    "20%,50%": { opacity: "0" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "caret-blink": "caret-blink 1.25s ease-out infinite",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;