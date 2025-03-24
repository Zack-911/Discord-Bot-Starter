# 🛍️ Getting Started With Slash Commands

Slash commands offer a smoother, more intuitive experience compared to traditional prefix commands. Instead of memorizing command formats and guessing arguments, users are guided through structured inputs. Clean, discoverable, and natively supported by Discord’s UI — what's not to love?

ForgeScript supports both slash and prefix commands — but they each require different structures and loading methods.

---

## 🔹 1. Registering Slash Commands

Prefix commands are registered like this:

```js
client.commands.load("./commands/prefix");
```

For slash commands, the method is slightly different:

```js
client.applicationCommands.load("./commands/slash");
```

> ⚠️ **Important:** Never mix prefix and slash commands in the same directory. Keep things organized:

```
commands/
├── prefix/
└── slash/
```

This avoids any unexpected behavior and makes your codebase easier to manage.

---

## 🔹 2. Functions Exclusive to Prefix Commands

Some ForgeScript functions are designed specifically for prefix commands and won’t work with slash commands.

### ✴️ `$message`

Prefix commands can parse raw messages using `$message[index]`. For example, if a user says:

```
Berk likes femboys
```

Then:

```js
$message[0] → "Berk"
```

This gives you flexible access to message segments — great for more dynamic or informal user input.

### 🔂 `$option` in Slash Commands

Slash commands are structured. Instead of parsing raw input, users fill out fields when executing commands. You then access that data with:

```js
$option[0] // or $option[name]
```

So, for a `/greet` command with a `user` option, you'd use:

```js
Hello $option[user]!
```

---

# 🏗️ How Slash Commands Should Be Structured

Unlike prefix commands, slash commands require you to define their metadata using a `data` object. This includes the command's name, description, and any options.

### 🔧 Basic Example

```js
module.exports = {
  code: `
    Ping: \`$pingMS\` | Uptime: <t:$round[$math[$math[$getTimestamp-$uptime]/1000];0]:R>
  `,
  data: {
    name: "ping",
    description: "Get the bot's ping and uptime",
  },
};
```

### 🛩 With Options

```js
module.exports = {
  code: `
    Hello, $option[user]!
  `,
  data: {
    name: "greet",
    description: "Send a greeting to someone",
    options: [
      {
        name: "user",
        description: "The name to greet",
        type: 3, // STRING
        required: true
      }
    ]
  }
};
```

> 💡 You can define `data` before or after `code`. Just make sure both are present.

---

## ⚙️ Slash Command Option Types

Here’s a complete list of input types you can use in the `options` array:

| Type                 | Value | Description                                      |
|----------------------|-------|--------------------------------------------------|
| `SUB_COMMAND`        | `1`   | A sub-command (e.g., `/ban user`)               |
| `SUB_COMMAND_GROUP`  | `2`   | A group of sub-commands                         |
| `STRING`             | `3`   | Text input (max 100 characters)                 |
| `INTEGER`            | `4`   | Whole number input                              |
| `BOOLEAN`            | `5`   | True/false toggle                               |
| `USER`               | `6`   | Select a Discord user                           |
| `CHANNEL`            | `7`   | Select a text or voice channel                  |
| `ROLE`               | `8`   | Select a server role                            |
| `MENTIONABLE`        | `9`   | Select a user or role                           |
| `NUMBER`             | `10`  | Any number (including decimals)                 |
| `ATTACHMENT`         | `11`  | Upload a file or image                          |

---

## 🌟 Tips
- Always use lowercase for option `name` values.
- Use `required: true` wisely to guide input.
- You can add choices and autocomplete in advanced setups.
- For complex commands like `/music play` or `/admin ban`, use `SUB_COMMAND` and `SUB_COMMAND_GROUP`.

---

## 🌈 3. Using Choices in Slash Command Options

If you want users to select from preset values (like a dropdown), you can define choices in your options:

```js
options: [
  {
    name: "fruit",
    description: "Pick a fruit",
    type: 3, // STRING
    required: true,
    choices: [
      { name: "Apple", value: "apple" },
      { name: "Banana", value: "banana" },
      { name: "Cherry", value: "cherry" }
    ]
  }
]
```

This creates a dropdown with predefined options — super useful for categories or settings.

---

## 🗂️ 5. Organizing Slash Commands in Big Projects

As your bot grows, keep commands clean by grouping them:

```
commands/
├── slash/
│   ├── admin/
│   ├── fun/
│   └── utility/
```

You can also use shared helpers or templates to avoid repeating logic — especially for things like permissions or option formats.

---

## 🌈 6. Deferring Replies and Updates

Sometimes your bot needs a moment before replying (e.g., when accessing an API or loading data). In ForgeScript, you can use these:

### ⏳ `$defer`
Defers the interaction response, giving you more time to reply:
```js
$defer
```

### 🔄 `$deferUpdate`
Use this when the interaction is a **component** (like a button) and you want to acknowledge it without responding immediately:
```js
$deferUpdate
// later...
$editMessage[...]
```

These prevent your commands from timing out.

---

## 💬 7. Sending Ephemeral Replies

If you want to respond privately (only the user can see it), use the second argument in `$ephemeral`:

```js
$ephemeral
$sendMessage[$channelID;Berk Likes Femboys]
```

This is great for confirmations, errors, or anything that doesn’t need to be public.

# 🧩 Advanced Slash Command Configuration

ForgeScript supports advanced command customization using `config.json` files inside **subfolders** of your slash command directory.

You can:

- Add localizations
- Set integration types
- Define contexts
- Control how sub-commands behave/install

### 📁 Folder Structure Example

```
slashes (main folder)
|
|__ command
    |
    |__ subcommand-group
        |
        |__ config.json (config for "subcommand-group")
        |__ subcommand.js
    |
    |__ config.json (config for "command")
    |__ subcommand.js
|
|__ command.js
```

> ⚠️ **You cannot place a ********************`config.json`******************** file in the root ********************`slashes/`******************** folder!**

### 📝 File Example (`config.json`)

```json
{
  "name_localizations": { "de": "entwickler" },
  "description": "Commands only accessible to the developer.",
  "description_localizations": {
    "de": "Befehle, auf die nur der Entwickler zugreifen kann."
  },
  "integration_types": [0, 1],
  "contexts": [0, 1, 2]
}
```

📎 [Read the full spec](https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-structure) for more configurable options.

> ⚠️ If you already use `config.json` in your slash folders, ensure it's a valid JSON object. Otherwise, ForgeScript may throw errors.
