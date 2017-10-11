'use strict';

const common = require(`../Common.js`);
const state = require(`../State.js`);

const RichEmbed = require(`discord.js`).RichEmbed;

const Command = require(`../Models/Command.js`);
const Argument = require(`../Models/Argument.js`);

const DESCRIPTION = `Posts a mod in the #mod-showcase channel.`;
const args = [
  new Argument(`name`, `The name of the mod.`, true),
  new Argument(`description`, `The description of the mod.`, true),
  new Argument(`picture`, `The URL of a picture of the mod. Alternatively, you may upload an image \
as a part of the message, and put a dummy argument here.`, true),
  new Argument(`url`, `The URL of the download, or wiki page.`, false)
];

const callback = (message, args) =>
{
  const mod_embed = new RichEmbed(
    {
      title: args[0],
      description: args[1],
      url: args[3]
    }
  );
  const min = 0;
  const max = 255;
  mod_embed.setColor([
    common.GetRandomNumber(min, max),
    common.GetRandomNumber(min, max),
    common.GetRandomNumber(min, max)
  ]);
  if (message.attachments.size >= 1)
    mod_embed.setImage(message.attachments.first().url);
  else
    mod_embed.setImage(args[2]);
  // An error can occur if the URL is broken.
  state.showcase_channel.send(`New mod update by ${message.author}:`, {embed: mod_embed})
    .catch(error => common.SendErrorMessage(message, `\`\`\`css\n${error}\`\`\``));
};

module.exports.command = new Command(`Showcase`, DESCRIPTION, args, null, callback);
