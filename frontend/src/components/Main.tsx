import { useContext, useEffect, useState } from "react";
import { getInterrogationChannels, getWaitlist } from "../api/service";
import ChannelPickModal from "./ChannelPickModal";
import Room from "./Room";
import { handleHttpError, timeAgo } from "../utils";
import { WsContext } from "../contexts/WsContext";
import { CircularProgress } from "@mui/material";
import { AuthContext } from "../contexts/AuthContext";

export default function Main() {
  const [users, setUsers] = useState<any[]>([]);
  const [channels, setChannels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [targetUserId, setTargetUserId] = useState<string | null>(null);
  const [msg, setMsg] = useState<{ type: string; payload: any } | null>(null);

  const { lastMessage } = useContext(WsContext);
  const { loggedUser } = useContext(AuthContext);

  useEffect(() => {
    getWaitlist(loggedUser?.token)
      .then((result: any) => {
        const newUsers = result.data.map((user: any) => ({
          ...user,
          waitingTime: timeAgo(user.joinedAt)
        }));
        setUsers(newUsers);
        setLoading(false);
      })
      .catch(handleHttpError)
  }, [loggedUser?.token]);

  useEffect(() => {
    getInterrogationChannels(loggedUser?.token)
      .then((result: any) => {
        setChannels(result.data);
      })
      .catch(handleHttpError)
  }, [loggedUser?.token]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setUsers(users.map((user: any) => ({
        ...user,
        waitingTime: timeAgo(user.joinedAt)
      })));
    }, 60000); // 1 min

    return () => clearTimeout(timeout);
  }, [users]);

  useEffect(() => {
    setMsg(lastMessage);
  }, [lastMessage]);

  useEffect(() => {
    if (!msg) return;

    if (msg.type === 'join') {
      setUsers([...users, msg.payload]);
    } else if (msg.type === 'leave') {
      setUsers(users.filter(user => user.id != msg.payload));
    }

    setMsg(null);
  }, [msg]);

  if (loading) {
    return (
      <div style={{
        marginTop: 50,
        display: 'flex',
        justifyContent: 'center'
      }}>
        <CircularProgress color="secondary" />
      </div>
    );
  }

  return (
    <>
      <div style={{
        height: '100vh',
        overflow: 'auto',
        maxWidth: 500,
        margin: 'auto',
        borderLeft: '1px solid #000',
        borderRight: '1px solid #000',
      }}>
        <div className="App"
          style={{
            padding: 10,
          }}
        >
          <Room
            title="Waiting room"
            users={users}
            channels={channels}
            openModal={(userId: string) => {
              setTargetUserId(userId);
            }}
          />
        </div>
      </div>
      <ChannelPickModal
        targetUserId={targetUserId}
        handleClose={() => setTargetUserId(null)}
        channels={channels}
      />
    </>
  );
}
