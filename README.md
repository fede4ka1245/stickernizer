# Stickernizer

### About

Telegram web app to make sticker right in telegram, app makes video 
and send it to user in the required format by video sticker!

### Start the project

* Make sure that is docker installed. See docker docs: https://docs.docker.com/
* Make .env file in the root of repository and set these vars:
```
//server configuration
WEB_APP_URL= //url where your web (backend) app is located
BOT_API_KEY= //api key from bot father

//frontend configuration
REACT_APP_API_URL= //url where your bot (backend) is located
REACT_APP_ABOUT_LINK= //Optional. The link with article (or smth) where you describe your bot.
```
* Up docker container
```
docker compose up -d
```

### Backend documentation
Locates in /backend/README.md

### Web app documentation
Locates in /frontend/README.md