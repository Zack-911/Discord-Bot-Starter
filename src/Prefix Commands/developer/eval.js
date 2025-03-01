module.exports = {
  name: "eval",
  type: "messageCreate",
  code: `
    $onlyForUsers[;$botOwnerID]
    $onlyIf[$message!=;
        $start
        $title[Invalid Usage]
        $description[Give me the code bro... don't be shy]
        $footer[smh]
    ]
    Ping: \`$pingMS\` | Uptime: <t:$round[$math[$math[$getTimestamp-$uptime]/1000];0]:R>
    $eval[$message]
  `,
};
