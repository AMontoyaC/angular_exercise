var User = require('./models/user');

function getUsers(res) {
    User.find(function (err, users) {
        if (err) {
            return res.send(err);
        }
        
        res.json(users);
    });
};

module.exports = function (app) {
    // get all
    app.get('/api/users/:parameter', function (req, res) {
        const val_parameter = (req.params.parameter == 'true');
        if(val_parameter){
            getUsers(res); 
        }else{
            return res.status(404).send({
                success: 'false',
                message: 'User tables not available',
            });
        }
    });

    //get by name
    app.get('/api/users/name/:name', function (req, res) {
        User.find({name: req.params.name},function (err, users) {
            if (err || users.length == 0) {
                return res.status(404).send({
                    success: 'false',
                    message: 'User does not exist',
                });
            }else{
                res.status(200);
                res.json(users);
            }
        });
    });

    //get by username
    app.get('/api/users/username/:username', function (req, res) {
        User.find({username: req.params.username},function (err, users) {
            if (err || users.length == 0) {
                return res.status(404).send({
                    success: 'false',
                    message: 'User does not exist',
                });
            }else{
                res.status(200);
                res.json(users);
            }
        });
    });
    
    //get by status
    app.get('/api/users/status/:status', function (req, res) {
        User.find({status: req.params.status},function (err, users) {
            if (err || users.length == 0) {
                return res.status(404).send({
                    success: 'false',
                    message: 'No users with that status',
                });
            }else{
                res.status(200);
                res.json(users);
            }
        });
    });

    app.post('/api/addUser', function (req, res) {
        User.create({
            name: req.body.name,
            username: req.body.username,
            status: req.body.status,
        }, function (err) {
            if (err)
                res.send(err);

            getUsers(res);
        });

    });

    
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html');
    });
};
