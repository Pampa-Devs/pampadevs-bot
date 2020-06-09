const shared = require('../shared');

const runCommand = async (client, message) => {
    if (message.channel.id === process.env.SUGGESTION_CHAT) {
        message.react('✅');
		message.react('❌');
    }

    if (!shared.isCommand(message)) return;

    const args = message.content.slice(process.env.COMMAND_PREFIX.length)
                                .trim()
                                .split(/ +/g);

    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);

    if (!command) return;

    // eslint-disable-next-line no-empty-function
    message.delete().catch(() => {});

    console.log('[Log]', `${message.author.username} (${message.author.id}) executed command: ${command.command.name}`);

    try {
        if (commandName.validate) {
            await command.validate(client, message, args);
        }
        await command.run(client, message, args);

        if (command.success) {
            await command.success(client, message, args);
        }
    }
    catch(err) {
        console.error(err);
        if (command.fail) {
            await command.fail(err, client, message, args);
            return;
        }
        const embed =
            shared.translate(`${commandName}.fail.${err.message}`) ||
            shared.translate(`${commandName}.fail.default`) ||
            shared.translate('error_command', [commandName, err.message]);

        if (!embed.title) {
            embed.setTitle(`\`\`❌\`\` » ${process.env.COMMAND_PREFIX}${command}`);
        }

        if (!embed.color) {
            embed.setColor('#3639E');
        }

        await message.reply(embed).then(msg => msg.delete(1500));
        return;
    }
    finally {
        if (command.after) {
            await command.after(client, message, args);
        }
    }
};

module.exports = async (client, message) => {
    if (message.author.bot) return;

    if (message.channel.id === process.env.LINK_SHARE_CHANNEL ||
        message.channel.id === process.env.CONTRIBUTION_CHANNEL) {
        message.react('😍');
		message.react('👍');
		message.react('👏');
    }

    await Promise.all([
        runCommand(client, message),
    ]);
};

