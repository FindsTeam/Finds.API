module.exports = (app, model) => {
    app.get("/login/:sub/:nickname/:name", (req, res) => {
        model.findOne({ sub: req.params.sub }, (err, item) => {
            if (item === null) {
                var user = {
                    sub: req.params.sub,
                    nickname: req.params.nickname,
                    name: req.params.name,
                    blocked: false
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