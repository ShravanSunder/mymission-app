const isDev = process.env.NODE_ENV === 'development';

module.exports = {
   globDirectory: 'src/',
   globPatterns: ['**/*.{tsx,css,html,js,ts}'],
   globIgnores: ['**/node_modules/**/*', '**/*.test.*', '**/*.stories.*'],
   swDest: 'dist/sw.generated.js',
   maximumFileSizeToCacheInBytes: isDev ? 50 * 1000 * 1000 : 500 * 1000,
   swSrc: 'dist/sw.generated.js',
};
