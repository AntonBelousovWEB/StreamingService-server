const User = require('./models/User');
const NodeMediaServer = require('node-media-server');
const { config } = require('./mediaServer/config');

const nms = new NodeMediaServer(config);

nms.on('prePublish', async (id, StreamPath, args) => {
    let stream_key = getStreamKeyFromStreamPath(StreamPath);
    console.log('[NodeEvent on prePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);

    try {
        const user = await User.findOne({ stream_key: stream_key }).exec();
        if (!user) {
            let session = nms.getSession(id);
            session.reject();
        }
    } catch (err) {
        console.error("Error while querying user:", err);
    }
});

const getStreamKeyFromStreamPath = (path) => {
    let parts = path.split('/');
    return parts[parts.length - 1];
};

module.exports = nms;