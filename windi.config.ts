import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  extract: {
    include: [
      'src/**/*.{vue,html,jsx,tsx}',
    ],
    exclude: ['node_modules', '.git'],
  },
  attributify: true,
  preflight: false,
  shortcuts: {
    // 'flex-0': 'flex-grow flex-shrink basis-0',
    // 'border-ink': 'border-light-900',
    // 'border-base': 'border-light-900',
    // 'bg-base': 'bg-light-100',
    // 'bg-selected': 'bg-gray-200',
    // 'bg-hover': 'bg-light-700',
    // 'color-base': 'text-gray-900',
    // 'color-fade': 'text-gray-900:50',
    // 'icon-color': 'text-gray-900 hover:(text-dark-700)',
    // 'icon-button': 'rounded op80 hover:op100',
    // 'a-primary': 'text-green-600 hover:text-green-500',
  },
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',
      },
    },
  },
})
