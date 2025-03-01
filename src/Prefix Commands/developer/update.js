module.exports = {
  name: "update",
  type: "messageCreate",
  code: `
      $onlyForUsers[;$botOwnerID]

      $let[count;$commandCount]
      $updateCommands
      $updateApplicationCommands
      $let[add;$sub[$commandCount;$get[count]]]

      $color[ff47ff]
      $description[Successfully update all commands.]

      $addActionRow
      $addButton[1;Added: $get[add];Success;✔️]
      $addButton[2;Total: $commandCount;Secondary;📃]
    `,
};
