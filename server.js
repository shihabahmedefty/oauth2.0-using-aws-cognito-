var app = require('./app');

var server = app.listen(process.env.PORT, function () {
    console.log(`Server is running on port ${process.env.PORT}`);
});