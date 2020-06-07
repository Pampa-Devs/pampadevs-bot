module.exports = async (client, member) => {

	// Mandar DM pra pessoa que entrou

    member.send(
        ` **Sejam bem-vindos ao servidor 🧉 PampaDevs 🧉! [:flag_br:]** \r\n\r\n
        ``````\n
        Nós somos uma comunidade de desenvolvedores, designers e entusiastas do Rio Grande do Sul que temos como objetivo compartilhar conhecimento e auxiliar novatos;\n
        ``````\n
        **Algumas dicas para quem entrou agora:**\n
        ``````\n
        • O 💬-bate-papo é o canal principal. Por sermos uma comunidade brasileira, a nossa língua oficial é o Português.\n
        • Leiam as nossas 📑-regras para saber quais são as nossas políticas dentro deste servidor.\n
        • Se mantenham atualizados seguindo o nosso canal de 📭-anúncios.\n
        • Utilizem nossa sessão de ❓ dúvidas quando necessitarem de ajuda em seu estudo
        • Caso você seja um iniciante, sinta-se livre para visualizar os tutoriais disponíveis em ${process.env.TUTORIAL_HUB};\n
        ``````\n
        **Estamos muito felizes de ter vocês aqui. Novamente, sejam bem- vindos :slight_smile: !**       
        `);

	client.channels
		.get(process.env.WELCOME_CHANNEL)
		.send(`<:he4rt:629035176755724299> | ${member}`);
	client.channels
		.get(process.env.RULES_CHANNEL)
		.send(`<:he4rt:629035176755724299> | ${member}`)
		.then(msg => msg.delete(8000));
};
