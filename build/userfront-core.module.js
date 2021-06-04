import e from"axios";import t from"js-cookie";const n="https://api.userfront.com/v0/",r=/((^127\.)|(^10\.)|(^172\.1[6-9]\.)|(^172\.2[0-9]\.)|(^172\.3[0-1]\.)|(^192\.168\.))\d{1,3}\.\d{1,3}/g,o=function(){try{const t=function(t,r){try{var o=Promise.resolve(e.get(`${n}tenants/${a.tenantId}/mode`)).then(function({data:e}){a.mode=e.mode||"test"})}catch(e){return r()}return o&&o.then?o.then(void 0,r):o}(0,function(){a.mode="test"});return Promise.resolve(t&&t.then?t.then(function(){}):void 0)}catch(e){return Promise.reject(e)}};function i(e){try{const t=e||window.location.hostname;return!(!t.match(/localhost/g)&&!t.match(r))}catch(e){return!0}}const a={mode:i()?"test":"live"};function s(){return a.accessToken=t.get(a.accessTokenName),a.accessToken}function c(){return a.idToken=t.get(a.idTokenName),a.idToken}function u(){a.accessToken=t.get(a.accessTokenName),a.idToken=t.get(a.idTokenName),a.refreshToken=t.get(a.refreshTokenName)}function d(e,n,r){const o=`${r}.${a.tenantId}`;n=n||{secure:"live"===a.mode,sameSite:"Lax"},"refresh"===r&&(n.sameSite="Strict"),t.set(o,e,n)}function h(e){t.remove(e),t.remove(e,{secure:!0,sameSite:"Lax"}),t.remove(e,{secure:!0,sameSite:"None"}),t.remove(e,{secure:!1,sameSite:"Lax"}),t.remove(e,{secure:!1,sameSite:"None"})}function l(){h(a.accessTokenName),h(a.idTokenName),h(a.refreshTokenName),a.accessToken=void 0,a.idToken=void 0,a.refreshToken=void 0}const m=function(){try{if(!a.accessToken)return Promise.resolve(l());if(f("redirect"))return Promise.resolve(w(f("redirect")));const t=function(t,r){try{var o=Promise.resolve(e.get(n+"self",{headers:{authorization:"Bearer "+a.accessToken}})).then(function({data:e}){e.tenant&&e.tenant.loginRedirectPath&&w(e.tenant.loginRedirectPath)})}catch(e){return r()}return o&&o.then?o.then(void 0,r):o}(0,function(){l()});return Promise.resolve(t&&t.then?t.then(function(){}):void 0)}catch(e){return Promise.reject(e)}};function f(e){if(window.location.href&&!(window.location.href.indexOf(e+"=")<0))return decodeURIComponent(window.location.href.split(e+"=")[1].split("&")[0])}function w(e){try{document}catch(e){return}if(!e)return;const t=document.createElement("a");t.href=e,t.pathname!==window.location.pathname&&window.location.assign(`${t.pathname}${t.hash}${t.search}`)}function p(e,t){try{var n=e()}catch(e){return t(e)}return n&&n.then?n.then(void 0,t):n}const k=function({uuid:e,token:t,password:n}){try{if(t||(t=f("token")),e||(e=f("uuid")),!t||!e)throw new Error("Missing token or uuid");return Promise.resolve(axios.put(apiUrl+"auth/reset",{tenantId:a.tenantId,uuid:e,token:t,password:n})).then(function({data:e}){if(!e.tokens)throw new Error("There was a problem resetting your password. Please try again.");setCookiesAndTokens(e.tokens),redirectToPath(f("redirect")||e.redirectTo||"/")})}catch(e){return Promise.reject(e)}},v=function(e){try{return Promise.resolve(p(function(){return Promise.resolve(axios.post(apiUrl+"auth/reset/link",{email:e,tenantId:a.tenantId})).then(function({data:e}){return e})},function(){throw new Error("Problem sending link")}))}catch(e){return Promise.reject(e)}},g=function(e){try{return Promise.resolve(p(function(){return Promise.resolve(axios.post(apiUrl+"auth/link",{email:e,tenantId:a.tenantId})).then(function({data:e}){return e})},function(){throw new Error("Problem sending link")}))}catch(e){return Promise.reject(e)}},y=function({method:e,email:t,username:n,emailOrUsername:r,password:o,token:i,uuid:s}){try{if(!e)throw new Error('Userfront.login called without "method" property');switch(e){case"azure":case"facebook":case"github":case"google":case"linkedin":return Promise.resolve(function(e){if(!e)throw new Error("Missing provider");const t=T(e);window.location.assign(t)}(e));case"password":return function({email:e,username:t,emailOrUsername:n,password:r}){try{return Promise.resolve(axios.post(apiUrl+"auth/basic",{tenantId:a.tenantId,emailOrUsername:e||t||n,password:r})).then(function({data:e}){if(!e.tokens)throw new Error("Please try again.");setCookiesAndTokens(e.tokens),redirectToPath(f("redirect")||e.redirectTo||"/")})}catch(e){return Promise.reject(e)}}({email:t,username:n,emailOrUsername:r,password:o});case"link":return function(e,t){try{return e||(e=f("token")),t||(t=f("uuid")),e&&t?Promise.resolve(axios.put(apiUrl+"auth/link",{token:e,uuid:t,tenantId:a.tenantId})).then(function({data:e}){if(!e.tokens)throw new Error("Problem logging in.");setCookiesAndTokens(e.tokens),redirectToPath(f("redirect")||e.redirectTo||"/")}):Promise.resolve()}catch(e){return Promise.reject(e)}}(i,s);default:throw new Error('Userfront.login called with invalid "method" property')}}catch(e){return Promise.reject(e)}},P=function({method:e,username:t,name:n,email:r,password:o}){try{if(!e)throw new Error('Userfront.signup called without "method" property');switch(e){case"azure":case"facebook":case"github":case"google":case"linkedin":return Promise.resolve(function(e){if(!e)throw new Error("Missing provider");const t=T(e);window.location.assign(t)}(e));case"password":return function({username:e,name:t,email:n,password:r}){try{return Promise.resolve(axios.post(apiUrl+"auth/create",{tenantId:a.tenantId,username:e,name:t,email:n,password:r})).then(function({data:e}){if(!e.tokens)throw new Error("Please try again.");setCookiesAndTokens(e.tokens),redirectToPath(f("redirect")||e.redirectTo||"/")})}catch(e){return Promise.reject(e)}}({username:t,name:n,email:r,password:o});default:throw new Error('Userfront.signup called with invalid "method" property')}}catch(e){return Promise.reject(e)}};function T(e){if(!e)throw new Error("Missing provider");if(!a.tenantId)throw new Error("Missing tenant ID");let t=`https://api.userfront.com/v0/auth/${e}/login?tenant_id=${a.tenantId}&origin=${window.location.origin}`;const n=f("redirect");return n&&(t+="&redirect="+encodeURIComponent(n)),t}const E=function(){try{if(!a.accessToken)return Promise.resolve(l());const t=function(t,r){try{var o=Promise.resolve(e.get(n+"auth/logout",{headers:{authorization:"Bearer "+a.accessToken}})).then(function({data:e}){l(),w(e.redirectTo)})}catch(e){return r()}return o&&o.then?o.then(void 0,r):o}(0,function(){l()});return Promise.resolve(t&&t.then?t.then(function(){}):void 0)}catch(e){return Promise.reject(e)}},I="https://auth.userfront.net";let U;function x(e){var t;if(e&&e.origin===I&&e.data&&e.data.type)switch(e.data.type){case"exchange":console.log("exchange");break;case"refresh":d((t=e.data.body.tokens).access.value,t.access.cookieOptions,"access"),d(t.id.value,t.id.cookieOptions,"id"),d(t.refresh.value,t.refresh.cookieOptions,"refresh"),u();break;case"logout":console.log("logout");break;default:return}}let b=[];function N(e){if(!e)return console.warn("Userfront initialized without tenant ID");a.tenantId=e,a.accessTokenName="access."+e,a.idTokenName="id."+e,a.refreshTokenName="refresh."+e,function(){try{if(U)return;U=document.createElement("iframe"),U.src=I,U.id="uf-auth-frame",U.style.width="0px",U.style.height="0px",U.style.display="none",document.body.appendChild(U),function(){try{window.addEventListener("message",x)}catch(e){}}()}catch(e){}}(),u();try{b.length>0&&b.forEach(t=>{t&&"function"==typeof t&&t({tenantId:e})}),b=[]}catch(e){}}function j(e){e&&"function"==typeof e&&b.push(e)}let S=!1;var L={addInitCallback:j,init:N,registerUrlChangedEventListener:function(){if(!S){S=!0;try{history.pushState=(e=history.pushState,function(){var t=e.apply(this,arguments);return window.dispatchEvent(new Event("pushstate")),window.dispatchEvent(new Event("urlchanged")),t}),history.replaceState=(e=>function(){var t=e.apply(this,arguments);return window.dispatchEvent(new Event("replacestate")),window.dispatchEvent(new Event("urlchanged")),t})(history.replaceState),window.addEventListener("popstate",()=>{window.dispatchEvent(new Event("urlchanged"))})}catch(e){}var e}},logout:E,isTestHostname:i,setMode:o,login:y,resetPassword:k,sendLoginLink:g,sendResetLink:v,signup:P,store:a,accessToken:s,idToken:c,redirectIfLoggedIn:m};export default L;export{s as accessToken,j as addInitCallback,c as idToken,N as init,i as isTestHostname,y as login,E as logout,m as redirectIfLoggedIn,k as resetPassword,g as sendLoginLink,v as sendResetLink,o as setMode,P as signup,a as store};
//# sourceMappingURL=userfront-core.module.js.map
