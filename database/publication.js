const mongoose = require("mongoose");

//Publication schema
const PublicationSchema = mongoose.Schema({
    id: Number,
    name: String,
    books: [String],
});


// Publicationmodel
const PublicationModel = mongoose.model(PublicationSchema);

model.exports = PublicationModel;