import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import path from 'path';

const app = express();

const basename = "/blog";
app.use(basename, express.static(path.join(__dirname, "/build")));
app.use(bodyParser.json());

const withDB = async (operations, res) => {
    try {
        const client = await MongoClient.connect("mongodb://localhost:27017", { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db("my-blog");

        await operations(db);

        client.close();
    }
    catch (error) {
        res.status(500).json({ message: "Error connecting to db", error });
    }
}

app.get(path.join(basename, "api/articles/:name"), async (req, res) => {
    withDB(async (db) => {
        const articleName = req.params.name;
        const articleInfo = await db.collection("articles").findOne({ name: articleName });
        res.status(200).json(articleInfo);
    }, res);
});

app.post(path.join(basename, 'api/articles/:name/upvote'), async (req, res) => {
    withDB(async (db) => {
        const articleName = req.params.name;
        const articleInfo = await db.collection("articles").findOne({ name: articleName });
        await db.collection("articles").updateOne({ name: articleName }, {
            "$set": {
                upvotes: articleInfo.upvotes + 1
            }
        });
        const updatedArticleInfo = await db.collection("articles").findOne({ name: articleName });
        res.status(200).json(updatedArticleInfo);
    }, res);
});

app.post(path.join(basename,'api/articles/:name/add-comment'), async (req, res) => {
    withDB(async (db) => {
        const articleName = req.params.name;
        const { username, text } = req.body;
        const articleInfo = await db.collection("articles").findOne({ name: articleName });
        await db.collection("articles").updateOne({ name: articleName }, {
            "$set": {
                comments: articleInfo.comments.concat({ username, text })
            }
        });
        const updatedArticleInfo = await db.collection("articles").findOne({ name: articleName });
        res.status(200).json(updatedArticleInfo);
    }, res);
});

app.get("*", (req, res) => {
    res.sendFile(path.join(path.join(__dirname + "/build/index.html")));
});

app.listen(8000, () => console.log('Listening on port 8000'));