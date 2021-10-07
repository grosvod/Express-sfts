const express = require("express");
const path = require("path");
const app = express();
const cors = require('cors');




const sqlite3 = require("sqlite3").verbose();

app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use(express.json());


/*
const sql_create = `CREATE TABLE IF NOT EXISTS Admins (
  Admin_ID INTEGER PRIMARY KEY AUTOINCREMENT,
  Log VARCHAR(100) NOT NULL,
  Pass VARCHAR(100) NOT NULL,
  Token VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS Albums (
  Album_ID INTEGER PRIMARY KEY AUTOINCREMENT,
  Titre VARCHAR(100) NOT NULL,
  Date INTEGER NOT NULL,
  Description VARCHAR(500) NOT NULL,
  Stream VARCHAR(100) NOT NULL,
  Image VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS Bios (
  Bio_ID INTEGER PRIMARY KEY AUTOINCREMENT,
  Langue VARCHAR(100) NOT NULL,
  Text VARCHAR(1000) NOT NULL
);

CREATE TABLE IF NOT EXISTS Photos (
  Photo_ID INTEGER PRIMARY KEY AUTOINCREMENT,
  Source VARCHAR(100) NOT NULL,
  Alt VARCHAR(100) NOT NULL
  );

CREATE TABLE IF NOT EXISTS Tours (
  Tour_ID INTEGER PRIMARY KEY AUTOINCREMENT,
  Lieu VARCHAR(100) NOT NULL,
  Moment VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS Videos (
  Video_ID INTEGER PRIMARY KEY AUTOINCREMENT,
  Titre VARCHAR(100) NOT NULL,
  Embed VARCHAR(100) NOT NULL
);

`;*/




const db_name = path.join(__dirname, "data", "data.db");
const db = new sqlite3.Database(db_name, err => {
    if (err) {
        return console.error(err.message);
    }
    console.log("Connexion réussie à la base de données 'data.db'");
});

/*
*
* Getter de données
*
*/

app.get('/albums', (req, res) => {
    const sql = "SELECT * FROM Albums ORDER BY Date DESC";

    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.status(200).json(rows);
    });


});



app.get('/videos', (req, res) => {

    const sql = "SELECT * FROM Videos";

    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.status(200).json( rows);
    });


});



app.get('/login', (req, res) => {
    /*
        try {
            var user = await UserModel.findOne({ username: request.body.username }).exec();
            if(!user) {
                return response.status(400).send({ message: "The username does not exist" });
            }
    */
    res.send({
        token: 'test123'
    });
});



app.get('/tours', (req, res) => {

    const sql = "SELECT * FROM Tours";

    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.status(200).json( rows);
    });
});





app.get('/photos', (req, res) => {

    const sql = "SELECT * FROM Photos";

    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.status(200).json( rows);
    });
});



app.get('/bios', (req, res) => {

    const sql = "SELECT * FROM Bios";

    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.status(200).json( rows);
    });




});

/*
*
* Deletter de données
*
*/

app.get('/albums/delete/:id', (req, res, next) => {

    const sql = "DELETE FROM Albums where Album_ID = ?";
    var params = [req.params.id];

    db.get(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.status(200).json(rows);
    });


});

app.get('/videos/delete/:id', (req, res, next) => {

    const sql = "DELETE  FROM Videos where Video_ID = ?";
    var params = [req.params.id];

    db.get(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.status(200).json(rows);
    });


});


app.get('/tours/delete/:id', (req, res, next) => {

    const sql = "DELETE FROM Tours where Tour_ID = ?";
    var params = [req.params.id];

    db.get(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.status(200).json(rows);
    });


});

app.get('/photos/delete/:id', (req, res, next) => {

    const sql = "DELETE FROM Photos where photo_ID = ?";
    var params = [req.params.id];

    db.get(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.status(200).json(rows);
    });


});


app.get('/bios/delete/:id', (req, res, next) => {

    const sql = "DELETE FROM Bios where Bio_ID = ?";
    var params = [req.params.id];

    db.get(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.status(200).json(rows);
    });


});

/*
*
* Setter de données
*
*/

app.post('/videos/insert/', (req, res, next) => {
    console.log (req.body)

    var errors=[]
    if (!req.body.titre){
        errors.push("pas de titre");
    }
    if (!req.body.embed){
        errors.push("pas d'embed");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }

    var data = {
        titre: req.body.titre,
        embed: req.body.embed,
    }

    const sql = "INSERT INTO Videos (Titre, Embed) values (?, ?) ";
    var params = [data.titre, data.embed];

    db.run(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        console.log("datas insérés");

    });


});


app.post('/tours/insert/', (req, res, next) => {

    var errors=[]
    if (!req.body.lieu){
        errors.push("pas de titre");
    }
    if (!req.body.moment){
        errors.push("pas d'embed");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }

    var data = {
        lieu : req.body.lieu,
        moment : req.body.moment,
    }
    const sql = "INSERT INTO Tours (Lieu, Moment) values (?, ?)";
    var params = [data.lieu, data.moment, ];

    db.run(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        console.log("datas insérés");
    });


});

