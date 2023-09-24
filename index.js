const BodyParser = require("body-parser");
const express = require('express');
const categoryRouter = require('./routers/categoryRouter');
const imageRouter = require('./routers/imageRouter')
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5001;
const graphqlSetup = require('./graphqlSetup')
const productRouter = require('./routers/productRouter')
const productImageRouter = require('./routers/ProductImageRouter')
const newsRouter = require('./routers/newsRouter')
const fileManager = require('./controlles/fileManager')

const app = express();
app.use(cors())
app.use(express.json());

app.use('/categories', categoryRouter);
app.use('/uploads', express.static('uploads'));
app.use('/images', imageRouter);
app.use('/api/products', productRouter);
app.use('/images/products', productImageRouter);
app.use('/news', newsRouter);
app.use('/api/filemanager', fileManager);
app.use(BodyParser.json());
// Настройка GraphQL
graphqlSetup(app);

const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://migu93:EneOEztnO334d@cluster0.hgueytq.mongodb.net/npo-web-sale-backend?retryWrites=true&w=majority`)
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    }
    catch (e) {
        console.log(e)
    }
}
start()