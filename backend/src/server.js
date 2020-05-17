import express, { urlencoded } from 'express';
import bodyParser from 'body-parser';
import { MongoClient, ObjectID } from 'mongodb';
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
const upload = multer({ storage: storage, fileFilter: fileFilter });

const app = express();

const basename = "/";
app.use(basename, express.static(path.join(__dirname, "/build")));
app.use("/static", express.static(path.join(__dirname, "/static")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(upload.array());

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
        const articles = await db.collection("articles").find({}).sort({ date: -1 }).toArray();
        res.status(200).json(articles);
    }, res);
});

app.post(path.join(basename, "api/test"), async (req, res) => {
    withDB(async (db) => {
        console.log(req.body);
        res.sendStatus(200);
    }, res);
});


app.get(path.join(basename, "api/articles/:name"), async (req, res) => {
    withDB(async (db) => {
        const article = await db.collection("articles").findOne(
            {
                slugified: req.params.name
            }, {
            projection: {
                title: 1,
                slugified: 1,
                date: 1,
                description: 1,
                content: 1,
                cover: 1,
                likeCount: 1,
                likes: { "$elemMatch": { "$eq": req.query.uuid } },
                commentCount: 1,
                comments: 1
            }
        });
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
        const cover = req.file.path.substring(3);
        await db.collection('articles').insertOne({
            title: title,
            slugified: slugified,
            date: date,
            description: description,
            content: content,
            cover: cover,
            likeCount: 0,
            likes: [],
            commentCount: 0,
            comments: []
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

app.post(path.join(basename, 'api/articles/:name/like'), async (req, res) => {
    withDB(async (db) => {
        const uuid = req.body.uuid;
        await db.collection('articles').updateOne(
            {
                slugified: req.params.name,
                likes: { "$ne": uuid }
            },
            {
                "$inc": { likeCount: 1 },
                "$push": { likes: uuid }
            }
        );

        res.status(200).send("success")
    }, res);
});

app.post(path.join(basename, 'api/articles/:name/dislike'), async (req, res) => {
    withDB(async (db) => {
        const uuid = req.body.uuid;
        await db.collection('articles').updateOne(
            {
                slugified: req.params.name,
                likes: uuid
            },
            {
                "$inc": { likeCount: -1 },
                "$pull": { likes: uuid }
            }
        );

        res.status(200).send("success")
    }, res);
});

app.post(path.join(basename, 'api/articles/:name/add-comment'), async (req, res) => {
    withDB(async (db) => {
        await db.collection('articles').updateOne(
            {
                slugified: req.params.name
            },
            {
                "$inc": { commentCount: 1 },
                "$push": {
                    comments: {
                        _id: new ObjectID(),
                        name: req.body.name,
                        content: req.body.comment,
                        date: new Date(),
                        uuid: req.body.uuid,
                        likeCount: 0,
                        likes: [],
                        replies: []
                    }
                }
            }
        );

        const article = await db.collection('articles').findOne({ slugified: req.params.name });
        res.status(200).json(article.comments);
    }, res);
});

app.post(path.join(basename, 'api/articles/:name/edit-reply'), async (req, res) => {
    withDB(async (db) => {
        await db.collection('articles').updateOne(
            {
                slugified: req.params.name
            },
            {
                "$set": {
                    "comments.$[comment].replies.$[reply].content": "new content"
                }
            },
            {
                arrayFilters: [{ "comment.name": "Zixuan" }, {"reply.name": "Mike"}],
                upsert: true,
                multi: true
            }
        );

        // const article = await db.collection('articles').findOne({slugified: req.params.name});
        res.status(200).sendStatus(200);
    }, res);
});

app.post(path.join(basename, 'api/articles/:name/delete-reply'), async (req, res) => {
    withDB(async (db) => {
        await db.collection('articles').updateOne(
            {
                slugified: req.params.name
            },
            {
                "$inc": {commentCount: -1},
                "$pull": {
                    "comments.$[comment].replies": {_id: new ObjectID(req.body.replyID)}
                }
            },
            {
                arrayFilters: [{ "comment._id": new ObjectID(req.body.baseCommentID)}],
                upsert: true,
            }
        );

        const article = await db.collection('articles').findOne({slugified: req.params.name});
        res.status(200).json(article.comments);
    }, res);
});

app.post(path.join(basename, 'api/articles/:name/delete-comment'), async (req, res) => {
    withDB(async (db) => {
        const article0 = await db.collection('articles').findOne(
            {
                slugified: req.params.name
            },
            {
                projection: {
                    comments: { "$elemMatch": { _id: new ObjectID(req.body.baseCommentID) } },
                }
            }
        )

        const replies = article0.comments[0].replies.length

        await db.collection('articles').updateOne(
            {
                slugified: req.params.name
            },
            {
                "$inc": {commentCount: -1-replies},
                "$pull": {
                    "comments": {_id: new ObjectID(req.body.baseCommentID)}
                }
            }
        );

        const article = await db.collection('articles').findOne({slugified: req.params.name});
        res.status(200).json(article.comments);
    }, res);
});

app.post(path.join(basename, 'api/articles/:name/add-reply'), async (req, res) => {
    withDB(async (db) => {
        await db.collection('articles').updateOne(
            {
                slugified: req.params.name
            },
            {
                "$inc": { commentCount: 1 },
                "$push": {
                    "comments.$[comment].replies":{
                        _id: new ObjectID(),
                        name: req.body.name,
                        replyTo: req.body.replyTo,
                        date: new Date(),
                        content: req.body.comment,
                        uuid: req.body.uuid,
                        likeCount: 0,
                        likes: []
                    }
                }
            },
            {
                arrayFilters: [{ "comment._id": new ObjectID(req.body.baseCommentID)}],
                upsert: true
            }
        );

        const article = await db.collection('articles').findOne({slugified: req.params.name});
        res.status(200).json(article.comments)
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

app.get("*", (req, res) => {
    res.sendFile(path.join(path.join(__dirname + "/build/index.html")));
});

app.listen(8000, () => console.log('Listening on port 8000'));