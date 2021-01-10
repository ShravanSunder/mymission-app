module.exports = {
   globDirectory: 'src/',
   globPatterns: ['**/*.{tsx,css,html,js,ts}'],
   globIgnores: ['**/node_modules/**/*', '**/*.test.*', '**/*.stories.*'],
   swDest: 'sw.generated.js',
   maximumFileSizeToCacheInBytes: 100000, //100kb
   swSrc: 'src/sw.js',
};