app.post('/photos/insert/', (req, res, next) => {

    var errors=[]
    if (!req.body.source){
        errors.push("pas de titre");
    }
    if (!req.body.alt){
        errors.push("pas d'embed");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }

    var data = {
        source: req.body.source,
        alt: req.body.alt,
    }

    const sql = "INSERT INTO  Photos (Source, Alt) values (?, ?)";
    var params = [data.source, data.alt];

    db.run(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        console.log("datas insérés");
    });


});


app.post('/bios/insert/', (req, res, next) => {

    var errors=[]
    if (!req.body.langue){
        errors.push("pas de titre");
    }
    if (!req.body.text){
        errors.push("pas d'embed");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }

    var data = {
        langue: req.body.langue,
        text: req.body.text,
    }


    const sql = "INSERT INTO Bios (Langue, Text) values (?, ?)";
    var params = [data.langue, data.text];

    db.run(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        console.log("datas insérés");
    });


});


app.post('/albums/insert/', (req, res, next) => {

    var errors=[]
    if (!req.body.titre){
        errors.push("pas de titre");
    }
    if (!req.body.date){
        errors.push("pas d'embed");
    }
    if (!req.body.description){
        errors.push("pas d'embed");
    }
    if (!req.body.stream){
        errors.push("pas d'embed");
    }
    if (!req.body.image){
        errors.push("pas d'embed");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }

    var data = {
        titre: req.body.titre,
        date: parseInt(req.body.date, 10),
        description: req.body.description,
        stream: req.body.stream,
        image: req.body.image,
    }

    const sql = "INSERT INTO  Albums (Titre, Date, Description, Stream, Image )  values (?, ?, ?, ?, ?)";
    var params = [data.titre, data.date, data.description, data.stream, data.image];

    db.run(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        console.log("datas insérés");
    });


});



/*
*
* Updater de données
*
*/

app.put('/videos/update/', (req, res, next) => {

    var errors=[]
    if (!req.body.titre){
        errors.push("pas de titre");
    }
    if (!req.body.embed){
        errors.push("pas d'embed");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }

    var data = {
        titre: req.body.titre,
        embed: req.body.embed,
        video_id : req.body.video_id
    }


    const sql = "UPDATE Videos SET Titre = ?, Embed = ? where Video_ID = ?";
    var params = [data.titre, data.embed, data.video_id];

    db.run(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        console.log("datas mises a jour")

    });


});


app.put('/tours/update/', (req, res, next) => {

    var errors=[]
    if (!req.body.lieu){
        errors.push("pas de titre");
    }
    if (!req.body.moment){
        errors.push("pas d'embed");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }

    var data = {
        lieu : req.body.lieu,
        moment : req.body.moment,
        tour_id : req.body.tour_id
    }

    const sql = "UPDATE Tours SET Lieu = ?, Moment = ? where Tour_ID = ?";
    var params = [data.lieu, data.moment, data.tour_id];

    db.run(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        console.log("datas mises a jour")
    });


});

app.put('/photos/update/', (req, res, next) => {

    var errors=[]
    if (!req.body.source){
        errors.push("pas de titre");
    }
    if (!req.body.alt){
        errors.push("pas d'embed");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }

    var data = {
        source: req.body.source,
        alt: req.body.alt,
        photo_id : req.body.photo_id
    }

    const sql = "UPDATE  Photos SET Source = ?, Alt = ? where photo_ID = ?";
    var params = [data.source, data.alt, data.photo_id];

    db.run(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        console.log("datas mises a jour")
    });


});


app.put('/bios/update/', (req, res, next) => {

    var errors=[]
    if (!req.body.langue){
        errors.push("pas de titre");
    }
    if (!req.body.text){
        errors.push("pas d'embed");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }

    var data = {
        langue: req.body.langue,
        text: req.body.text,
        bio_id : req.body.bio_id
    }

    const sql = "UPDATE Bios SET Langue = ?, Text = ? where Bio_ID = ?";
    var params = [data.langue, data.text, data.bio_id];

    db.run(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        console.log("datas mises a jour")
    });


});

app.post('/albums/update/', (req, res, next) => {

    var errors=[]
    if (!req.body.titre){
        errors.push("pas de titre");
    }
    if (!req.body.date){
        errors.push("pas d'embed");
    }
    if (!req.body.description){
        errors.push("pas d'embed");
    }
    if (!req.body.stream){
        errors.push("pas d'embed");
    }
    if (!req.body.image){
        errors.push("pas d'embed");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }

    var data = {
        titre: req.body.titre,
        date: req.body.date,
        description: req.body.description,
        stream: req.body.stream,
        image: req.body.image,
        album_id : req.body.album_id
    }

    const sql = "UPDATE  Albums SET Titre = ?, Date = ?, Description = ?, Stream = ?, Image = ? where Album_ID = ?";
    var params = [data.titre, data.date, data.description, data.stream, data.image, data.bio_id];

    db.run(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        console.log("datas mises a jour")
    });


});



app.listen(8080, () => {
    console.log("Serveur démarré (http://localhost:8080/) !");
});

app.get("/", (req, res) => {
    res.send("Bonjour le monde...");
});
