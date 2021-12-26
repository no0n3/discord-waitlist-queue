import { Typography } from "@mui/material";
import UserItem from "./UserItem";

export default function Room({ title, users, channels, openModal }: any) {
  return (
    <div style={{}}>
      <Typography
        variant="h4"
        gutterBottom
        component="div"
        style={{ textAlign: 'center' }}
      >{title}</Typography>
      {users.length <= 0 && (<div style={{ textAlign: 'center' }}>Room is empty.</div>)}
      {users.map((user: any, ix: number) => (
        <UserItem
          key={user.id}
          user={user}
          channels={channels}
          isFirst={ix === 0}
          openModal={openModal}
        />))}
    </div>
  );
}
