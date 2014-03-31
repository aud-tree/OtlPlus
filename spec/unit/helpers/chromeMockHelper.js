var chromeStorageReturns, chromeStorageSaved;
chromeStorageReturns = {};
var chrome = {
  storage: {local: {
    get: function(key, callback) {callback(chromeStorageReturns);},
    set: function(data) {chromeStorageSaved = data;}
  }}
};
