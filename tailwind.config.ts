import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
            primary: "#fc6b70",
            "primary-content": "#660206",
            "primary-dark": "#fb3940",
            "primary-light": "#fd9da0",

            secondary: "#b8fc6b",
            "secondary-content": "#376602",
            "secondary-dark": "#a0fb39",
            "secondary-light": "#d0fd9d",

            background: "#f0f0f0",
            foreground: "#fbfbfb",
            border: "#dfdfdf",

            copy: "#262626",
            "copy-light": "#666666",
            "copy-lighter": "#8c8c8c",

            success: "#6bfc6b",
            warning: "#fcfc6b",
            error: "#fc6b6b",

            "success-content": "#026602",
            "warning-content": "#666602",
            "error-content": "#660202"
        },
    },
  },
  plugins: [],
}
export default config
