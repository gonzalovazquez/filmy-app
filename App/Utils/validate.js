var validate = {
  emailAddress(elem) {
    var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(elem);
  },
  username(elem) {
    var regex = /^$/;
    return regex.test(elem);
  },
  password(elem) {
    var regex = /^$/;
    return regex.test(elem);
  }
};

module.exports = validate;
