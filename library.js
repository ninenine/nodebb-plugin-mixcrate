(function (module) {
  'use strict';
  var request = require('request');
  var Mixcrate = {
  },
  embed = '<embed type="application/x-shockwave-flash" flashvars="audioUrl=$1" src="https://dl.dropboxusercontent.com/u/17757917/3523697345-audio-player.swf" width="400" height="27" quality="best"></embed>';
  Mixcrate.parse = function (postContent, callback) {
    var mixUrl = /<a href="(?:https?:\/\/)?(?:www\.)?(?:mixcrate\.com)\/(.+)">.+<\/a>/g;
    if (postContent.match(mixUrl)) {
      var trimUrl = /(?:https?:\/\/)?(?:www\.)?(?:mixcrate\.com)\/(.+)">/g;
      var mUrl = postContent.match(trimUrl);
      mUrl = mUrl[0].replace('">', ''); // too lazy to find a better way to do it.
      request(mixUrl, function (err, response, body) {
        if (!err && response.statusCode === 200) {
          var urlRegex = /(?:https?:\/\/)?(?:cdn3\.)?(?:mixcrate\.com\/audio)\/(.*)mp3/g;
          var mp3Url = body.match(urlRegex);
          postContent = postContent.replace(mp3Url, embed);
        }
      }
    }
    callback(null, postContent);
  };
  module.exports = Mixcrate;
}(module));
