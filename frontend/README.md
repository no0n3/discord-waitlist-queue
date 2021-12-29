# Discord Waitlist Queue Frontend App

## Env

- `node v16.6.0`
- `npm 7.19.1`

## Info

For more info - refer to the base project README

## Setup
- Config ENV variables
    - `export REACT_APP_ENDPOINT=<backend base endpoint>` Example for localhost: `http://localhost:4000`
    - `export REACT_APP_WS_ENDPOINT=ws://<backend domain>/ws` Example for localhost: `ws://localhost:4000/ws`
    - `export REACT_APP_DISCORD_CLIENT_ID=<Discord app client id>` Client ID of the created Discord up. Can be found at app page -> General Info 
    - `export REACT_APP_DISCORD_CALLBACK_URL=<frontend app url>` Example for localhost: `http://localhost:3000`
- `yarn install` Install dependencies

## Run app

### Dev
- `yarn start` starts the app on `http://localhost:3000`
### Prod
- `yarn run build:prod` build the app in `build` folder
- Serve the content of the `build` folder. For example `http-server build/` (you probably won't use this for prod) - starts the app on `http://localhost:8080` by default.
