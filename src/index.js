const Discord = require('discord.js');
const fs = require('fs-extra');
const Enmap = require('enmap');

require('dotenv').config({ path:'.prod.env' });

const client = new Discord.Client({ forceFetchUsers: true });
client.commands = new Enmap();

const init = async () => {
    const commandFiles = await fs.readdir('src/commands/');
    const eventFiles = await fs.readdir('src/events/');

    console.log('[Log]', `Loading a total of  ${commandFiles.length} commands.`);

    commandFiles.forEach(file => {
        try {
            const props = require(`./commands/${file}`);
            if (file.split('.').slice(-1)[0] !== 'js') return;
            if (props.init) {
                props.init(client);
            }
            client.commands.set(props.command.name, props);
        }
        catch(err) {
            console.error(`Unable to execute command ${file}: ${err}`);
        }
    });

    console.log('[Log]', `Loading a total of  ${eventFiles.length - 1} events.`);

    eventFiles.forEach(file => {
        const eventName = file.split('.')[0];

        const event = require(`./events/${file}`);

        client.on(eventName, event.bind(null, client));
    });

    client.on('error', err => console.error(err));
    console.log(process.env.AUTH_TOKEN);
    client.login(process.env.AUTH_TOKEN);
};

init();

module.exports = client.commands;