const httpConfig = {
    port: 8000,
    allow_origin: "*",
    mediaroot: "./media",
};
  
const rtmpConfig = {
  port: 1935,
  chunk_size: 60000,
  gop_cache: true,
  ping: 10,
  ping_timeout: 60,
};
  
const transformationConfig = {
  ffmpeg: "./ffmpeg.exe",
  tasks: [
    {
      app: "live",
      hls: true,
      hlsFlags: "[hls_time=2:hls_list_size=3:hls_flags=delete_segments]",
      hlsKeep: false,
    },
  ],
  MediaRoot: "./media",
};
  
const config = {
  auth: {
    api : true,
    api_user: 'admin',
    api_pass: 'admin',
  },
  logType: 1,
  http: httpConfig,
  rtmp: rtmpConfig,
  trans: transformationConfig,
};

module.exports = { config }