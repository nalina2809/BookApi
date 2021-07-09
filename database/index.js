let books =[{
    ISBN: "12345ONE",
    title: "Getting started with MERN",
    authors: [1, 2],
    language: "en",
    pubDate: "2021-08-14",
    numOfPage: 225,
    category: ["fiction", "programming","tech", "webdev"],
    publication: 1,
},
{
    ISBN: "12345two",
    title: "Getting started with Phython",
    authors: [1, 2],
    language: "en",
    pubDate: "2021-08-14",
    numOfPage: 225,
    category: ["fiction", "programming","tech", "webdev"],
    publication: 1,
},
];

const authors = [
    {
    id: 1,
    name: "pavan",
    books: ["12345ONE"],
},
{
    id: 2,
    name: "nalina",
    books: ["12345ONE"],
},
];


const publications =[{
    id: 1,
    name:"Chakra",
    books: ["12345ONE"],

    id: 2,
    name: "Vickie",
    books: []
},
];

module.exports ={ books,authors,publications};
