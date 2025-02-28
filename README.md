Hey there, ready to jump into the wild world of Discord bots without getting bogged down by JavaScript bullshit? ForgeScript is your damn golden ticket—a friendly language that mashes up the best of Bot Designer for Discord (BDFD) and aoi.js, making bot creation surprisingly straightforward.

---

## What Is ForgeScript?

ForgeScript is essentially your go-to toolkit for messing with Discord’s API in a way that won’t make you want to pull your hair out. It’s a user-friendly scripting language that lets you build kickass bots without needing to be a hardcore coder. Think of it as a shortcut that keeps your bot-making process clean and efficient.

---

## Setting Up Your Environment

Before you start creating your masterpiece, let’s set up your space:

1. **Install Node.js**  
   Make sure you’ve got Node.js (version 16.11.0 or higher) installed. Grab it from the [official Node.js website](https://nodejs.org/).

2. **Install Dependencies**  
   Fire up your terminal or command prompt and run these commands to install ForgeScript, its database extension, and dotenv (for environment variables):

   ```bash
   npm i https://github.com/tryforge/ForgeScript/tree/dev
   npm i github:tryforge/forgedb
   npm i dotenv
   ```

   This sets up the latest developer versions of ForgeScript and ForgeDB—everything you need to get started.

---

## Building Your Basic Bot

Let’s get that bot off the ground with some clear-cut code:

1. **Create a Bot on Discord**  
   Head over to [Discord’s Developer Portal](https://discord.com/developers) and click on **New Application**. Once you’ve created your app, navigate to the **Bot** tab and switch on all Gateway Intents so your bot can do its thing without restrictions.

   ![Create Application](https://github.com/user-attachments/assets/90d85310-7356-41e8-9e6f-bd2281fda8fd)  
   ![Bot Tab](https://github.com/user-attachments/assets/2c2d8e40-92aa-44b2-b4c1-c450f4ef4331)  
   ![Gateway Intents](https://github.com/user-attachments/assets/7d6b9fb8-c84d-4dd6-9d79-728864cd3a8c)

2. **Set Up Your .env File**  
   Create a file named `.env` and add your bot token like this:

   ```
   BOT_TOKEN=Your Bot Token
   ```

   Replace **Your Bot Token** with the actual token from your Discord Developer Portal.

3. **Initialize Your Bot with Code**  
   Create a file called `index.js` and drop in this code:

   ```javascript
   // ========== ENVIRONMENT CONFIGURATION ==========
   // Load environment variables before anything else
   const dotenv = require("dotenv"); // Loads our .env file
   dotenv.config(); // Must run this before other code

   // ========== IMPORTS ==========
   // Bring in the essentials for our bot’s operations
   const { ForgeClient, LogPriority } = require("@tryforge/forgescript");
   const { ForgeDB } = require("@tryforge/forge.db");

   // ========== PATHS & CLIENT SETUP ==========
   // Define paths for your commands
   const slashCommandsPath = "Slash Commands";
   const prefixCommandsPath = "Prefix Commands";

   // ========== CLIENT CONFIGURATION ==========
   // Initialize the bot client with extensions, intents, and events
   const client = new ForgeClient({
     extensions: [
       new ForgeDB(), // Adds database capabilities
     ],
     intents: [
       "Guilds", "GuildMembers", "GuildModeration", "GuildEmojisAndStickers", "GuildIntegrations", "GuildWebhooks", "GuildInvites", "GuildVoiceStates", "GuildPresences", "GuildMessages", "GuildMessageReactions", "GuildMessageTyping", "DirectMessages", "DirectMessageReactions", "DirectMessageTyping", "MessageContent", "GuildScheduledEvents", "AutoModerationConfiguration", "AutoModerationExecution",
     ],
     events: [
       "channelCreate", "channelDelete", "channelUpdate", "debug", "emojiCreate", "emojiDelete", "emojiUpdate", "error", "guildAuditLogEntryCreate", "guildCreate", "guildDelete", "guildMemberAdd", "guildMemberRemove", "guildMemberUpdate", "guildUpdate", "interactionCreate", "inviteCreate", "inviteDelete", "messageCreate", "messageDelete", "messageReactionAdd", "messageReactionRemove", "messageUpdate", "ready", "roleCreate", "roleDelete", "roleUpdate", "shardDisconnect", "shardError", "shardReady", "shardReconnecting", "shardResume", "userUpdate", "voiceStateUpdate"
     ],
     prefixes: ["!"],
     trackers: { invites: true }, // Enables invite tracking
   });

   // ========== LOAD COMMANDS ==========
   client.applicationCommands.load(slashCommandsPath);
   client.commands.load(prefixCommandsPath);

   // ========== LOGIN ==========
   // Log in with your bot token from the environment file
   client.login(process.env.BOT_TOKEN);
   ```

4. **Organize Your Folders**  
   Create two folders in your project directory: one named **Prefix Commands** and another called **Slash Commands**.

5. **Create Your First Command**  
   For now, we’ll focus on prefix commands (I’m too damn lazy to cover both right now). In the **Prefix Commands** folder, create a file called `Ping.js` and add this code:

   ```javascript
   module.exports = {
     name: "ping",
     type: "messageCreate",
     code: `
         Ping: \`$pingMS\` | Uptime: <t:$round[$math[$math[$getTimestamp-$uptime]/1000];0]:R>
       `,
   };
   ```

   Now, when you type `!ping` in a server where your bot is present, it’ll spit back the ping and uptime without any fuss.
   Congrats! You can brag to people your a developer.

---

## How to Host Your Bot (Keep It Running 24/7)

Hosting your bot is like choosing the right spot to hang out—it needs to be dependable and fit your needs. Here’s a breakdown of your options:

- **Local Hosting**  
  *Advantages:*  
  - Cheap as hell—just pay for your electricity and internet.  
  - Complete control over your setup, which is great if you like tinkering.  
  - Easy to modify when you’re testing new ideas.

  *Disadvantages:*  
  - Your bot’s uptime is tied to your computer—if it crashes, so does your bot.  
  - Can be a real pain to set up if you’re not tech-savvy.  
  - Requires your PC to run 24/7, which might not be practical.  
  - Potential high ping if your location isn’t optimal.

- **Cloud Hosting**  
  *Advantages:*  
  - Always online, no matter what happens with your local machine.  
  - Scalable and reliable, like having a solid online presence.  
  - Managed services handle updates, backups, and security.

  *Disadvantages:*  
  - Can get pricey if you’re not careful with your usage.  
  - Initial setup might feel overwhelming if you’re new to cloud platforms.

- **VPS Hosting**  
  *Advantages:*  
  - A balanced choice—more reliable than local hosting without the steep costs of some cloud services.  
  - Offers dedicated resources and better control.

  *Disadvantages:*  
  - You’re responsible for maintaining the server, which can be a hassle when shit hits the fan.  
  - Requires a decent amount of technical knowledge to manage effectively.

- **Pre-Configured Servers**  
  *Advantages:*  
  - Ready-to-go with Node.js pre-installed, saving you setup time.  
  - Many free options available, great for experimenting without commitment.

  *Disadvantages:*  
  - Limited customization options—you might hit some walls if you need advanced tweaks.  
  - May suffer from performance issues or security concerns compared to custom setups.

---

## Best Coding Practices for Your Bot

To keep your bot running like a well-oiled machine:

- **Keep Your Code Organized:**  
  Break up your commands and events into separate files and folders. A tidy codebase saves you from future headaches.

- **Handle Errors Gracefully:**  
  Use try-catch blocks and proper error handling to keep your bot from crashing unexpectedly.

- **Stay Updated:**  
  Keep an eye on ForgeScript updates. New features and bug fixes mean your bot will keep getting better.

---

Starting your journey with ForgeScript opens up a world of possibilities for creating awesome Discord bots. Whether you're just dipping your toes in or already a seasoned developer, ForgeScript offers a straightforward and efficient way to bring your bot ideas to life. Happy coding, and don’t be afraid to experiment and break a few rules along the way!
