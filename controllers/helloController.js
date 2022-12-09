
const simple_hello = async (req, res) => {
    res.send({ result: "Hello from our node server" });
};
module.exports = {
    simple_hello
}