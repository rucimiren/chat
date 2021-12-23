const sizes = (start, end) => {
  return new Array(end - start)
    .fill(1)
    .map((_, index) => index + start)
    .reduce((res, n) => {
      res[n] = `${n}px`
      return res
    }, {})
}

module.exports = {
  important: true,
  purge: ['./public/index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  separator: ':',
  prefix: '',
  theme: {
    // 受根字体等影响，覆盖掉部分变量，不使用原tailwindcss的类名
    colors: {
      // 颜色
      transparent: 'transparent',
      current: 'currentColor',

      base: '#283039',
      white: '#fff',

      primary: '#2C68FF',
      error: '#F52F3E',
      warning: '#FF9C00',
      success: '#0ED57D',

      black: {
        f4: 'rgba(0, 0, 0, 0.04)',
        f6: 'rgba(0, 0, 0, 0.06)',
        f10: 'rgba(0, 0, 0, 0.10)',
        f15: 'rgba(0, 0, 0, 0.15)',
        f25: 'rgba(0, 0, 0, 0.25)',
        f45: 'rgba(0, 0, 0, 0.45)',
        f65: 'rgba(0, 0, 0, 0.65)',
        f85: 'rgba(0, 0, 0, 0.85)',
        f100: 'rgba(0, 0, 0, 1)',
      },
      gray: {
        2: '#f5f5f5',
        3: '#f0f0f0',
        4: '#e5e5e5',
        5: '#d9d9d9',
        6: '#bfbfbf',
        7: '#8c8c8c',
        8: '#595959',
        9: '#262626',
      },
      blue: {
        1: '#F2F8FF',
        2: '#C9E0FF',
        3: '#A3C6FF',
        4: '#7AA9FF',
        5: '#548AFF',
        6: '#2C68FF',
        7: '#1C4AD4',
        8: '#0D2EA6',
        9: '#051A7A',
        10: '#000B4D',
      },
      red: {
        1: '#FFF2F5',
        2: '#FFCCD7',
        3: '#FFA6B6',
        4: '#FF7D90',
        5: '#FF576A',
        6: '#F52F3E',
        7: '#CC1D31',
        8: '#A10E24',
        9: '#78061B',
        10: '#4D0011',
      },
      yellow: {
        1: '#FFFCF2',
        2: '#FFF0C2',
        3: '#FFE091',
        4: '#FFCD61',
        5: '#FFB730',
        6: '#FF9C00',
        7: '#D47B00',
        8: '#A65B00',
        9: '#7A3F00',
        10: '#4D2500',
      },
      green: {
        1: '#F2FFFB',
        2: '#BEF7E5',
        3: '#90F0CE',
        4: '#60E6B2',
        5: '#37DE99',
        6: '#0ED57D',
        7: '#09B562',
        8: '#049149',
        9: '#027034',
        10: '#004D20',
      },
    },
    spacing: {
      px: '1px',
      ...sizes(0, 200),
    },
    lineHeight: {
      // 行高 tw-leading-12
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
      ...sizes(12, 120),
    },
    borderRadius: {
      // 圆角 tw-rounded-2
      none: '0',
      ...sizes(2, 50),
      full: '9999px',
    },
    fontSize: {
      // 字体 tw-text-12
      ...sizes(12, 120),
    },
    maxWidth: (theme, { breakpoints }) => ({
      none: 'none',
      full: '100%',
      ...breakpoints(theme('screens')),
    }),
    extend: {
      inset: (theme, { negative }) => ({
        auto: 'auto',
        ...theme('spacing'),
        ...negative(theme('spacing')),
        '1/2': '50%',
        '1/3': '33.333333%',
        '2/3': '66.666667%',
        '1/4': '25%',
        '2/4': '50%',
        '3/4': '75%',
        full: '100%',
        '-1/2': '-50%',
        '-1/3': '-33.333333%',
        '-2/3': '-66.666667%',
        '-1/4': '-25%',
        '-2/4': '-50%',
        '-3/4': '-75%',
        '-full': '-100%',
      }),
      borderRadius: ['hover', 'focus'],
    },
  },
  corePlugins: {},
  plugins: [],
}
