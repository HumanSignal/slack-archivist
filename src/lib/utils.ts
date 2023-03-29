export function removeBotnameTag(msg: string, botname: string) {
  const botregex = /<@.*>/;
  const botnameTag = `<@${botname}>`;
  return msg.match(botregex)
    ? msg.replace(botregex, "").trim()
    : msg.trim();
}

export function isCommand(msg: string) {
  return msg.trim().startsWith("--");
}

export function parseCommand(msg: string) {
  return msg.trim().substr(2);
}
