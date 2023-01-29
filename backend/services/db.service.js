const MongoClient = require('mongodb').MongoClient

const config = require('../config')
const logger = require('./logger.service')

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: config.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
module.exports = {
    getCollection,
    getBoardScript,
    getImgFromDal
}

var dbConn = null

async function getCollection(collectionName) {
    try {
        const db = await connect()
        const collection = await db.collection(collectionName)
        return collection
    } catch (err) {
        logger.error('Failed to get Mongo collection', err)
        throw err
    }
}

async function connect() {
    if (dbConn) return dbConn
    try {
        const client = await MongoClient.connect(config.dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
        const db = client.db(config.dbName)
        dbConn = db
        return db
    } catch (err) {
        logger.error('Cannot Connect to DB', err)
        throw err
    }
}
async function getBoardScript(prompt) {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `make me a trello board for a ${prompt} project with detailed tasks for each column, each column headline should be presented with only one dollar sign  infront of it, and each task should be presented with only one infinity symbol infront of it`,
        temperature: 0.7,
        max_tokens: 160,
        top_p: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0.6,
        stop: [" Human:", " AI:"],
    });
    return response.data.choices[0].text
}

async function getImgFromDal(prompt) {
    console.log('prompt: ', prompt);
    const response = await openai.createImage({
        prompt: `${prompt}`,
        n: 1,
        size: "1024x1024",
    });
    image_url = response.data.data[0].url;
    console.log('image_url: ', image_url);
    return image_url

}
