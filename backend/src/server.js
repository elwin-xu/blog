import express from 'express';
import bodyParser from 'body-parser';

const articleInfo = {
    'learn-react': {
        upvotes: 0,
        comments: [],
    },
    'learn-node': {
        upvotes: 0,
        comments: [],
    },
    'my-thoughts-on-resumes': {
        upvotes: 0,
        comments: [],
    },
}

const app = express();

app.use(bodyParser.json());

app.get('/hello', (req, res) => res.send('Hello!'));
app.get('/hello/:name', (req, res) => res.send(`Hello ${req.params.name}`));

app.post('/hello', (req, res) => res.send(`Hello ${req.body.name}`));

app.post('/api/articles/:name/upvote', (req, res) => {
    const articleName = req.params.name;

    articleInfo[articleName].upvotes += 1;
    res.status(200).send(`${articleName} now has ${articleInfo[articleName].upvotes} upvotes`);
});

app.post('/api/articles/:name/add-comment', (req, res) => {
    const articleName = req.params.name;
    const { username, text } = req.body;
    articleInfo[articleName].comments.push({ username, text });
    res.status(200).send(articleInfo[articleName]);
});

app.listen(8000, () => console.log('Listening on port 8000'));