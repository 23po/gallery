var config = {}

// Update to have your correct username and password
config.mongoURI = {
    //production: 'mongodb+srv://calvinkodalo:eSEht3QWnM8FwVNe@gallery.wc344.mongodb.net/darkroom?retryWrites=true&w=majority',
    //development: 'mongodb+srv://calvinkodalo:eSEht3QWnM8FwVNe@gallery.wc344.mongodb.net/darkroom-dev?retryWrites=true&w=majority',
    //test: 'mongodb+srv://calvinkodalo:eSEht3QWnM8FwVNe@gallery.wc344.mongodb.net/darkroom-test?retryWrites=true&w=majority',
    production: 'mongodb+srv://calvinkodalo:eSEht3QWnM8FwVNe@cluster0.8b4tjou.mongodb.net/?retryWrites=true&w=majority&appName=darkroom',
    development: 'mongodb+srv://calvinkodalo:eSEht3QWnM8FwVNe@cluster0.8b4tjou.mongodb.net/?retryWrites=true&w=majority&appName=darkroom-dev',
    test: 'mongodb+srv://calvinkodalo:eSEht3QWnM8FwVNe@cluster0.8b4tjou.mongodb.net/?retryWrites=true&w=majority&appName=darkroom-test'

}
module.exports = config;
