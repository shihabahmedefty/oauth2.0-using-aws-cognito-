const registerService = require('./../services/registerService');
exports.register = async function (req, res) {
    const user = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        companyName: req.body.companyName,
        mc: req.body.mc,
        address: req.body.address
    }
    let register = await registerService.register(user)
    if (register.err)
        return res.send(register.err);
    return res.send(register);
}