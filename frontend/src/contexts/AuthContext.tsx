import { createContext, useEffect, useState } from "react";
import config from "../config";
import { getUser } from "../api/service";
import { addLoggedUserData, getHashValue, getLoggedUserData, redirect } from "../utils";

export const AuthContext = createContext({
  ws: null,
} as any);

export default function AuthContextProvider(props: any) {
  const [loggedUser, setLoggedUser] = useState<any>(getLoggedUserData());

  useEffect(() => {
    if (loggedUser) return;

    const accessToken = getHashValue('access_token');
    const tokenType = getHashValue('token_type');
    const expiresIn = getHashValue('expires_in');

    if (!accessToken) {
      redirect(
        `https://discord.com/api/oauth2/authorize?client_id=${config.DISCORD_CLIENT_ID}&redirect_uri=${config.DISCORD_CALLBACK_URL}&response_type=token&scope=identify%20guilds%20guilds.members.read`
      );

      return;
    }

    getUser(accessToken, tokenType as string, expiresIn as string)
      .then((result: any) => {
        const respData = result.data;
        const token = respData.token;

        const userData = { token };
        setLoggedUser(userData);
        if (token) {
          addLoggedUserData(userData);

          redirect('/');
        }
      });
  }, [loggedUser]);

  return (
    <AuthContext.Provider value={{
      loggedUser
    }}>
      {props.children}
    </AuthContext.Provider>
  );
};
