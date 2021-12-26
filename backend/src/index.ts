import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import expressWs from 'express-ws';
import { getInterrogationChannels, moveToInterrogation, waitlist } from './bot';
import { setUpWs } from './ws';
import config from './config';
import { authUser, verifyJwt } from './auth';

const TARGET_PORT = 4000;
const app = expressWs(express()).app;

app.use(cors());
app.use(bodyParser.json());

setUpWs(app);

const apiRouter = express.Router();
apiRouter.use((req, res, next) => {
  const jwtToken = req.headers['x-auth-token'] as string;

  if (!verifyJwt(jwtToken)) {
    res.status(401).end();

    return;
  }

  next();
});
app.use('/api', apiRouter);

app.get('/auth', async (req, res) => {
  const tokenType = req.query.tokenType;
  const accessToken = req.query.accessToken;
  const expiresIn = req.query.expiresIn;

  const token = await authUser(accessToken, tokenType, expiresIn)

  res.json({ token });
});

apiRouter.get('/waitlist', (req, res) => {
  res.json(waitlist);
});

apiRouter.get('/interrogation-channels', (req, res) => {
  res.json(getInterrogationChannels());
});

apiRouter.post('/move', (req, res) => {
  const userId = req.body.id;
  const channelId = req.body.channelId;

  if (!config.INTERROGATION_ROOM_IDS.includes(channelId)) {
    res.status(400).end();

    return;
  }

  moveToInterrogation(userId, channelId);

  res.status(201).end();
});

app.listen(TARGET_PORT, () => {
  console.log('App started');
});
