const { limitCount } = require('../lib/settings');
const { User } = require('./model');

    async function addUser(username, password, apikey) {
        let obj = { username, password, apikey, defaultKey: apikey, premium: [], limit: limitCount };
        User.create(obj);
    }
    module.exports.addUser = addUser

    async function checkUsername(username) {
        let users = await User.findOne({username: username});
        if(users !== null) {
            return users.username;
        } else {
            return false;
        }
    }
    module.exports.checkUsername = checkUsername;

    async function addLimit(apikey) {
      let apiKey = await User.findOne({ apikey })
      if (apikey) {
        User.updateOne(
          { apikey: apiKey.apikey },
          {
            $set: {
              limit: apiKey.limit - 1
            }
          }
        )
        .then(() => { return true })
        .catch((e) => { return console.log(e) })
      } else {
        return false
      }
    }
    module.exports.addLimit = addLimit

    async function getApikey(id) {
        let users = await User.findOne({_id: id});
        return {apikey: users.apikey, username: users.username};
    }
    module.exports.getApikey = getApikey;

    async function cekKey(apikey) {
        let db = await User.findOne({apikey: apikey});
        if(db === null) {
            return false;
        } else {
            return db;
        }
    }
    module.exports.cekKey = cekKey;