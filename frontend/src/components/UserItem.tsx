import { Button, Typography } from "@mui/material";
import { timeAgo } from "../utils";

export default function UserItem({ user, channels, isFirst, openModal }: any) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'relative',
    }} className="user-item">
      <div style={{
        display: 'flex',
        alignItems: 'center',
        opacity: isFirst ? undefined : 0.5,
      }}>
        <img src={user.displayAvatarURL} width="50" style={{
          borderRadius: '100%'
        }} />
        <Typography
          style={{
            marginLeft: 5
          }}
          variant="body1"
          component="div"
          fontWeight="bold"
          fontSize="18"
        >{user.tag}</Typography>
        <div style={{ marginLeft: 10 }}>{timeAgo(user.joinedAt)}</div>
      </div>

      {channels && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}>
          <div>
            <Button
              style={{ marginRight: 5 }}
              variant="outlined"
              onClick={() => openModal(user.id)}
            >Interview</Button>
          </div>
        </div>
      )}
    </div>
  );
}
