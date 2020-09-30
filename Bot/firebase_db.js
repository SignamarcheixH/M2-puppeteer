const firebase = require('firebase-admin');

const config = require('./config/db_config.json');

firebase.initializeApp({
   credential: firebase.credential.cert(config),
   databaseUrl: "https://instascraper-8f251.firebaseio.com"
});

let database = firebase.database();

// const writeUserData = async (users) => {
//   const created_at = await new Date().getTime()
//   await database.ref('users/'+users['name']).set({
//     username: users['name'],
//     email: users['email'],
//     created_at: created_at
//   })
// }

// module.exports = {
//   writeUserData,
// }