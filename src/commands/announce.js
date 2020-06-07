const Discord = require('discord.js');
const roles = require('../roles');
const shared = require('../shared');

module.exports = {
	validate(client, message) {
		if (!message.member.hasPermission('MANAGE_GUILD')) {
			throw new Error('no_permission');
		}
	},
	run: (client, message, args) => {
		// TODO: verificar o que fazer com possivel erro

		const mensg = args.slice(0).join(' ');
		if (!mensg) return null;

		const announce = new Discord.MessageEmbed()
			.setTitle('``🧉`` **PampaDevs anuncia:** ``🧉``')
			.setDescription(mensg)
			.setColor('#ff0040')
			.setFooter(
				shared.getYear() + ' © PampaDevs',
			)
			.setTimestamp();

        return client.channels.cache
            .get(process.env.ANNOUNCE_CHANNEL)
            .send('@everyone', announce)
            .then(msg => msg.delete(8000));
	},

	get command() {
		return {
			name: 'announce',
			category: roles.MOD,
			description: 'The use is about to announce.',
			usage: 'announce',
		};
	},
};
