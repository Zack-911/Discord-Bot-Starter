// ========== ENVIRONMENT CONFIGURATION ==========
// Load environment variables before anything else
const dotenv = require("dotenv"); // Loads our .env file
dotenv.config(); // Must run this before other code

// ========== IMPORTS ==========
// Bring in the essentials for our bot’s operations
const { ForgeClient } = require("@tryforge/forgescript");
const { ForgeDB } = require("@tryforge/forge.db");

// ========== PATHS & CLIENT SETUP ==========
// Define paths for your commands
const slashCommandsPath = "src/Slash Commands";
const prefixCommandsPath = "src/Prefix Commands";

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