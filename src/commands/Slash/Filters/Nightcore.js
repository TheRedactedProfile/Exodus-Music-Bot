const { EmbedBuilder } = require("discord.js");
const delay = require("delay");

module.exports = {
    name: "nightcore",
    description: "Establecer el filtro del usuario actual en Nightcore.",
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

        await player.filters.setNightcore(true);

        const embed = new EmbedBuilder().setDescription(`\`🔩\` | El filtro se ha establecido en: \`Nightcore\``).setColor(client.color);

        await delay(2000);
        return interaction.editReply({ embeds: [embed] });
    },
};
