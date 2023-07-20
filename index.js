module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description:
        "requires a TODO to be in the format of // TODO: [Task-0000] Description",
      category: "Best Practices",
    },
    fixable: "code",
    schema: [
      {
        taskPrefix: "string",
      },
    ],
  },
  create(context) {
    const options = context.options[0] || { taskPrefix: "FP" };

    return {
      Program() {
        const comments = context.getSourceCode().getAllComments();

        comments
          .filter((comment) =>
            comment.value.trim().toLowerCase().startsWith("todo")
          )
          .forEach((comment) => {
            const regex = new RegExp(
              `(\\sTODO\\:\\s){1}(\\[${options.taskPrefix}\\-(\\d{4}|[X]{4})\\]\\s){1}\\w+`,
              "i"
            );
            const passFormatCheck = regex.test(comment.value);
            if (!passFormatCheck) {
              const existingTaskCheck = comment.value.match(/\d{4}/);
              const existingTask = existingTaskCheck
                ? existingTaskCheck[0]
                : "0000";

              const existingDescriptionCheck = existingTaskCheck
                ? comment.value.match(/(?<=(\d{4}).*)\w.+/g)
                : comment.value.match(/(?<=todo.*)\w.+/gi);

              const existingDescription = existingDescriptionCheck
                ? existingDescriptionCheck[0]
                : "Description";

              context.report({
                node: null,
                loc: comment.loc,
                message: `RESPECT THE FORMAT // TODO: [${options.taskPrefix}-0000] Description`,

                fix(fixer) {
                  if (comment.type == "Line") {
                    return fixer.replaceTextRange(
                      comment.range,
                      `// TODO: [${options.taskPrefix}-${existingTask}] ${existingDescription}`
                    );
                  } else if (comment.type == "Block") {
                    return fixer.replaceTextRange(
                      comment.range,
                      `/* TODO: [${options.taskPrefix}-${existingTask}] ${existingDescription} */`
                    );
                  }
                },
              });
            }
          });
      },
    };
  },
};
