import axios from "axios";
import jwt from 'jsonwebtoken';
import config from "./config";

const generateJwt = (payload: any, expiresIn: string) => {
  return jwt.sign(payload, config.JWT_SECRET, { expiresIn: +expiresIn * 1000 });
};

export const verifyJwt = (jwtToken: string) => {
  try {
    return jwt.verify(jwtToken, config.JWT_SECRET);
  } catch (err) {
    console.error(err);

    return null;
  }
};

const getUserServerInfo = async (accessToken: string, tokenType: string) => {
  try {
    const response = await axios.get(`${config.DISCORD_API_ENDPOINT}/users/@me/guilds/${config.SERVER_ID}/member`, {
      headers: {
        authorization: `${tokenType} ${accessToken}`,
      },
    });

    return response.data;
  } catch (e) {
    console.error(e);

    return null;
  }
};

export const authUser = async (accessToken: string, tokenType: string, expiresIn: string) => {
  const userServerInfo = await getUserServerInfo(accessToken, tokenType);

  const hasPermission = userServerInfo.roles.includes(config.TARGET_ACCESS_ROLE_ID);
  if (0 && !hasPermission) return null;

  return generateJwt({
    id: userServerInfo.user.id,
    tag: `${userServerInfo.user.username}#${userServerInfo.user.discriminator}`,
    accessToken
  }, expiresIn);
};
