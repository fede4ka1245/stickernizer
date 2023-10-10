import dotenv from "dotenv";
import express from "express";
import TelegramBot from 'node-telegram-bot-api';
import {nanoid} from "nanoid";
import cors from "cors";
import fileUpload from 'express-fileupload';
import ffmpegStatic from 'ffmpeg-static';
import ffmpeg from 'fluent-ffmpeg';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from "fs";
// import ytdl from 'ytdl-core';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();
ffmpeg.setFfmpegPath(ffmpegStatic);

const processImage = (input, output) => {
  return new Promise((resolve, reject) => {
    ffmpeg()
      .input(input)
      .outputOptions(
        '-c:v', 'libvpx-vp9',
        '-crf', '30',
        '-b:v', '0',
        '-b:a', '128k',
        '-c:a', 'libopus'
      )
      .saveToFile(output)
      .on('end', () => {
        resolve(output);
      })
  })
}

const token = process.env.BOT_API_KEY;
const bot = new TelegramBot(token, {polling: true});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'hey', {
    reply_markup: {
      inline_keyboard: [
        [{web_app: { url: process.env.WEB_APP_URL }, text: 'Open Stickernizer' }],
      ]
    }
  });
});

const app = express();
const router = express.Router();

app.use(cors());
app.use(router);
app.use(express.json());
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
  dir: '/stickers'
}));
app.use('/stickers', express.static('stickers'));


app.post('/upload-sticker', async (req, res) => {
  try {
    if (!req.files?.sticker) {
      return res.status(400).send('No files were uploaded.');
    }

    const webAppQuery = req.body.queryId;
    const file = req.files.sticker;
    const input = `/stickers/${nanoid()}-input.webm`;
    const output = `/stickers/${nanoid()}.webm`;

    await file.mv(__dirname + input);
    await processImage(__dirname + input, __dirname + output);

    await bot.answerWebAppQuery(webAppQuery, {
      type: 'document',
      id: nanoid(),
      title: 'Sticker',
      document_url: req.protocol + '://' + req.hostname + output,
      mime_type: 'application/zip'
    });
    fs.unlink(__dirname + input, function(err) {
      if(err && err.code == 'ENOENT') {
        // file doens't exist
        console.info("File doesn't exist, won't remove it.");
      } else if (err) {
        // other errors, e.g. maybe we don't have enough permission
        console.error("Error occurred while trying to remove file");
      } else {
        console.info(`removed`);
      }
    });
    fs.unlink(__dirname + output, function(err) {
      if(err && err.code == 'ENOENT') {
        // file doens't exist
        console.info("File doesn't exist, won't remove it.");
      } else if (err) {
        // other errors, e.g. maybe we don't have enough permission
        console.error("Error occurred while trying to remove file");
      } else {
        console.info(`removed`);
      }
    });

    res.send('File uploaded!');
  } catch {
    res.status(500).send('uncaught server error')
  }
})

// app.post('/download-clip', async (req, res) => {
//   try {
//     const file = __dirname + `/youtube-clips/${nanoid()}.mp4`
//     const url = req.body.url;
//
//     if (!url) {
//       return res.status(400).send('No url was provided.');
//     }
//
//     const stream = fs.createWriteStream(file);
//     ytdl(url, { quality: 'lowestvideo', filter: format => format.hasAudio === false }).pipe(stream);
//
//     stream.on('finish', async () => {
//       res.sendFile(file);
//       setTimeout(() => {
//         fs.unlink(file, function(err) {
//           if(err && err.code == 'ENOENT') {
//             // file doens't exist
//             console.info("File doesn't exist, won't remove it.");
//           } else if (err) {
//             // other errors, e.g. maybe we don't have enough permission
//             console.error("Error occurred while trying to remove file");
//           } else {
//             console.info(`removed`);
//           }
//         });
//       }, 20000)
//     })
//   } catch {
//     res.status(500).send('uncaught server error')
//   }
// })
//
app.listen(3030);