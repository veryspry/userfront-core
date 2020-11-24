!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("axios"),require("js-cookie")):"function"==typeof define&&define.amd?define(["axios","js-cookie"],t):(e=e||self).core=t(e.axios,e.jsCookie)}(this,function(e,t){function o(e,t){try{var o=e()}catch(e){return t(e)}return o&&o.then?o.then(void 0,t):o}e=e&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e,t=t&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t;var n="https://api.userfront.com/v0/",r=/((^127\.)|(^10\.)|(^172\.1[6-9]\.)|(^172\.2[0-9]\.)|(^172\.3[0-1]\.)|(^192\.168\.))\d{1,3}\.\d{1,3}/g,s=function(e){try{var t=e||window.location.hostname;return!(!t.match(/localhost/g)&&!t.match(r))}catch(e){return!0}},i={mode:s()?"test":"live"};function a(e,o,n){var r=n+"."+i.tenantId;o=o||{secure:"live"===i.mode,sameSite:"Lax"},"refresh"===n&&(o.sameSite="Strict"),t.set(r,e,o)}function c(e){t.remove(e),t.remove(e,{secure:!0,sameSite:"Lax"}),t.remove(e,{secure:!0,sameSite:"None"}),t.remove(e,{secure:!1,sameSite:"Lax"}),t.remove(e,{secure:!1,sameSite:"None"})}return{getMode:function(){try{var t=o(function(){return Promise.resolve(e.get(n+"tenants/"+i.tenantId+"/mode")).then(function(e){i.mode=e.data.mode||"test"})},function(){i.mode="test"});return Promise.resolve(t&&t.then?t.then(function(){}):void 0)}catch(e){return Promise.reject(e)}},init:function(e,t){if(void 0===t&&(t={}),!e)return console.warn("Userfront initialized without tenant ID");i.tenantId=e,i.signupModId=t.signup,i.loginModId=t.login,i.logoutModId=t.logout,i.resetModId=t.reset,i.accessTokenName="access."+e,i.idTokenName="id."+e,i.refreshTokenName="refresh."+e},isTestHostname:s,logout:function(){try{var r=t.get(i.accessTokenName);if(!r)return Promise.resolve();var s=o(function(){return Promise.resolve(e.get(n+"/auth/logout",{headers:{authorization:"Bearer "+r}})).then(function(e){var t=e.data;c(i.accessTokenName),c(i.idTokenName),c(i.refreshTokenName),window.location.href=t.redirectTo})},function(){});return Promise.resolve(s&&s.then?s.then(function(){}):void 0)}catch(e){return Promise.reject(e)}},scope:i,setCookie:a,signup:function(t){var o=t.username,r=t.name,s=t.email,c=t.password;try{return Promise.resolve(e.post(n+"auth/create",{tenantId:i.tenantId,username:o,name:r,email:s,password:c})).then(function(e){var t=e.data;if(!t.tokens)throw new Error("Please try again.");a(t.tokens.access.value,t.tokens.access.cookieOptions,"access"),a(t.tokens.id.value,t.tokens.id.cookieOptions,"id"),a(t.tokens.refresh.value,t.tokens.refresh.cookieOptions,"refresh"),window.location.href=t.redirectTo})}catch(e){return Promise.reject(e)}}}});
//# sourceMappingURL=userfront-core.umd.js.map
