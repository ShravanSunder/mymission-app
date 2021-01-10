module.exports = {
   stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
   addons: [
      '@storybook/addon-links',
      '@storybook/addon-essentials',
      '@storybook/addon-docs',
      '@storybook/addon-backgrounds',
      '@storybook/addon-knobs',
      '@storybook/addon-links',
      '@storybook/addon-toolbars',
      '@storybook/addon-queryparams',
      '@storybook/addon-a11y',
      '@storybook/addon-jest',
      '@whitespace/storybook-addon-html',
      {
         name: '@storybook/addon-storysource',
         options: {
            rule: {
               // test: [/\.stories\.jsx?$/], This is default
               include: [path.resolve(__dirname, '../src')], // You can specify directories
            },
            loaderOptions: {
               prettierConfig: { printWidth: 80, singleQuote: false },
            },
         },
      },
   ],
};
