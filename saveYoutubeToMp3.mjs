import { exec, spawn } from 'child_process';
import fs from 'fs';


/**
 * Downloads a YouTube video as an MP3 file.
 * @param {string} url The URL of the YouTube video or playlist.
 * @param {string} downloadDir The directory where the MP3 file should be saved.
 * @param {function} onError A callback function that will be called if there is an error.
 * @param {boolean} [isPlaylist=false] Whether the URL is a YouTube playlist.
 * @returns {Promise<void>}
 */
function saveYoutubeToMp3({ url, downloadDir, onError, isPlaylist = false } = {}) {


    //Ensure the download directory exists
    if (!fs.existsSync(downloadDir)) {
        fs.mkdirSync(downloadDir);
    }

    // Construct yt-dlp command to download best audio
    // -f: format (best audio)
    // -x: extract audio
    // --audio-format mp3: convert to mp3 format
    // -o: output file pattern
    const command = `yt-dlp -f bestaudio -x --audio-format mp3 -o "${downloadDir}/%(title)s.%(ext)s" "${url}"`;
    if (isPlaylist) {
        console.log("⬇️ Downloading playlist:", url);
    } else {
        console.log("⬇️ Downloading audio:", url);
    }
    // console.log("Command:", command);//! Remove on stable
    return new Promise((resolve, reject) => {
        try {
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.error(`❌ Error: ${error.message}`);
                    onError(error.message);
                    reject(error);
                }
                if (stderr) {
                    console.warn(`⚠️ stderr: ${stderr}`);
                }
                if (isPlaylist) {
                    console.log("✅ Playlist downloaded successfully!");
                } else {
                    console.log("✅ Audio downloaded successfully!");
                }
                // console.log(stdout);
                resolve();
            });

        }
        catch (e) {
            console.log(e);
        }
    }
    );

}

export default saveYoutubeToMp3;

