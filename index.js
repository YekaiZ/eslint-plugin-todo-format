module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'requires a TODO to be in the format of // TODO: [FP-XXXX] Description',
      category: 'Best Practices',
    },
    fixable: 'code',
    schema: [],
  },
  rules: {
    fpds: {
      create: (context) => {
        return {
          Program() {
            const comments = context.getSourceCode().getAllComments();

            comments
              .filter((comment) => comment.value.trim().toLowerCase().startsWith('todo'))
              .forEach((comment) => {
                const passFormatCheck = /(\sTODO\:\s){1}(\[FP\-(\d{4}|[X]{4})\]\s){1}\w+/i.test(
                  comment.value
                );
                if (!passFormatCheck) {
                  const existingFP = comment.value.match(/\d{4}/);
                  const existingDescription = existingFP
                    ? comment.value.match(/(?<=(\d{4}).*)\w.+/g)
                    : comment.value.match(/(?<=todo.*)\w.+/gi);

                  context.report({
                    node: null,
                    loc: comment.loc,
                    message: 'RESPECT THE FORMAT // TODO: [FP-XXXX] Description',

                    fix(fixer) {
                      if (comment.type == 'Line') {
                        return fixer.replaceTextRange(
                          comment.range,
                          `// TODO: [FP-${existingFP ? existingFP[0] : 'XXXX'}] ${
                            existingDescription ? existingDescription[0] : 'Description'
                          }`
                        );
                      } else if (comment.type == 'Block') {
                        return fixer.replaceTextRange(
                          comment.range,
                          `/* TODO: [FP-${existingFP ? existingFP[0] : 'XXXX'}] ${
                            existingDescription ? existingDescription[0] : 'Description'
                          } */`
                        );
                      }
                    },
                  });
                }
              });
          },
        };
      },
    },
  },
};
