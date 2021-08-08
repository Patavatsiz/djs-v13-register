const { Client, CommandInteraction } = require("discord.js");
const config = require('../../config');
const qdb = require('quick.db');
const idb = new qdb.table("isimler");


module.exports = {
    name: "isim",
    description: "Kullanıcıların isimlerini değiştirmenize yarar",
    options: [
        {
            type: "USER",
            name: "user",
            description: "Kullanıcı Belirtin",
            required: true
            
        },
        {
            type: "STRING",
            name: "isim",
            description: "İsim belirtin",
            required: false
        },
        {
            type: "NUMBER",
            name: "yaş",
            description: "Yaş belirtin",
            required: false
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
        if(!config.RegisterHammer.some(role => interaction.member.roles.cache.get(role)) && !interaction.member.permissions.has("ADMINISTRATOR") && !member.roles.cache.has(config.boosterRole)) return interaction.followUp({ content: "Bu komudu kullanmak için <@&" + config.RegisterHammer.map(role => role).join(", ") + ">, <@&" + config.boosterRole + "> rol(ler)ine veya \`ADMINISTRATOR\` yetkisine sahip olmalısın." })
        if(member.id === interaction.member.id) return interaction.followUp({ content: "Kendinizin ismini değişemezsiniz." }); 
        if(member.roles.highest.position >= interaction.member.roles.highest.position) return interaction.followUp({ content: "Bu kullanıcının adını değişemezsin." });
        if(args[1].includes("gg" || "com" || ".net" || ".xyz" || ".com" || ".gg" || ".org" || ".co"))
        {
          interaction.followUp({ content: "Adınıza reklam içerikli yazılar koyamazsınız" })
        }

        // set & fix nickname
        const fix = member.user.username.includes(config.serverTag) ? config.serverTag : config.unTag;
        const fix_name = args[1].charAt(0).replace("i", "İ").toLocaleUpperCase() + args[1].slice(1).toLocaleLowerCase();
        let name = `${fix} ${fix_name} | ${args[2]}`
        member.setNickname(name)

        // booster
        if(member.roles.cache.has(config.boosterRole))
        {
        member.setNickname(name)
        }
    
        // message
        interaction.followUp({ content: `${member} kullanıcısının adı başarıyla ${name} olarak değiştirildi` })
        
        // lets use dbs

        idb.push(`kullanici.${member.id}.isimler`, {
            Name: name,
            Process: `İsim Değiştirme`
        });
        idb.set(`kullanici.${member.id}.sonisim`, {
            Name: name
        })

    

    },
};



