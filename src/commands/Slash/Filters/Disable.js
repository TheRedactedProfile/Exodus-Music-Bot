const { EmbedBuilder } = require("discord.js");
const delay = require("delay");

module.exports = {
    name: "disable",
    description: "Borrar los filtros del reproductor actual.",
    category: "Filters",
    permissions: {
        bot: [],
        channel: [],
        user: [],
    },
    settings: {
        inVc: false,
        sameVc: true,
        player: true,
        current: true,
        owner: false,
        premium: false,
    },
    run: async (client, interaction, player) => {
        await interaction.deferReply({ ephemeral: true });

        await player.node.rest.updatePlayer({
            guildId: player.guildId,
            data: { filters: {} },
        });

        await player.setVolume(100);

        const embed = new EmbedBuilder().setDescription(`\`☑️\` | Los filtros se han: \`Eliminado\``).setColor(client.color);

        await delay(2000);
        return interaction.editReply({ embeds: [embed] });
    },
};
