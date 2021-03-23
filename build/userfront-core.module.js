import e from"axios";import t from"js-cookie";function n(e,t){try{var n=e()}catch(e){return t(e)}return n&&n.then?n.then(void 0,t):n}const{apiUrl:r,privateIPRegex:o}={apiUrl:"https://api.userfront.com/v0/",privateIPRegex:/((^127\.)|(^10\.)|(^172\.1[6-9]\.)|(^172\.2[0-9]\.)|(^172\.3[0-1]\.)|(^192\.168\.))\d{1,3}\.\d{1,3}/g},i=[],a=e=>{try{const t=e||window.location.hostname;return!(!t.match(/localhost/g)&&!t.match(o))}catch(e){return!0}},s={mode:a()?"test":"live"};function c(e){if(window.location.href&&!(window.location.href.indexOf(e+"=")<0))return decodeURIComponent(window.location.href.split(e+"=")[1].split("&")[0])}function u(e){if(!e)throw new Error("Missing provider");if(!s.tenantId)throw new Error("Missing tenant ID");return`https://api.userfront.com/v0/auth/${e}/login?tenant_id=${s.tenantId}&origin=${window.location.origin}&pathname=${window.location.pathname}`}function d(e){if(!e)return;const t=document.createElement("a");t.href=e,t.pathname!==window.location.pathname&&(window.location.href=`${t.pathname}${t.hash}${t.search}`)}function h(e,n,r){const o=`${r}.${s.tenantId}`;n=n||{secure:"live"===s.mode,sameSite:"Lax"},"refresh"===r&&(n.sameSite="Strict"),t.set(o,e,n)}function m(e){t.remove(e),t.remove(e,{secure:!0,sameSite:"Lax"}),t.remove(e,{secure:!0,sameSite:"None"}),t.remove(e,{secure:!1,sameSite:"Lax"}),t.remove(e,{secure:!1,sameSite:"None"})}function l(){m(s.accessTokenName),m(s.idTokenName),m(s.refreshTokenName),s.accessToken=void 0,s.idToken=void 0,s.refreshToken=void 0}function f(){s.accessToken=t.get(s.accessTokenName),s.idToken=t.get(s.idTokenName),s.refreshToken=t.get(s.refreshTokenName)}function w(e){h(e.access.value,e.access.cookieOptions,"access"),h(e.id.value,e.id.cookieOptions,"id"),h(e.refresh.value,e.refresh.cookieOptions,"refresh"),f()}let p=!1;var v={addInitCallback:function(e){e&&"function"==typeof e&&i.push(e)},accessToken:function(){return s.accessToken=t.get(s.accessTokenName),s.accessToken},getQueryAttr:c,idToken:function(){return s.idToken=t.get(s.idTokenName),s.idToken},init:function(e){if(!e)return console.warn("Userfront initialized without tenant ID");s.tenantId=e,s.accessTokenName="access."+e,s.idTokenName="id."+e,s.refreshTokenName="refresh."+e,f();try{i.length>0&&i.forEach(t=>{t&&"function"==typeof t&&t({tenantId:e})})}catch(e){}},isTestHostname:a,login:function({method:t,email:n,username:o,emailOrUsername:i,password:a,token:h,uuid:m}){try{if(!t)throw new Error('Userfront.login called without "method" property');switch(t){case"azure":case"facebook":case"github":case"google":case"linkedin":return Promise.resolve(function(e){if(!e)throw new Error("Missing provider");const t=u(e);window.location.assign(t)}(t));case"password":return function({email:t,username:n,emailOrUsername:o,password:i}){try{return Promise.resolve(e.post(r+"auth/basic",{tenantId:s.tenantId,emailOrUsername:t||n||o,password:i})).then(function({data:e}){if(!e.tokens)throw new Error("Please try again.");w(e.tokens),d(c("redirect")||e.redirectTo||"/")})}catch(e){return Promise.reject(e)}}({email:n,username:o,emailOrUsername:i,password:a});case"link":return function(t,n){try{return t||(t=c("token")),n||(n=c("uuid")),t&&n?Promise.resolve(e.put(r+"auth/link",{token:t,uuid:n,tenantId:s.tenantId})).then(function({data:e}){if(!e.tokens)throw new Error("Problem logging in.");w(e.tokens),d(c("redirect")||e.redirectTo||"/")}):Promise.resolve()}catch(e){return Promise.reject(e)}}(h,m);default:throw new Error('Userfront.login called with invalid "method" property')}}catch(e){return Promise.reject(e)}},logout:function(){try{if(!s.accessToken)return Promise.resolve(l());const t=n(function(){return Promise.resolve(e.get(r+"auth/logout",{headers:{authorization:"Bearer "+s.accessToken}})).then(function({data:e}){l(),d(e.redirectTo)})},function(){});return Promise.resolve(t&&t.then?t.then(function(){}):void 0)}catch(e){return Promise.reject(e)}},redirectIfLoggedIn:function(){try{if(!s.accessToken)return Promise.resolve(l());const t=n(function(){return Promise.resolve(e.get(r+"self",{headers:{authorization:"Bearer "+s.accessToken}})).then(function({data:e}){e.tenant&&e.tenant.loginRedirectPath&&d(e.tenant.loginRedirectPath)})},function(){l()});return Promise.resolve(t&&t.then?t.then(function(){}):void 0)}catch(e){return Promise.reject(e)}},registerUrlChangedEventListener:function(){if(!p){p=!0;try{history.pushState=(e=history.pushState,function(){var t=e.apply(this,arguments);return window.dispatchEvent(new Event("pushstate")),window.dispatchEvent(new Event("urlchanged")),t}),history.replaceState=(e=>function(){var t=e.apply(this,arguments);return window.dispatchEvent(new Event("replacestate")),window.dispatchEvent(new Event("urlchanged")),t})(history.replaceState),window.addEventListener("popstate",()=>{window.dispatchEvent(new Event("urlchanged"))})}catch(e){}var e}},resetPassword:function({uuid:t,token:n,password:o}){try{if(n||(n=c("token")),t||(t=c("uuid")),!n||!t)throw new Error("Missing token or uuid");return Promise.resolve(e.put(r+"auth/reset",{tenantId:s.tenantId,uuid:t,token:n,password:o})).then(function({data:e}){if(!e.tokens)throw new Error("There was a problem resetting your password. Please try again.");w(e.tokens),d(c("redirect")||e.redirectTo||"/")})}catch(e){return Promise.reject(e)}},sendLoginLink:function(t){try{return Promise.resolve(n(function(){return Promise.resolve(e.post(r+"auth/link",{email:t,tenantId:s.tenantId})).then(function({data:e}){return e})},function(){throw new Error("Problem sending link")}))}catch(e){return Promise.reject(e)}},sendResetLink:function(t){try{return Promise.resolve(n(function(){return Promise.resolve(e.post(r+"auth/reset/link",{email:t,tenantId:s.tenantId})).then(function({data:e}){return e})},function(){throw new Error("Problem sending link")}))}catch(e){return Promise.reject(e)}},setMode:function(){try{const t=n(function(){return Promise.resolve(e.get(`${r}tenants/${s.tenantId}/mode`)).then(function({data:e}){s.mode=e.mode||"test"})},function(){s.mode="test"});return Promise.resolve(t&&t.then?t.then(function(){}):void 0)}catch(e){return Promise.reject(e)}},setCookie:h,signup:function({method:t,username:n,name:o,email:i,password:a}){try{if(!t)throw new Error('Userfront.signup called without "method" property');switch(t){case"azure":case"facebook":case"github":case"google":case"linkedin":return Promise.resolve(function(e){if(!e)throw new Error("Missing provider");const t=u(e);window.location.assign(t)}(t));case"password":return function({username:t,name:n,email:o,password:i}){try{return Promise.resolve(e.post(r+"auth/create",{tenantId:s.tenantId,username:t,name:n,email:o,password:i})).then(function({data:e}){if(!e.tokens)throw new Error("Please try again.");w(e.tokens),d(c("redirect")||e.redirectTo||"/")})}catch(e){return Promise.reject(e)}}({username:n,name:o,email:i,password:a});default:throw new Error('Userfront.signup called with invalid "method" property')}}catch(e){return Promise.reject(e)}},store:s};export default v;
//# sourceMappingURL=userfront-core.module.js.map
