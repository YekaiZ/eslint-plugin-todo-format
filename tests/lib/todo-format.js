const rules = require('../../index.js');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester();

const errorConditions = [
  {
    code: '// todo 1234 desc 1',
    expectedFormat: '// TODO: [FP-1234] desc 1',
  },
  {
    code: '// todo desc 2',
    expectedFormat: '// TODO: [FP-XXXX] desc 2',
  },
  {
    code: '// TODO [FP-1234] desc 3',
    expectedFormat: '// TODO: [FP-1234] desc 3',
  },
  {
    code: '// TODO [FP-1234]: desc 4',
    expectedFormat: '// TODO: [FP-1234] desc 4',
  },
  {
    code: '// TODO FP-1234 desc 5',
    expectedFormat: '// TODO: [FP-1234] desc 5',
  },
  {
    code: '// TODO FP-1234: desc 6',
    expectedFormat: '// TODO: [FP-1234] desc 6',
  },
  {
    code: '/* todo 1234 desc 7*/',
    expectedFormat: '/* TODO: [FP-1234] desc 7 */',
  },
  {
    code: '/* todo desc 8*/',
    expectedFormat: '/* TODO: [FP-XXXX] desc 8 */',
  },
  {
    code: '/* TODO [FP-1234] desc 9*/',
    expectedFormat: '/* TODO: [FP-1234] desc 9 */',
  },
  {
    code: '/* TODO [FP-1234]: desc 10*/',
    expectedFormat: '/* TODO: [FP-1234] desc 10 */',
  },
  {
    code: '/* TODO FP-1234 desc 11*/',
    expectedFormat: '/* TODO: [FP-1234] desc 11 */',
  },
  {
    code: '/* TODO FP-1234: desc 12*/',
    expectedFormat: '/* TODO: [FP-1234] desc 12 */',
  },
];

ruleTester.run('todo-format/fpds', rules.rules.fpds, {
  valid: [
    {
      code: '// TODO: [FP-1234] This is a test',
    },
    {
      code: '/* TODO: [FP-5678] This is another test */',
    },
  ],
  invalid: errorConditions.map((error) => {
    return {
      code: error.code,
      errors: [{ message: 'RESPECT THE FORMAT // TODO: [FP-XXXX] Description' }],
      output: error.expectedFormat,
    };
  }),
});
