import { Client, Guild, Intents, VoiceState } from "discord.js";
import { send } from "./ws";
import config from './config';

export const waitlist: any[] = [];

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ]
});

const formatChannel = (channel: any) => ({
  id: channel.id,
  name: channel.name
});
const getChannel = (channelId: string) => client.guilds.cache.get(config.SERVER_ID).channels.cache.get(channelId);

client.once('ready', () => {
  const waitingRoom: any = getChannel(config.WAIT_ROOM_ID);

  const users = waitingRoom.members.map(member => ({
    ...member.user,
    tag: `${member.user.username}#${member.user.discriminator}`,
    displayAvatarURL: member.user.displayAvatarURL(),
    joinedAt: member.joinedTimestamp,
  }));

  users.sort((i, j) => {
    return i.joinedAt > j.joinedAt ? 1 :
      i.joinedAt < j.joinedAt ? -1 :
        0;
  });

  waitlist.push(...users.map(user => ({
    ...user,
    joinedAt: null
  })));;
});

client.on('voiceStateUpdate', (oldState: VoiceState, newState: VoiceState) => {
  if (oldState?.channel && oldState.channel.id == config.WAIT_ROOM_ID) {
    const ix = waitlist.findIndex(user => user.id == oldState.member.id);
    if (ix === -1) return;

    waitlist.splice(ix, 1);

    send({
      type: 'leave',
      payload: oldState.member.id
    });

    return;
  }

  if (!newState?.channel || newState.channel.id != config.WAIT_ROOM_ID || (newState.member as any).bot) {
    return;
  }

  if (!newState.member?.user) return;

  const user = {
    ...newState.member.user,
    tag: `${newState.member.user.username}#${newState.member.user.discriminator}`,
    displayAvatarURL: newState.member.user.displayAvatarURL(),
    joinedAt: Date.now()
  };

  waitlist.push(user);

  send({
    type: 'join',
    payload: user
  });
});

client.login(config.BOT_TOKEN);

const moveToChannel = (userId: string, fromChannelId: string, targetChannelId: string) => {
  const guild: Guild = client.guilds.cache.get(config.SERVER_ID);
  const channel: any = guild.channels.cache.get(fromChannelId);
  const member = channel.members.get(userId);
  const newChannel = guild.channels.cache.get(targetChannelId);
  member && member.voice.setChannel(newChannel);
};

export const moveToInterrogation = (userId: string, channelId: string) => {
  moveToChannel(userId, config.WAIT_ROOM_ID, channelId);
};

export const getInterrogationChannels = () => config.INTERROGATION_ROOM_IDS.map(channelId => formatChannel(getChannel(channelId)));
