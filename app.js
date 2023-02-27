const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
const ejs = require('ejs');
app.set('view engine', 'ejs');
app.use("/styles", express.static('styles'))
let newItems = []//['Buy Food', 'Cook Food', 'Eat Food'];
app.get("/", function (req, res) {
    let today = new Date();
    let currentDay = today.getDay();

    let day = new Date().toLocaleString("en", { weekday: 'long', day: "2-digit", month: "long" });

    res.render("list", { kindOfDay: day, newListItem: newItems });
});

app.post('/', (req, res) => {
    let newItem = req.body.newItem;
    newItems.push(newItem)
    res.redirect('/')
})


app.listen(process.env.PORT || 3000, () => {
    console.log("Server running on port 3000!")
})