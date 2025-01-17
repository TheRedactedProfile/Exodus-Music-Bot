const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const formatDuration = require("../../../structures/FormatDuration.js");

module.exports = {
    name: "seek",
    description: "Busca la canción reproducida actualmente.",
    category: "Music",
    options: [
        {
            name: "seconds",
            description: "Nueva posición de duración de la canción.",
            type: ApplicationCommandOptionType.Number,
            required: true,
            min_value: 0,
        },
    ],
    permissions: {
        bot: [],
        channel: [],
        user: [],
    },
    settings: {
        inVc: true,
        sameVc: true,
        player: true,
        current: true,
        owner: false,
        premium: false,
    },
    run: async (client, interaction, player) => {
        await interaction.deferReply({ ephemeral: true });

        const position = interaction.options.getNumber("seconds", true);
        const Duration = formatDuration(position * 1000);

        if (!player.currentTrack.info.isSeekable) {
            const embed = new EmbedBuilder().setColor(client.color).setDescription(`\`❌\` | Song is not seekable`);

            return interaction.editReply({ embeds: [embed] });
        } else {
            await player.seekTo(position * 1000);

            const embed = new EmbedBuilder().setColor(client.color).setDescription(`\`⏩\` | Song seeked to: \`${Duration}\``);

            return interaction.editReply({ embeds: [embed] });
        }
    },
};
