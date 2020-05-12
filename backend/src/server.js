import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import path from 'path';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: 'src/static',
    filename: (req, file, callback) => {
        callback(null, new Date().toISOString() + file.originalname);
    }
})

const fileFilter = (req, file, callback) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        callback(null, true)
    } else {
        callback(null, false)
    }
}
const upload = multer({storage: storage ,fileFilter: fileFilter});

const app = express();

const basename = "/";
app.use(basename, express.static(path.join(__dirname, "/build")));
app.use("/static", express.static(path.join(__dirname, "/static")));
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


app.get(path.join(basename, "api/articles"), async (req, res) => {
    withDB(async (db) => {
        const articles = await db.collection("articles").find({}).sort({date: -1}).toArray();
        res.status(200).json(articles);
    }, res);
});

app.get(path.join(basename, "api/articles/:name"), async (req, res) => {
    withDB(async (db) => {
        const articleName = req.params.name;
        const article = await db.collection("articles").findOne({ slugified: articleName });
        res.status(200).json(article);
    }, res);
});

app.post(path.join(basename, 'api/articles'), upload.single('cover'), async (req, res) => {
    withDB(async (db) => {
        const title = req.body.title;
        const slugified = req.body.slugified;
        const date = req.body.date;
        const description = req.body.description;
        const content = req.body.content;
        const cover = req.file.path.substring(4);
        await db.collection('articles').insertOne({
            title: title,
            slugified: slugified,
            date: date,
            description: description,
            content: content,
            cover: cover
        }); 

        res.sendStatus(200);
    }, res);
});

app.delete(path.join(basename, "api/articles/delete/:name"), async (req, res) => {
    withDB(async (db) => {
        const article = await db.collection("articles").deleteOne({ slugified: req.params.name });
        res.status(200).send('success');
    }, res);
});

app.put(path.join(basename, 'api/articles/edit/:name'), async (req, res) => {
    withDB(async (db) => {
        const title = req.body.title;
        const slugified = req.body.slugified;
        const description = req.body.description;
        const content = req.body.content;
        await db.collection('articles').updateOne({ slugified: req.params.name }, {
            "$set": {
                title: title,
                slugified: slugified,
                description: description,
                content: content
            }
        });

        res.status(200).send("success")
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

app.post(path.join(basename, 'api/articles/:name/add-comment'), async (req, res) => {
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

app.get(path.join(basename, "api/test"), async (req, res) => {
    // const articleName = req.params.name;
    // const articleInfo = await db.collection("articles").findOne({ name: articleName });
    res.status(200).json({ a1: "1", a2: "2" });
});

app.get("*", (req, res) => {
    res.sendFile(path.join(path.join(__dirname + "/build/index.html")));
});

app.listen(8000, () => console.log('Listening on port 8000'));