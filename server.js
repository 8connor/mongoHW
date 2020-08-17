var express = require("express");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");

var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");
var PORT = process.env.PORT || 3000;

var app = express();

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
  })
);

app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

console.log(process.argv[2]);

if (process.argv[2] === "local") {
  mongoose.connect("mongodb://localhost:27017/scrapeDb", {
    useNewUrlParser: true,
  });
} else {
  mongoose.connect(
    "mongodb://8connor:conrad1@ds125556.mlab.com:25556/heroku_95gsj4c7",
    { useNewUrlParser: true }
  );
}

// =================================================================================
// ROUTES
// =================================================================================

var articles = [];

// A GET route for scraping the Slippedisc website
app.get("/scrape", function (req, res) {
  // First, we grab the body of the html with axios
  axios.get("http://www.slippedisc.com/").then(function (response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);

    ($body = $(response.data)), ($articles = $body.find("article"));

    $articles.each(function (i, element) {
      // Save an empty result object
      var result = {};
      // Add the data
      var $a = $(element).children("a"),
        $title = $(element).find("h3").text(),
        $img = $(element).find("img"),
        $summary = $(element).find("p").text();

      result.items = {
        href: $a.attr("href"),
        title: $title.trim(),
        img: $img.attr("src"),
        summary: $summary.trim(),
      };
      // Create a new Article using the `result` object built from scraping
      db.Article.create(result.items)
        .then(function (dbArticle) {
          // View the added result in the console
          console.log("Added to DB:");
          console.log(dbArticle);
          articles.push(dbArticle);
        })
        .catch(function (err) {
          // If an error occurred, log it
          console.log(err);
        });
    });
    res.json("hello");
  });
});

app.get("/", function (req, res) {
  db.Article.find({})
    .lean()
    .then(function (data) {
      res.render("index", {
        articleList: data,
      });
    })
    .catch((error) => console.log(error));
});

app.get("/delete", function (req, res) {
  mongoose.connection.db
    .dropCollection("articles")
    .then(function (data) {
      console.log("made it here");
      res.json(data);
    })
    .catch((error) => console.log(error));
});

app.post("/api/saved", function (req, res) {
  console.log(req.body);

  db.Article.updateMany(
    {
      _id: req.body.artNum,
    },
    { isSaved: true }
  )
    .lean()
    .then((data) => res.json(data));
});

app.get("/saved", function (res, res) {
  db.Article.find({ isSaved: true })
    .lean()
    .then(function (data) {
      res.render("saved", {
        data: data
      });
    });
});

// Start the server
app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});
