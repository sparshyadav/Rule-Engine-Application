const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConnect = require("./util/dbConnect.js");
const rulesRoutes = require("./routes/rules.js");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/rules', rulesRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    dbConnect();
})

