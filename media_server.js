const User = require('./models/User');
const NodeMediaServer = require('node-media-server');
const { config } = require('./mediaServer/config');

const nms = new NodeMediaServer(config);

nms.on('prePublish', async (id, StreamPath, args) => {
    let stream_key = getStreamKeyFromStreamPath(StreamPath);
    try {
      const user = await User.findOne({ streamKey: stream_key });
      if (!user) {
        let session = nms.getSession(id);
        session.reject();
      }
    } catch (err) {
      console.error("Error finding user:", err);
    }
});

const getStreamKeyFromStreamPath = (path) => {
    let parts = path.split('/');
    return parts[parts.length - 1];
};

module.exports = nms;