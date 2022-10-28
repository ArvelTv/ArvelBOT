// Questo bot e stato creato ufficialmente da ArvelTv#5506, Questo e il codice dell' bot ma per provare il bot https://discord.io/arvel
const Discord = require('discord.js');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] }); //<-- RICORDARSI QUESTO
require('dotenv').config()

client.login(process.env.tokenarvelbot);

client.on('ready', () => {
    console.log("ArvelBOT Online!")
    client.user.setPresence({ activities: [{ name: 'Bot in costruzione...' }], status: 'online' });
    client.user.setStatus('online') //Oppure idle, dnd, invisible

})

// Inizio Dell' Codice

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Benvenuto!

client.on("guildMemberAdd", member => {
    if (member.user.bot) return
    var embed = new Discord.MessageEmbed()
    .setTitle(`Nuovo Membro!`)
        .setDescription(`Ciao ${member.toString()}, Benvenuto Nella Chiesa Di Arvel!`)
        .setFooter("Bot Made By ArvelTv#5506")
        .setColor("007bff")
        .setThumbnail("https://cdn.discordapp.com/attachments/1014921657170808882/1033017451811721266/arvel.png")
    client.channels.cache.get("1014920001981005855").send({embeds: [embed]
    }); 
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
        client.channels.cache.get("1033018942500909216").send(`E Stato eseguito il comando !ping Nella chat: #${message.channel.name} | ID Discord: ${message.author.id} | Nome Utente: ${message.author.username}`) // log staff


    }
})


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Ticket

//client.on("message", message => {
//    if (message.content == "!jjfjfjdjfjdjfdjfkjdjsfkskdfsdfksfdkjfsdkj") {
//        message.delete()
//        message.channel.send("Clicca sulla reazione per aprire un ticket")
//            .then(msg => msg.react("📩")) //Personalizzare l'emoji della reaction
//    }
//})

client.on("messageReactionAdd", async function (messageReaction, user) {
    if (user.bot) return

    if (messageReaction.message.partial) await messageReaction.message.fetch();

    if (messageReaction._emoji.name == "📩") { //Personalizzare l'emoji della reaction
        if (messageReaction.message.channel.id == "1026951932239167618") { //Settare canale
            messageReaction.users.remove(user);
            var server = messageReaction.message.channel.guild;
            if (server.channels.cache.find(canale => canale.topic == `User ID: ${user.id}`)) {
                user.send("Hai gia un ticket aperto").catch(() => { })
                return
            }

            server.channels.create(user.username, {
                type: "text"
            }).then(canale => {
                canale.setTopic(`User ID: ${user.id}`);
                canale.setParent("1035634373187346603") //Settare la categoria
                canale.overwritePermissions([
                    {
                        id: server.id,
                        deny: ["VIEW_CHANNEL"]
                    },
                    {
                        id: user.id,
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                    }
                ])
                canale.send("Grazie per aver aperto un ticket, Uno staff ti rispondera all prima possibile! | <@&1014919828743659581>")
            })
        }
    }
})

client.on("message", message => {
    if (message.content == "!close") {
        var topic = message.channel.topic;
        if (!topic) {
            message.channel.send("Non puoi utilizzare questo comando qui");
            return
        }

        if (topic.startsWith("User ID:")) {
            var idUtente = topic.slice(9);
            if (message.member.hasPermission("MANAGE_CHANNELS")) {
                message.channel.delete();
            }
        }
        else {
            message.channel.send("Non puoi utilizzare questo comando qui")
        }
    }

    if (message.content.startsWith("!add")) {
        var topic = message.channel.topic;
        if (!topic) {
            message.channel.send("Non puoi utilizzare questo comando qui");
            return
        }

        if (topic.startsWith("User ID:")) {
            var idUtente = topic.slice(9);
            if (message.author.id == idUtente || message.member.hasPermission("MANAGE_CHANNELS")) {
                var utente = message.mentions.members.first();
                if (!utente) {
                    message.channel.send("Inserire un utente valido");
                    return
                }

                var haIlPermesso = message.channel.permissionsFor(utente).has("VIEW_CHANNEL", true)

                if (haIlPermesso) {
                    message.channel.send("Questo utente ha gia accesso al ticket")
                    return
                }

                message.channel.updateOverwrite(utente, {
                    VIEW_CHANNEL: true
                })

                message.channel.send(`${utente.toString()} è stato aggiunto al ticket`)
            }
        }
        else {
            message.channel.send("Non puoi utilizzare questo comando qui")
        }
    }
    if (message.content.startsWith("!remove")) {
        var topic = message.channel.topic;
        if (!topic) {
            message.channel.send("Non puoi utilizzare questo comando qui");
            return
        }

        if (topic.startsWith("User ID:")) {
            var idUtente = topic.slice(9);
            if (message.author.id == idUtente || message.member.hasPermission("MANAGE_CHANNELS")) {
                var utente = message.mentions.members.first();
                if (!utente) {
                    message.channel.send("Inserire un utente valido");
                    return
                }

                var haIlPermesso = message.channel.permissionsFor(utente).has("VIEW_CHANNEL", true)

                if (!haIlPermesso) {
                    message.channel.send("Questo utente non ha gia accesso al ticket")
                    return
                }

                if (utente.hasPermission("MANAGE_CHANNELS")) {
                    message.channel.send("Non puoi rimuovere questo utente")
                    return
                }

                message.channel.updateOverwrite(utente, {
                    VIEW_CHANNEL: false
                })

                message.channel.send(`${utente.toString()} è stato rimosso al ticket`)
            }
        }
        else {
            message.channel.send("Non puoi utilizzare questo comando qui")
        }
    }
})


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Transcript

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

        let attachment = new Discord.MessageAttachment(Buffer.from(chatLog, "utf-8"), `arvelbot-chatLog-channel-${message.channel.id}.txt`)

        let embed = new Discord.MessageEmbed()
            .setTitle("Transcript canale")
            .setDescription("Ecco il log di tutti i messaggi in questo canale")
            .setColor("007bff")
            .setThumbnail("https://cdn.discordapp.com/attachments/1014921657170808882/1033017451811721266/arvel.png")
            .setFooter("Bot Made By ArvelTv#5506")

        message.channel.send({ embeds: [embed], files: [attachment] })

        client.channels.cache.get("1033018942500909216").send(`Nuovo transcript nell canale #${message.channel.name}`)
        client.channels.cache.get("1033018942500909216").send({ embeds: [embed], files: [attachment] })
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// SISTEMA DI MODERAZIONE

client.on("messageCreate", message => {
    if (message.channel.type == "DM") return


    var parolacce = ["lgbt","froci","tua madre","trimone","mamt","troia", "puttana", "bucchinara", "bagascia", "server di merda", "negro","senegalese","merde","down","frocio","ricchioni", "gay","forci di merda", "neri di merda", "n3gr0","tua madre"]
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

        message.channel.send({ embeds: [embed] })
        client.channels.cache.get("1033018942500909216").send(`NUOVO LOG: Qualcuno ha provato a dire una parola bannabile ed e stato bloccato Nella chat: #${message.channel.name} | ID Discord: ${message.author.id} | Nome Utente: ${message.author.username}`)
    }
})


// Fine dell' codice