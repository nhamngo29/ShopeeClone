const plugin = require('tailwindcss/plugin')
/** @type {import('tailwindcss').Config}*/
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}' // Đảm bảo rằng Tailwind có thể quét tất cả các tệp nơi bạn sử dụng các lớp CSS
  ],
  corePlugins: {
    container: false
  },
  theme: {
    extend: {
      colors: {
        orange: '#ee4d2d',
        text_footer: 'rgba(0, 0, 0, 0.65)'
      },
      fontSize: {
        sm: '0.75rem'
      }
    }
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        '.container': {
          maxWidth: theme('columns.7xl'),
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: theme('spacing.4'),
          paddingRight: theme('spacing.4')
        }
      })
    }),
    require('@tailwindcss/line-clamp')
  ]
}
