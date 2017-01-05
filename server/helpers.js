var neo4j = require('neo4j-driver').v1;
var driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', '12345'));
var session = driver.session();

var userDoesExist = function(userID) {
  session.run (
      'MATCH (u:User) \
      WHERE u.id = {userID} \
      RETURN u',
      {userID: userID}
    ) //('MATCH (n {id: {userID}}) DETACH DELETE n')
    .then(result => {
      session.close();
      if (result) {
        return true;
      } else {
        return false;
      }
    })
    .catch(error => {
      session.close();
      console.log(error);
      return false
    });
}

exports.userDoesExist = userDoesExist;