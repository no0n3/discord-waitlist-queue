# Discord Waitlist Queue Frontend App

## Info

For more info - refer to the base project README

## Setup
- Config ENV variables
    - `export REACT_APP_ENDPOINT=<backend base endpoint>` Example for localhost: `http://localhost:4000`
    - `export REACT_APP_WS_ENDPOINT=ws://<backend domain>/ws` Example for localhost: `ws://localhost:4000/ws`
    - `export REACT_APP_DISCORD_CLIENT_ID=<Discord app client id>` Client ID of the created Discord up. Can be found at app page -> General Info 
    - `export REACT_APP_DISCORD_CALLBACK_URL=<frontend app url>` Example for localhost: `http://localhost:3000`
- `yarn install` Install dependencies
- `yarn start`
