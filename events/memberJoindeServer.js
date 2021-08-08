const config = require('../config');
const { MessageEmbed } = require('discord.js');
const moment = require('moment')


client.on("guildMemberAdd", async (member) => {
  let kontrol = Date.now() - member.user.createdTimestamp > 1000 * 60 * 60 * 24 * 15 ? "güvenli" : "şüpheli"
  if (!member.user.bot && kontrol === "güvenli") {
    await member.roles.add(config.unregRole)
    await member.setNickname(`${config.serverTag} İsim | Yaş`)
    await client.channels.cache.get(config.regChannel).send({ content: `
Sunucumuza hoşgeldin ${member}! seninle birlikte **${member.guild.memberCount}** kişiye ulaştık!

Sol taraftaki **V.confirmed** odalarına giriş yapıp kaydını yaptırabilirsin, <@&${config.RegisterHammer.map(role => role).join(", ")}> rol(ler)üne sahip yetkililerimiz seninle ilgilenecektir. 

Sunucu kurallarımız <#${config.rulesChannel}> kanalında belirtilmiştir. Unutma kayıt olduğunda kuralları okumuş sayılırsın ve buna göre ceza-i işlemler uygulanır !

Hesabın **${moment(member.user.createdAt).locale("tr").format("LLL")}** tarihinde \`(${client.tarihHesapla(member.user.createdAt)})\`  açılmış. Tagımızı (\`${config.serverTag}\`) alarak bizlere destek olabilirsin!` })
  } else if (!member.user.bot && kontrol === "şüpheli") {
    await member.roles.set([config.susRole])
    const embed = new MessageEmbed()
    .setColor("RED")
    .setAuthor(member.user.username, member.user.avatarURL({ dynamic: true }))
    .setThumbnail(member.user.avatarURL({ dynamic: true }))
    .setFooter(confid.embedFooter)
    .setTimestamp()
    .setDescription(`
${member} sunucuya katıldı fakat hesabı **${moment(member.user.createdAt).locale("tr").format("LLL")}** tarihinde \`(${client.tarihHesapla(member.user.createdAt)})\` açıldığı için <@&${config.susRole}> rolü verildi.`)
    await client.channels.cache.get(config.regChannel).send({ embeds: [embed] })
  } else if (member.user.bot) {
    await member.roles.set([config.botRole])
  }
});

