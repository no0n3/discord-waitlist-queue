export default {
  BOT_TOKEN: process.env.BOT_TOKEN,
  SERVER_ID: process.env.SERVER_ID,
  INTERROGATION_ROOM_IDS: (process.env.INTERVIEW_ROOM_IDS ?? '').split(','),
  WAIT_ROOM_ID: process.env.WAIT_ROOM_ID,
  TARGET_ACCESS_ROLE_ID: process.env.TARGET_ACCESS_ROLE_ID,
  DISCORD_API_ENDPOINT: 'https://discord.com/api',
  JWT_SECRET: process.env.JWT_SECRET
};
