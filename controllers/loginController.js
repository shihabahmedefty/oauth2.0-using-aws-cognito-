const loginService = require('./../services/loginService');
const login = async (req, res) => {
    let login = loginService.login(req.body, function (err, result) {
        if (err)
            res.send(err)
        res.send({ token: result });
    })
}
module.exports = {
    login
}