const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const fs = require('fs');
const path = require('path');

const schema = buildSchema(`
        type Image {
        filename: String!
        url: String!
    }
    
    type Query {
        images: [Image!]!
        image(filename: String!): String
    }
`);



const root = {
    images: () => {
        const uploadsDir = path.join(__dirname, 'uploads');
        const files = fs.readdirSync(uploadsDir);

        return files.map(filename => ({
            filename,
            url: `/uploads/${filename}`
        }));
    },
    image: ({ filename }) => {
        return `/uploads/${filename}`;
    }
};


module.exports = (app) => {
    app.use('/graphql', graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true,
    }));
};
