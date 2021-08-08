const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const config = require('../../config');
const qdb = require('quick.db');
const idb = new qdb.table("isimler");

module.exports = {
    name: "isimler",
    description: "Kullanıcıların geçmiş isimlerine bakarsınız",
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

       let data = idb.get(`kullanici.${member.id}.isimler`) || [];
        let yazdir = data.length > 0 ? data.map(exc => `\`${exc.Name}\` (${exc.Process})`).join("\n") : "";

        const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setFooter(config.embedFooter)
        .setAuthor(member.displayName, member.user.avatarURL({ dynamic: true }))
        .setDescription(`Kullanıcının toplamda **${data.length}** isim kaydı bulundu.\n\n${yazdir}`)
        interaction.followUp({ embeds: [embed], ephemeral: false });

    

    },
};
