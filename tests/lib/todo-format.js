const rules = require("../../index.js");
const RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester();

const errorConditions = [
  {
    code: "// todo 1234 desc 1",
    expectedFormat: "// TODO: [FP-1234] desc 1",
  },
  {
    code: "// todo desc 2",
    expectedFormat: "// TODO: [FP-0000] desc 2",
  },
  {
    code: "// TODO [FP-1234] desc 3",
    expectedFormat: "// TODO: [FP-1234] desc 3",
  },
  {
    code: "// TODO [FP-1234]: desc 4",
    expectedFormat: "// TODO: [FP-1234] desc 4",
  },
  {
    code: "// TODO FP-1234 desc 5",
    expectedFormat: "// TODO: [FP-1234] desc 5",
  },
  {
    code: "// TODO FP-1234: desc 6",
    expectedFormat: "// TODO: [FP-1234] desc 6",
  },
  {
    code: "/* todo 1234 desc 7*/",
    expectedFormat: "/* TODO: [FP-1234] desc 7 */",
  },
  {
    code: "/* todo desc 8*/",
    expectedFormat: "/* TODO: [FP-0000] desc 8 */",
  },
  {
    code: "/* TODO [FP-1234] desc 9*/",
    expectedFormat: "/* TODO: [FP-1234] desc 9 */",
  },
  {
    code: "/* TODO [FP-1234]: desc 10*/",
    expectedFormat: "/* TODO: [FP-1234] desc 10 */",
  },
  {
    code: "/* TODO FP-1234 desc 11*/",
    expectedFormat: "/* TODO: [FP-1234] desc 11 */",
  },
  {
    code: "/* TODO FP-1234: desc 12*/",
    expectedFormat: "/* TODO: [FP-1234] desc 12 */",
  },
];

ruleTester.run("todo-format/enforce", rules, {
  valid: [
    {
      code: "// TODO: [FP-1234] This is a test",
    },
    {
      code: "/* TODO: [FP-5678] This is another test */",
    },
  ],
  invalid: errorConditions.map((error) => ({
    code: error.code,
    errors: [{ message: "RESPECT THE FORMAT // TODO: [FP-0000] Description" }],
    output: error.expectedFormat,
  })),
});
