const client = require("../index");
const qdb = require('quick.db');
const idb = new qdb.table("isimler");

client.on("guildMemberRemove", member => {
  let sonisim = idb.get(`kullanici.${member.id}.sonisim`) || [];
  if(sonisim) return idb.push(`kullanici.${member.id}.isimler`, {
    Name: sonisim.Name,
    Process: "Sunucudan Ayrılma"
  });
});



