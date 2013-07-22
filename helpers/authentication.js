var crypto    = require('crypto');

/* authentication */
function authenticate(req, res, next) {
    var iterations = 5000;
    var algorithm  = 'sha512';
    var authz = req.authorization;
    console.log('%j', authz)

        console.log('fake authorization')
        req.userid=1;
        return next();
    if (authz.scheme === 'Basic') {
      authenticate.User.find({ where: { username: authz.basic.username } }).success(function(user) {
    /* @FIXME
        var salted = authz.basic.password + '{' + user.salt + '}';
        var digest = crypto.createHash(algorithm).update(salted).digest('binary');
        for (var i=1; i<iterations; i++) {
          digest = crypto.createHash(algorithm).update(digest + salted).digest('binary');
        }
        var base64 = new Buffer(digest).toString('base64');
        console.log(authz.basic.username);
        if (user.password !== base64) {
          return next(new authenticate.Error(
            '%s failed to authenticate',
            authz.basic.username
          ));
        }
    */
        req.userid=1;

        return next();
      });
    }
}

module.exports = authenticate;
