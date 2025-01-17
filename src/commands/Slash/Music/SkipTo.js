const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");

module.exports = {
    name: "skipto",
    description: "Saltar la canción que se está reproduciendo a una posición específica de la cola.",
    category: "Music",
    options: [
        {
            name: "position",
            description: "Provide queue position.",
            type: ApplicationCommandOptionType.Integer,
            required: true,
            min_value: 1,
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

        const value = interaction.options.getInteger("position");

        if (value > player.queue.length) {
            const embed = new EmbedBuilder().setDescription(`\`❌\` | Song position was: \`Not found\``).setColor(client.color);

            return interaction.editReply({ embeds: [embed] });
        }

        if (value === 1) {
            await player.skip();

            const embed = new EmbedBuilder().setColor(client.color).setDescription(`\`⏭️\` | Song skipped to position: \`${value}\``);

            return interaction.editReply({ embeds: [embed] });
        }

        await player.queue.splice(0, value - 1);
        await player.skip();

        const embed = new EmbedBuilder().setColor(client.color).setDescription(`\`⏭️\` | Song skipped to position: \`${value}\``);

        return interaction.editReply({ embeds: [embed] });
    },
};
