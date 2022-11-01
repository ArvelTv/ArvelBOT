// Questo bot e stato creato ufficialmente da ArvelTv#5506, Questo e il codice dell' bot ma per provare il bot https://discord.io/arvel
const Discord = require('discord.js');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] }); //<-- RICORDARSI QUESTO
require('dotenv').config()

client.login(process.env.tokenarvelbot);

client.on('ready', () => {
    console.log("ArvelBOT - 2 - Online!")

})

// Inizio Dell' Codice

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Ticket

client.on("message", message => {
    if (message.content == "!jjfjfjdjfjdjfdjfkjdjsfkskdfsdfksfdkjfsdkj") {
        message.delete()
        message.channel.send("Clicca sulla reazione per aprire un ticket")
            .then(msg => msg.react("📩")) //Personalizzare l'emoji della reaction
    }
})

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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Reaction Roles - Sesso

//---- 1° METODO ----
client.on("message", message => {
    if (message.content == "!kfks") {
        message.delete()
        var embed = new Discord.MessageEmbed() //Crea il tuo embed o messaggio normale
            .setTitle("Reaction roles")
            .setDescription("Clicca sulle reazioni per ottenere i ruoli")
            .setColor("007bff")
            .setFooter("Bot Made By ArvelTv#5506")
            .setThumbnail("https://cdn.discordapp.com/attachments/1014921657170808882/1033017451811721266/arvel.png")

        message.channel.send(embed)
            .then(msg => {
                //Inserire tutte le reazioni che si vogliono
                msg.react("👦")
                msg.react("👱‍♀️")
            })
    }
})

//Quando viene cliccata una reazione
client.on("messageReactionAdd", async function (messageReaction, user) {
    if (user.bot) return //Le reaction dei bot verranno escluse

    if (messageReaction.message.partial) await messageReaction.message.fetch();

    if (messageReaction.message.id == "1036754551371464744") { //Settare id messaggio
        if (messageReaction._emoji.name == "👦") {
            var utente = messageReaction.message.guild.members.cache.find(x => x.id == user.id);
            utente.roles.add("1014919860309999736"); //Settare ruolo
        }
        if (messageReaction._emoji.name == "👱‍♀️") {
            var utente = messageReaction.message.guild.members.cache.find(x => x.id == user.id);
            utente.roles.add("1014919859253035189");
        }
    }
})

//Quando viene rimossa una reazione
client.on("messageReactionRemove", async function (messageReaction, user) {
    if (user.bot) return

    if (messageReaction.message.partial) await messageReaction.message.fetch();

    if (messageReaction.message.id == "1036754551371464744") {
        if (messageReaction._emoji.name == "👦") {
            var utente = messageReaction.message.guild.members.cache.find(x => x.id == user.id);
            utente.roles.remove("1014919860309999736");
        }
        if (messageReaction._emoji.name == "👱‍♀️") {
            var utente = messageReaction.message.guild.members.cache.find(x => x.id == user.id);
            utente.roles.remove("1014919859253035189");
        }
    }
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Fine Dell' Codice