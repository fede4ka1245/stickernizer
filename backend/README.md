## Backend documentation
### Run in dev mode
* Make .env file with these vars:
```
WEB_APP_URL= //url where your web (backend) app is located
BOT_API_KEY= //api key from bot father
```
* Run commands:
```
npm i
npx nodemon index.js
```

### Description
Server to process stickers to webm format and send them to user

### API:
#### Endpoint: POST /upload-sticker
Move file to webm format to send it to the sticker bot as video sticker,
then sends new file to user!
#### Request Body:
* sticker: The sticker file to be uploaded.
* queryId: The identifier for the web app query.
#### Response:
* If successful, responds with "Sticker sent!"
* If unsuccessful, provides an appropriate error message