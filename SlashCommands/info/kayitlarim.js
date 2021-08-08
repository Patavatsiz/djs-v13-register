const { Client, CommandInteraction } = require("discord.js");
const config = require('../../config');
const qdb = require('quick.db');
const ydb = new qdb.table("yetkili");


module.exports = {
    name: "kayıtlarım",
    description: "Kayıtlarınızı gösterir",
    options: [
        {
            type: "USER",
            name: "user",
            description: "Kullanıcı Belirtin",
            required: true
            
        }
    ],
    

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
        async execute (client, interaction, args)  {
            
        // definition of user
        let user = args[0];
        let member = interaction.guild.members.cache.get(user);

        // perm & some useful things
        if(!config.RegisterHammer.some(role => interaction.member.roles.cache.get(role)) && !interaction.member.permissions.has("ADMINISTRATOR")) return interaction.followUp({ content: "Bu komudu kullanmak için <@&" + config.RegisterHammer.map(role => role).join(", ") + "> rol(ler)ine veya \`ADMINISTRATOR\` yetkisine sahip olmalısın." }) 

        let e = ydb.fetch(`yetkili.${member.id}.erkek`)
        let k = ydb.fetch(`yetkili.${member.id}.kadın`)
        let t = ydb.fetch(`yetkili.${member.id}.toplam`)
        if(e  === undefined || e  === null) e = "0"
        if(t  === undefined || t  === null) t = "0"
        if(k  === undefined || k  === null) k = "0"

        interaction.followUp({ content: `
\`•\` Toplam **__${t}__** net kaydı bulunmakta.
\`•\` Toplam **__${e}__** erkek kaydı bulunmakta.
\`•\` Toplam **__${k}__** kadın kaydı bulunmakta.` })

    },
};

