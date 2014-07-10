'use strict';
var request = require('request');
(function(module) {
  var Mixcrate = {};
  Mixcrate.parse = function (postContent, callback) {
    if (postContent.match(/<a href="(?:https?:\/\/)?(?:www\.)?(?:mixcrate\.com)\/(.+)">.+<\/a>/ig)) {
      var mixUrl = postContent.match(/(?:https?:\/\/)?(?:www\.)?(?:mixcrate\.com)\/(.+)">/ig);
      mixUrl = mixUrl[0].replace('">', ''); // too lazy to find a better way to do it.
      postContent = postContent.replace(/<a href="(?:https?:\/\/)?(?:www\.)?(?:mixcrate\.com)\/(.+)">.+<\/a>/g,"notin");
      /*request(mixUrl, function (err, response, body) {
        if (!err && response.statusCode === 200) {
          var mp3Url = body.match(/(?:https?:\/\/)?(?:cdn3\.)?(?:mixcrate\.com\/audio)\/(.*)mp3/g);
          embed = '<embed type="application/x-shockwave-flash" flashvars="audioUrl='+mp3Url+'" src="https://dl.dropboxusercontent.com/u/17757917/3523697345-audio-player.swf" width="400" height="27" quality="best"></embed>';
          postContent = postContent.replace(/<a href="(?:https?:\/\/)?(?:www\.)?(?:mixcrate\.com)\/(.+)">.+<\/a>/g, embed);
        } else {
          console.log('error: '+ response.statusCode);
          console.log(body);
      	}
      });*/
    }
    callback(null, postContent);
  };
  module.exports = Mixcrate;
}(module));