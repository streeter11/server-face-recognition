const Clarifai = require("clarifai");
const API_KEY = process.env.API_KEY;

const app = new Clarifai.App({
  apiKey: API_KEY
});

const handleApiCall = (req, res) => {
  app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.entry)
  .then(data => {
    res.json(data);
  })
  .catch(err => console.log(data));
}
// res.status(400).json("Unable to fetch")
const handleImagePost = (req, res, db) => {
const { id } = req.body;
  db("users").where({id})
    .increment("entries", 1)
    .returning("entries")
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json("Unable to obtain entry count")
    )
}
module.exports = { handleImagePost, handleApiCall };