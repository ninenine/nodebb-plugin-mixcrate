'use strict';
var request = require('request');

var mp3Url ="";

(function(module) {
  var Mixcrate = {},
  embed = '<embed type="application/x-shockwave-flash" flashvars="audioUrl='+mp3Url+'" src="https://dl.dropboxusercontent.com/u/17757917/3523697345-audio-player.swf" width="400" height="27" quality="best"></embed>';
  Mixcrate.parse = function (postContent, callback) {
    if (postContent.match(/<a href="(?:https?:\/\/)?(?:www\.)?(?:mixcrate\.com)\/(.+)">.+<\/a>/g)) {
      console.log("Match Found for Mixcrate url");
      var mixUrl = postContent.match(/(?:https?:\/\/)?(?:www\.)?(?:mixcrate\.com)\/(.+)">/g);
      mixUrl = mixUrl[0].replace('">', ''); // too lazy to find a better way to do it.
      console.log("starting request for "+mixUrl);
      request(mixUrl, function (err, response, body) {
        if (!err && response.statusCode === 200) {
          mp3Url = body.match(/(?:https?:\/\/)?(?:cdn3\.)?(?:mixcrate\.com\/audio)\/(.*)mp3/g)
          postContent = postContent.replace(/<a href="(?:https?:\/\/)?(?:www\.)?(?:mixcrate\.com)\/(.+)">.+<\/a>/g, embed);
          console.log('Great Sucess!!');
        } else {
          console.log('error: '+ response.statusCode);
          console.log(body);
      	}
      });
    }
    callback(null, postContent);
  };
  module.exports = Mixcrate;
}(module));