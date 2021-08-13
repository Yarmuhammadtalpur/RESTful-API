const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Articles = require('./modules/data');
const port = 5000;

const url = 'mongodb://localhost:27017/wikiDB';

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("Mongoose is connected and started");
})

app.set("view engine", "ejs");
app.use("/public", express.static(__dirname + "/public"))
app.use(express.urlencoded({
    extended: true
}))


app.listen(port, (req, res) => {
    console.log("your server is running port " + port)
});


app.route("/articles")
    
    .get((req, res) => {

    Articles.find({}, (err, foundItem) => {
        if (err) {
            console.log(err);
        } else {
            res.send(foundItem)
            // res.render("index", {
            //     articles: foundItem
            // })
        }
    });


    // app.get("/articles/compose", (req, res)=>{

    //     // res.render("compose");
})

    .post((req, res) => {

    const addArticle = new Articles({
        title: req.body.title,
        content: req.body.content
    })

    addArticle.save((err) => {
        if (!err) {
            res.send("file successfully added to database ");
        } else {
            res.send(err);
        }
    });
    //  res.redirect("/articles")

    })

    .delete((req, res) => {
    Articles.deleteMany((err) => {
        if (!err) res.send("All articles deleted successfully, ");
        else res.send(err);
        })
    });

app.route("/articles/:route")

    .get((req, res)=>{
        const articleTitle = req.params.route;

    Articles.findOne({title: articleTitle}, (err, fountArticle)=>{
        if(fountArticle) res.send(fountArticle);
            else res.send("Sorry., Not found.. "+err);
    })

    })

    .put((req, res)=>{
        const articleTitle = req.params.route;
                        //what artice to update     What content to update or replace
                        //         ||                              ||
        Articles.update({title: articleTitle}, {title: req.body.title, content: req.body.content},
            {overwrite: true}, (err)=>{
            if(!err) res.send("file Successfully updated, ");
                else res.send("faild no matching articel Found.,, "+err);
        })

    })

    .patch((req, res)=>{
        const articleTitle = req.params.route;

            Articles.update({title: articleTitle}, {$set: req.body }, (err)=>{
                if(!err)    res.send("article successfully Patched: ");
                    else res.send("failed"+err)
            } )

    })

    .delete((req, res)=>{
        const articleTitle = req.params.route;

        Articles.deleteOne({title: articleTitle}, (err)=>{
            if(err) res.send("failed Item cant be deleted"+err);
                else res.send("Item Successfully Deleted");
        })
    })