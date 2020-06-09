module.exports = async (client, member) => {

	// Send welcome message
    member.send(`**Sejam bem-vindos ao servidor 🧉 PampaDevs 🧉!**\`\`\`Nós somos uma comunidade de desenvolvedores, designers e entusiastas do Rio Grande do Sul que temos como objetivo compartilhar conhecimento e auxiliar novatos\`\`\`\n**Algumas dicas para quem entrou agora:**\r\n\`\`\`\r\n • O 💬-bate-papo é o canal principal. Por sermos uma comunidade brasileira, a nossa língua oficial é o Português.\r\n • Leiam as nossas 📑-regras para saber quais são as nossas políticas dentro deste servidor.\r\n • Se mantenham atualizados seguindo o nosso canal de 📭-anúncios.\r\n • Utilizem nossa sessão de ❓ dúvidas quando necessitarem de ajuda em seu estudo\`\`\`\r\nSinta-se livre para visualizar os tutoriais disponíveis em ${process.env.TUTORIAL_HUB};\r\n\r\n**Estamos muito felizes de ter você aqui. Novamente, seja bem- vindo :slight_smile: !**`);

    // Notify new user about welcome and rules channel
    client.channels.cache
		.get(process.env.WELCOME_CHANNEL)
        .send(`🧉 | ${member}`);
	await client.channels.cache
		.get(process.env.RULES_CHANNEL)
        .send(`🧉 | ${member}`)
        .then(msg => { msg.delete({ timeout: 8000 }); });
};
