# Discord Waitlist Queue Backend app

## Info

For more info - refer to the base project README

## Setup
- Config ENV variables
    - `export BOT_TOKEN=<Discord Bot token>` Can be found under Discord app page from the [developer portal](https://discord.com/developers/applications) -> Bot -> TOKEN field
    - `export SERVER_ID=<Discord target server id>` Easiest way to find out what's the server id: Go to the web page of the target server. Go the base page of the server - should look like this `https://discord.com/channels/<server id>` for example `https://discord.com/channels/4325423` - `4325423` is the server id
    - `export WAIT_ROOM_ID=<Wait list Discord channel id>` As with the server id - go to the web page of the target server. Go the target channel - should look like this `https://discord.com/channels/<server id>/<channel id>` for example `https://discord.com/channels/4325423/5345376` - `5345376` is the id of the target channel
    - `export INTERVIEW_ROOM_IDS=<channel1 id>,<channel1 id>,<and so on>` The channel ids can be obtained the same way as the wait room channel id
    - `export TARGET_ACCESS_ROLE_ID=<target role id>` The target Discord server role id of the role that people should have in order to access the app. Type `\@<Role name>` in chat and hit enter. For example `\@Staff` to get the id of `Staff` role. The result will be `<@&<Role id>>` for example `<@&1234>` where `1234` is the role id
    - `export JWT_SECRET=<jwt secret>` Jwt secret key - type some combination of characters
- `yarn install` Install dependencies
