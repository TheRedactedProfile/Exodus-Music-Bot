const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "clearqueue",
    description: "Borrar la cola actual de los usuarios.",
    category: "Music",
    permissions: {
        bot: [],
        channel: [],
        user: [],
    },
    settings: {
        inVc: false,
        sameVc: true,
        player: true,
        current: false,
        owner: false,
        premium: false,
    },
    run: async (client, interaction, player) => {
        await interaction.deferReply({ ephemeral: true });

        if (!player.queue.length) {
            const embed = new EmbedBuilder().setColor(client.color).setDescription(`\`❌\` | Queue is: \`Empty\``);

            return interaction.editReply({ embeds: [embed] });
        } else {
            const { length } = player.queue;

            await player.queue.clear();

            const embed = new EmbedBuilder().setColor(client.color).setDescription(`\`☑️\` | \`${length}\` Queue has been: \`Cleared\``);

            return interaction.editReply({ embeds: [embed] });
        }
    },
};
