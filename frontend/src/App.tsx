import { useContext } from "react";
import { CircularProgress, Typography } from "@mui/material";
import { AuthContext } from "./contexts/AuthContext";
import Main from "./components/Main";

export default function App() {
  const { loggedUser } = useContext(AuthContext);

  if (!loggedUser) {
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

  if (!loggedUser.token) {
    return (
      <div style={{
        marginTop: 50,
        display: 'flex',
        justifyContent: 'center'
      }}>
        <Typography variant="h4" gutterBottom component="div">Unauthorized</Typography>
      </div>
    );
  }

  return (
    <Main />
  );
}
