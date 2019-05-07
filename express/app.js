const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
/****** Configuration *****/
const port = (process.env.PORT || 8080);
const path = require("path");
app.use(express.static(path.join(__dirname, '../build')));
app.get('/api', function (req, res) {
    const index = path.join(__dirname, '../build', 'index.html');
    res.sendFile(index);
});
// Additional headers to avoid triggering CORS security errors in the browser
// Read more: https://en.wikipedia.org/wiki/Cross-origin_resource_sharing
app.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Origin",
        "https://mandatoryassigment.herokuapp.com/api"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

/****** Data *****/
let mongoose = require('mongoose');
mongoose.connect('mongodb://heroku_fw5mzzmh:9ct9vpssm13ldgko7t458h77t4@ds147946.mlab.com:47946/heroku_fw5mzzmh');

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
});
let questionSchema = new mongoose.Schema ({
    title: String,
    description: String,
    answers: [{
        text: String,
        ranking: Number,}]
});

let Questions = new mongoose.model('Questions', questionSchema);


/****** Helper functions *****/
function getQuestionFromId(id) {
    return questions.find((elm) => elm.id === Number(id));
}

function filterByTopic(topic) {
    return questions.filter((elm) => elm.topic.includes(topic))
}
function findNextId() {
    const reducer = (acc, curr) => Math.max(acc, curr);
    let nextId = data.map(el => el.id).reduce(reducer) + 1;
    return nextId;
}

app.get('/api/questions', (req, res) => {
    Questions.find((err, questions)=>{
        res.json(questions);
    });
});


app.get('/api/questions/:id', (req, res) => {
    Questions.find({id: req.params.id}, (err, questions) =>{
        res.json(questions)
    });
});

app.post('/api/questions', (req, res) => {
        let newQuestion = req.body;
        // newQuestion.id = findNextId();
        let question = new Questions ({
            title: newQuestion.title,
            description: newQuestion.description,
            answers:newQuestion.answers
        });
        question.save();
        res.json({ msg: `You have posted new question`, question: newQuestion});
});
app.put('/api/questions/:id/answers', (req, res) => {
    let newAnswer = req.body;
    // newQuestion.id = findNextId()
    // let questions = new Questions({
    //     answers: [{ text: newAnswer.answer}],
    //     id: newAnswer.originalPostId,
    // });
Questions.findOneAndUpdate({_id: newAnswer.originalPostId}, {$push:{'answers':{"text":newAnswer.answer,"ranking":0}}}, {new: true}, (err,question) => {
        if (err) {
            res.send(err);
        }
        res.json(question);
    })
});
app.put('/api/questions/:id/rating', (req, res) => {
    let newRating = req.body;
    let rankingIncrease = newRating.ranking+1;
        Questions.findOneAndUpdate({_id: newRating.originalPostId, "answers._id": newRating.originalAnswerId }, {'$set': {$elemMatch:newRating.originalPostId,"answers.$":[{$elemMatch:newRating.originalAnswerId, text:newRating.text, ranking: rankingIncrease}]}}, {new: true}, (err,question) => {
        if (err) {
            res.send(err);
        }
        res.json(question);
    })

});

app.put('/api/questions/:id', (req, res)=>{
    res.json(getQuestionFromId(req.params.id));
});

app.listen(port, () => console.log(`Question API running on port ${port}!`));
