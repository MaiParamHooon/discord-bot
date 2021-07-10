require("dotenv").config(); //for getting environ variable from .env file

const { Client, WebhookClient } = require("discord.js");

const client = new Client({
	partials: ["MESSAGE", "REACTION"],
});

const webhookClient = new WebhookClient(
	process.env.WEBHOOK_ID,
	process.env.WEBHOOK_TOKEN
);

const PREFIX = "$";

client.on("ready", () => {
	console.log(`${client.user.username} has logged in`);
});

client.on("message", (message) => {
	if (message.author.bot === true) return;
	console.log(`[${message.author.tag}]: ${message.content}`);
	if (message.content === "Hey Bot") {
		message.reply("Hey!");
		// message.channel.send("hello"); isse vapis trigger ho jaiga
		// message.channel.send("Hey!");
	}

	if (message.content.startsWith(PREFIX)) {
		const { cmd_name, ...args } = message.content
			.trim()
			.substring(PREFIX.length)
			.split(/\s+/);
	}

	if (cmd_name === "kick") {
		if (!message.member.hasPermission("KICK_MEMBERS"))
			return message.reply("You don't have permission to use that command");
		if (args.length === 0) return message.reply("Please provide an ID");
		const member = message.guild.members.cache.get(args[0]);
		if (memeber) {
			memeber
				.kick()
				.then((member) => message.channel.send(`${member} was kicked`))
				.catch((error) => message.channel.send(`I do not have permission :(`));
		} else {
			message.channel.send("That member was not found");
		}
	} else if (cmd_name === "ban") {
		if (!message.member.hasPermission("BAN_MEMBERS"))
			return message.reply("You don't have permission to use that command");
		if (args.length === 0) return message.reply("Please provide an ID");

		const user = message.guild.members.ban(args[0]);

		user
			.then((user) => message.channel.send("User was banned successfully"))
			.catch((error) =>
				message.channel.send(
					"An error occurred. Either I don't have permission or the user was not found"
				)
			);
	} else if (cmd_name === "announcement") {
		console.log(args);
		const msg = args.join(" ");
		console.log(msg);
		webhookClient.send(msg);
	}
});

// Role add

client.on("messageReactionAdd", (reaction, user) => {
	const { name } = reaction.emoji;
	const member = reaction.message.guild.members.cache.get(user.id);
	if (reaction.message.id === "846484533578956800") {
		switch (name) {
			case "🍎":
				member.roles.add("");
				break;
			case "🍌":
				member.roles.add("");
				break;
			case "🍇":
				member.roles.add("");
				break;
			case "🍑":
				member.roles.add("");
				break;
		}
	}
});

//Role remove

client.on("messageReactionRemove", (reaction, user) => {
	const { name } = reaction.emoji;
	const member = reaction.message.guild.members.cache.get(user.id);
	if (reaction.message.id === "738666523408990258") {
		switch (name) {
			case "🍎":
				member.roles.remove("738664659103776818");
				break;
			case "🍌":
				member.roles.remove("738664632838782998");
				break;
			case "🍇":
				member.roles.remove("738664618511171634");
				break;
			case "🍑":
				member.roles.remove("738664590178779167");
				break;
		}
	}
});

client.login(process.env.DISCORDJS_BOT_TOKEN);
