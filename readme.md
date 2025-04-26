# YoutubeAudioPump [YAP]
A simple GUI and server for [yt-dlp](https://github.com/yt-dlp/yt-dlp).
## How It Works
This project sets up a localhost server using Node.js and Express that allows you to download audio from YouTube videos through a local frontend site. The frontend provides a simple interface where you can submit YouTube URLs, and the server processes these requests to download the audio files as MP3s.

### Backend
- **Express Server**: The server is built using Express, a minimal and flexible Node.js web application framework. It handles incoming requests and responses.
- **URL Validation**: The server validates the submitted YouTube URLs to ensure they are well-formed and supported.
- **Audio Download**: The server uses the `yt-dlp` tool to download the audio from the specified YouTube videos and saves them in the designated `Downloads/Youtube_MP3` folder on your machine.

### Frontend
- **HTML Interface**: The frontend website is served statically and provides an HTML interface where users can enter YouTube URLs.
- **Submission Forms**: Users can submit single or multiple YouTube URLs through input fields and buttons.
- **API Response**: Feedback on the download status is displayed back to the user on the frontend.

### Workflow
1. Start the Express server on your local machine.
2. Open the frontend site in your browser.
3. Enter one or more YouTube URLs into the provided input fields.
4. Submit the URLs to initiate the download process.
5. The server processes each URL, downloads the audio, and stores it locally.
6. The frontend displays the status of each download attempt.

This setup provides a seamless way to convert YouTube videos to audio files using a simple local web interface.


## Requirements
- [yt-dlp](https://github.com/yt-dlp/yt-dlp) must be installed and in your PATH.

## Usage
1. Run the script
2. Enter the url of the video you want to download
3. Choose the quality and format of the video
4. Choose the path where you want to save the video
5. Click on "Download"

## Note
This is a simple GUI and does not support all the features of yt-dlp. For more advanced features, you should use the command line version of yt-dlp.
