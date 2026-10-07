import type { Preview } from '@storybook/react-webpack5'
import '../src/app/globals.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'puntoflor',
      values: [
        { name: 'puntoflor', value: '#FAFAF8' },
        { name: 'sidebar', value: '#1B4332' },
        { name: 'white', value: '#FFFFFF' },
      ],
    },
  },
};

export default preview;
