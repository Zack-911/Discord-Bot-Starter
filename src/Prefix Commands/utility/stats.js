module.exports = {
  name: "stats",
  type: "messageCreate",
  code: `
    $title[📊 System Information: $bn]
    $description[
      **💾 RAM Usage**
      🔹 $round[$ram] / $round[$ramTotal]

      **💻 CPU Details**
      🔹 **Name:** $cpuModel
      🔹 **Architecture:** $cpuArch
      🔹 **Cores:** $cpuCores

      **🖥️ Operating System**
      🔹 **OS:** $os
      🔹 **Uptime:** $osUptime

      **🛠️ Technical Info**
      🔹 **Node.js Version:** $nodeVersion
      🔹 **Ping:** $round[$ping]ms
      🔹 **Bot Uptime:** $parseMs[$uptime]
      🔹 **Bot Version:** 1.0.0
      🔹 **Shard Count:** $shardCount
    ]
  `,
};