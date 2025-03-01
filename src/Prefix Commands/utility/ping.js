module.exports = {
  name: "ping",
  type: "messageCreate",
  code: `
      Ping: \`$pingMS\` | Uptime: <t:$round[$math[$math[$getTimestamp-$uptime]/1000];0]:R>
    `,
};
