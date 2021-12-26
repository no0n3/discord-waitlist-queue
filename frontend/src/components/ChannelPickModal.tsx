import { Button, CircularProgress, Modal, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { moveToChannel } from "../api/service";
import { AuthContext } from "../contexts/AuthContext";
import { handleHttpError } from "../utils";

export default
  function ChannelPickModal({ targetUserId, handleClose, channels }: any) {
  const [loading, setLoading] = useState(false);
  const { loggedUser } = useContext(AuthContext);

  const onChannelPick = (channelId: string) => {
    if (loading) return;

    setLoading(true);
    moveToChannel(targetUserId, channelId, loggedUser?.token)
      .then(() => {
        setLoading(false);
        handleClose();
      })
      .catch(handleHttpError);
  };

  return (
    <Modal
      open={!!targetUserId}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <div style={{
        display: 'flex',
        justifyContent: 'center'
      }}>
        <div style={{
          margin: 'auto',
          backgroundColor: '#fff',
          padding: '15px',
          marginTop: '50px',
          borderRadius: '5px'
        }}>
          {loading && (
            <div style={{
              width: '100px',
              padding: '25px',
              display: 'flex',
              justifyContent: 'center'
            }}>
              <CircularProgress color="secondary" />
            </div>
          )}
          {!loading && (
            <>
              <Typography variant="h5" gutterBottom component="div">Move to channel:</Typography>
              {channels.map((channel: { id: string, name: string }) => (
                <div
                  key={channel.id}
                  className="channel-item"
                  onClick={() => onChannelPick(channel.id)}
                >
                  <Typography variant="body1" gutterBottom component="div" fontWeight="bold" fontSize="18">{channel.name}</Typography>
                </div>
              ))}
              <div>
                <Button
                  style={{
                    width: '100%'
                  }}
                  onClick={handleClose}
                >Close</Button>
              </div>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}
