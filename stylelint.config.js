module.exports = {
   extends: ['stylelint-config-recommended'],
   rules: {
      'at-rule-no-unknown': [
         true,
         {
            ignoreAtRules: ['tailwind', 'apply', 'variants', 'responsive', 'screen'],
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
};
