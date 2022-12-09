const registerService = require('./../services/registerService');
exports.register = async function (req, res) {

    let register = await registerService.register({ username: req.body.username, password: req.body.password, email: req.body.email })
    if (register.err)
        return res.send(register.err);
    return res.send(register);
}