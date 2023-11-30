// jwt 도입시 사용 예정

const redis = require('redis');
const { REDIS_PASSWORD, REDIS_HOST, REDIS_PORT } = require('../config');
const logger = require('../loaders/logger');
const redisClient = redis.createClient({
  socket: {
    host: REDIS_HOST,
    port: REDIS_PORT,
  },
  password: REDIS_PASSWORD,
  legacyMode: true,
});
redisClient.on('connect', () => logger.info('Connected to Redis'));
redisClient.on('error', (err) => console.error('Redis Client Error' + err));
redisClient.connect().then();

const redisCli = redisClient.v4;

module.exports = redisCli;
