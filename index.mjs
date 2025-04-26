import path from "path";
import express from "express";
import os from "os";
import { exec } from "child_process";
import saveYoutubeToMp3 from "./saveYoutubeToMp3.mjs";
import { body, query, validationResult } from "express-validator";
import { fileURLToPath } from 'url';


const downloadsFolder = path.join(os.homedir(), 'Downloads', 'Youtube_MP3');
const serverDir = path.dirname(fileURLToPath(import.meta.url));
const indexHTMLpath = path.join(serverDir, 'website', 'index.html');
const app = express();

app.use(express.json());
app.use(express.static(path.join(serverDir, 'website')));


const youtubeRegex = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
const isValidYoutubeURL = [
  body('urls').isArray().withMessage('Please provide an array of URLs in Key "urls"'),
  //check if each url is url (.* means each element)
  body('urls.*').isURL().matches(youtubeRegex).withMessage('Invalid YouTube video URL').not().contains('list=').withMessage('Youtube Playlist URL is not supported in this API'),

]

//Sample url: localhost:3000/submit-urls
//body: {"urls": ["https://www.youtube.com/watch?v=VIDEO_ID1", "https://www.youtube.com/watch?v=VIDEO_ID2", "https://www.youtube.com/watch?v=VIDEO_ID3"]}
app.post('/submit-urls', isValidYoutubeURL, async (req, res) => {
  const youtubeUrls = req.body.urls;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  res.status(200).send('Download started for all URLs.');

  const errorUrls = [];
  for (const url of youtubeUrls) {
    const onError = (error) => errorUrls.push(url);
    await saveYoutubeToMp3({ url, downloadDir: downloadsFolder, onError });
    console.log(`✅ Downloaded ${youtubeUrls.indexOf(url) + 1}/${youtubeUrls.length}`);
  }

  if (errorUrls.length > 0) {
    console.log(`❌ Error downloading:\n${errorUrls.join('\n')}`);
  }

});



app.get('/', (req, res) => {
  //respond index.html
  res.sendFile(indexHTMLpath);
})
//Start server
app.listen(3000, () => {
  console.log('Server started on port 3000');
  console.log('Process ENV:', process.env.NODE_ENV);
  if (process.env.NODE_ENV !== 'development') {
    exec('open http://localhost:3000', (err) => {
      if (err) {
        console.error('Failed to open browser:', err);
      }
    });
  } else {
    console.log('Open http://localhost:3000 in your browser');
  }

});
