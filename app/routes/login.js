module.exports = (app, model) => {
    app.get("/login/:email/:name/:img", (req, res) => {
        model.findOne({ sub: req.params.sub }, (err, item) => {
            if (item === null) {
                var user = {
                    email: req.params.email,
                    name: req.params.name,
                    img: req.params.img,
                };

                //console.log(req);

                model.create(user, (err, item) => {
                    res.send("User is created");
                });
            } else {
                res.send(item.blocked);
            }
        });
    });
}