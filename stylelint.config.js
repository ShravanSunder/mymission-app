module.exports = {
   extends: ['stylelint-config-recommended'],
   rules: {
      'at-rule-no-unknown': [
         true,
         {
            ignoreAtRules: ['tailwind', 'apply', 'variants', 'responsive', 'screen', 'layer', 'extends'],
         },
      ],
      'property-no-unknown': [
         true,
         {
            ignoreProperties: ['label'],
         },
      ],
      'selector-type-no-unknown': null,
      'declaration-block-trailing-semicolon': null,
      'no-descending-specificity': null,
   },
   ignoreFiles: ['**/*.ts', '**/*.tsx', '**/*.test.*', '**/*.stories.*', '**/*.js'],
};
