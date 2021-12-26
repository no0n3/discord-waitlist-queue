import axios from "axios";
import config from "../config";
import { handleHttpError } from "../utils";

const addAuthHeader = (token: string, headers: { [key: string]: string } = {}) => ({
  headers: {
    ...headers,
    'x-auth-token': token
  }
});

export const moveToChannel = (
  targetUserId: string,
  channelId: string,
  token: string
) => axios.post(config.API_ENDPOINT + '/move', { id: targetUserId, channelId }, addAuthHeader(token));

export const getWaitlist = (token: string) => axios.get(config.API_ENDPOINT + '/waitlist', addAuthHeader(token));

export const getInterrogationChannels = (
  token: string
) => axios.get(config.API_ENDPOINT + '/interrogation-channels', addAuthHeader(token));

export const getUser = (
  accessToken: string,
  tokenType: string,
  expiresIn: string
) => axios.get(config.ENDPOINT + `/auth?tokenType=${tokenType}&accessToken=${accessToken}&expiresIn=${expiresIn}`);
