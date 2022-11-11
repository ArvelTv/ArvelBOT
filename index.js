// THIS BOT IS MADE BY ArvelTv#5506 | Made with Discord.JS V12
const Discord = require('discord.js');
const client = new Discord.Client({
    intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_VOICE_STATES"] //Aggiungere GUILD_VOICE_STATES
})
require('dotenv').config();

client.login(process.env.tokenarvelbot);

client.on('ready', () => {
    console.log(`${client.user.tag} E Online!`)
    client.user.setPresence({ activities: [{ name: '!comandi' }], status: 'online' });
    client.user.setStatus('online') //Oppure idle, dnd, invisible

})

// Inizio Dell' codice

// Help

client.on("messageCreate", message => {
    if (message.content == "!comandi") {
        let embed = new Discord.MessageEmbed()
            .setTitle("Lista Comandi")
            .setDescription("Ecco la lista dei Comandi dell\' bot!")
            .addField("Link Della Lista", `https://github.com/ArvelTv/ArvelBOT/blob/main/Comandi.md`)
            .setFooter("Bot Made By ArvelTv#5506")
            .setColor("007bff")
            .setThumbnail("https://cdn.discordapp.com/attachments/1014921657170808882/1033017451811721266/arvel.png")
            message.channel.send(`${message.author.username} Ti ho mandato in privato La lista dei comandi! Se non hai ricevuto il mio messaggio e probbabile che hai i dm spenti`)
        message.author.send({embeds: [embed]})
        client.channels.cache.get("1033018942500909216").send(`NUOVO LOG: E Stato eseguito il comando !comandi Nella chat: #${message.channel.name} | ID Discord: ${message.author.id} | Nome Utente: ${message.author.username}`) // log staff


    }
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Benvenuto

client.on("guildMemberAdd", member => {
    if (member.user.bot) return
    var embed = new Discord.MessageEmbed()
    .setTitle(`Nuovo Membro!`)
        .setDescription(`Ciao ${member.toString()}, benvenuto Su **chiesa di arvel**`)
        .setFooter("Bot Made By ArvelTv#5506")
        .setColor("007bff")
        .setThumbnail("https://cdn.discordapp.com/attachments/1014921657170808882/1033017451811721266/arvel.png")
    client.channels.cache.get("1014920001981005855").send({embeds: [embed]
    }); 
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Ping

client.on("messageCreate", message => {
    if (message.content == "!ping") {
        let embed = new Discord.MessageEmbed()
            .setTitle("Ping del bot")
            .setDescription("Ecco la latenza del bot")
            .addField("Ping", `${client.ws.ping}ms`)
            .setFooter("Bot Made By ArvelTv#5506")
            .setColor("007bff")
            .setThumbnail("https://cdn.discordapp.com/attachments/1014921657170808882/1033017451811721266/arvel.png")
        message.channel.send({embeds: [embed]})
        client.channels.cache.get("1033018942500909216").send(`NUOVO LOG: E Stato eseguito il comando !ping Nella chat: #${message.channel.name} | ID Discord: ${message.author.id} | Nome Utente: ${message.author.username}`) // log staff


    }
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// TRANSCRIPT

client.on("messageCreate", async message => {
    if (message.content == "!transcript") {
        let chatLog = `-- CHAT LOG #${message.channel.name} --\n\n`

        let messages = await getAllMessages(message.channel)
        messages.reverse().forEach(msg => {
            chatLog += `@${msg.author.Nome} ID: ${msg.author.id} - ${msg.createdAt.toLocaleString()}\n`

            if (msg.content) chatLog += `${msg.content}\n`

            if (msg.embeds[0]) {
                chatLog += `Embed:\n`
                if (msg.embeds[0].title) chatLog += `Title: ${msg.embeds[0].title}\n`
                if (msg.embeds[0].description) chatLog += `Description: ${msg.embeds[0].description}\n`
                if (msg.embeds[0].fields[0]) chatLog += `Fields: ${msg.embeds[0].fields.map(x => `${x.name}-${x.value}`).join(", ")}\n`
            }

            if (msg.attachments.size > 0)
                chatLog += `Files: ${msg.attachments.map(x => `${x.name} (${x.url})`).join(", ")}\n`

            if (msg.stickers.size > 0)
                chatLog += `Stickers: ${msg.stickers.map(x => `${x.name} (${x.url})`).join(", ")}\n`

            chatLog += "\n"
        })

        let attachment = new Discord.MessageAttachment(Buffer.from(chatLog, "utf-8"), `chatLog-channel-${message.channel.id}.txt`)

        let embed = new Discord.MessageEmbed()
            .setTitle("Transcript canale")
            .setDescription("Ecco il log di tutti i messaggi in questo canale")
            .setColor("007bff")
            .setFooter("Bot Made By ArvelTv#5506")
            .setThumbnail("https://cdn.discordapp.com/attachments/1014921657170808882/1033017451811721266/arvel.png")

        message.channel.send({ embeds: [embed], files: [attachment] })

        console.log(`CONSOLE: Nuovo transcript nell canale #${message.channel.name} | Avvisato Nei Log`)

        // log
        client.channels.cache.get("1033018942500909216").send(`NUOVO LOG: Nuovo transcript nell canale #${message.channel.name} | ID Utente: ${message.author.id} | Nome Utente: ${message.author.username}`)
        client.channels.cache.get("1033018942500909216").send({ files: [attachment] })
    }
})

const getAllMessages = async (channel) => {
    let allMessages = []
    let lastMessage

    while (true) {
        const options = { limit: 100 }
        if (lastMessage) options.before = lastMessage

        let messages = await channel.messages.fetch(options)

        allMessages = allMessages.concat(Array.from(messages.values()))

        lastMessage = messages.last().id

        if (messages.size != 100) {
            break
        }
    }

    return allMessages
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// SISTEMA DI MODERAZIONE

client.on("messageCreate", message => {
    if (message.channel.type == "DM") return


    var parolacce = ["lgbt","froci","tua madre","trimone","mamt","troia", "puttana", "bucchinara", "bagascia", "server di merda", "negro","senegalese","merde","down","frocio","ricchioni", "gay","negro","forci di merda", "neri di merda", "n3gr0", "frocio"]
    var trovata = false;
    var testo = message.content;

    parolacce.forEach(parola => {
        if (message.content.toLowerCase().includes(parola.toLowerCase())) {
            trovata = true;
            testo = testo.replace(eval(`/${parola}/g`), "###");
        }
    })

    if (trovata) {
        message.delete();
        var embed = new Discord.MessageEmbed()
        .setTitle(`${message.author.username} ha scritto delle parole bannabili`)
            .setDescription(`Ha detto una parola bannabile ed e stato elliminato il messaggio | ID Discord: ${message.author.id}`)
            .setColor("007bff")
            .setThumbnail("https://cdn.discordapp.com/attachments/1014921657170808882/1033017451811721266/arvel.png")
            .setFooter("Bot Made By ArvelTv#5506")

            console.log(`CONSOLE: Qualcuno ha provato a dire una parola bannabile ed e stato bloccato Nella chat: #${message.channel.name} | ID Discord: ${message.author.id} | Nome Utente: ${message.author.username} | Avvisato Nei Log`)
        message.channel.send({ embeds: [embed] })
        client.channels.cache.get("1033018942500909216").send(`NUOVO LOG: Qualcuno ha provato a dire una parola bannabile ed e stato bloccato Nella chat: #${message.channel.name} | ID Discord: ${message.author.id} | Nome Utente: ${message.author.username}`) // log staff
    }
})

