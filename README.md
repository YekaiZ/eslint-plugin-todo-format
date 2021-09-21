An extension for ESlint plugin to enforce a predefined format of TODOs

Comments such as

```
//todo refactor this next time
/* todo task-1234 fix this */`
```

will be formatted as

```
// TODO: [Task-0000] refactor this next time
/* TODO: [Task-1234] fix this */
```

<br />

## Installation

If ESlint is not yet installed you can do so with:

```
npm i eslint eslint-plugin-todo-format -D
```

or

```

yarn add eslint eslint-plugin-todo-format -D

```

Alternatively standalone install with:

```

npm i eslint-plugin-todo-format -D

```

or

```

yarn add eslint-plugin-todo-format -D

```

## Usage

Next create a `.eslintrc.json` in your root directory, configure the plugin with

```

{
    "plugins": ["todo-format"]
    "rules": {
        "todo-format/enforce": [
            "warn",
            {
                "taskPrefix": "Hello"
            }
        ],
    }
}

```

## Side note

This plugin is mainly created to enforce todo format for my team hence the implementation is not the most flexible, feel free to submit a pr if you wish to make changes!
