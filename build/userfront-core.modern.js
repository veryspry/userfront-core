import e from"axios";import t from"js-cookie";const{apiUrl:o,privateIPRegex:a}={apiUrl:"https://api.userfront.com/v0/",privateIPRegex:/((^127\.)|(^10\.)|(^172\.1[6-9]\.)|(^172\.2[0-9]\.)|(^172\.3[0-1]\.)|(^192\.168\.))\d{1,3}\.\d{1,3}/g},n=e=>{try{const t=e||window.location.hostname;return!(!t.match(/localhost/g)&&!t.match(a))}catch(e){return!0}},s={mode:n()?"test":"live"};function r(e,o,a){const n=`${a}.${s.tenantId}`;o=o||{secure:"live"===s.mode,sameSite:"Lax"},"refresh"===a&&(o.sameSite="Strict"),t.set(n,e,o)}function i(e){t.remove(e),t.remove(e,{secure:!0,sameSite:"Lax"}),t.remove(e,{secure:!0,sameSite:"None"}),t.remove(e,{secure:!1,sameSite:"Lax"}),t.remove(e,{secure:!1,sameSite:"None"})}var c={getMode:async function(){try{const{data:t}=await e.get(`${o}tenants/${s.tenantId}/mode`);s.mode=t.mode||"test"}catch(e){s.mode="test"}},init:function(e,t={}){if(!e)return console.warn("Userfront initialized without tenant ID");s.tenantId=e,s.signupModId=t.signup,s.loginModId=t.login,s.logoutModId=t.logout,s.resetModId=t.reset,s.accessTokenName="access."+e,s.idTokenName="id."+e,s.refreshTokenName="refresh."+e},isTestHostname:n,logout:async function(){const a=t.get(s.accessTokenName);if(a)try{const{data:t}=await e.get(o+"/auth/logout",{headers:{authorization:"Bearer "+a}});i(s.accessTokenName),i(s.idTokenName),i(s.refreshTokenName),window.location.href=t.redirectTo}catch(e){}},scope:s,setCookie:r,signup:async function({username:t,name:a,email:n,password:i}){const{data:c}=await e.post(o+"auth/create",{tenantId:s.tenantId,username:t,name:a,email:n,password:i});if(!c.tokens)throw new Error("Please try again.");r(c.tokens.access.value,c.tokens.access.cookieOptions,"access"),r(c.tokens.id.value,c.tokens.id.cookieOptions,"id"),r(c.tokens.refresh.value,c.tokens.refresh.cookieOptions,"refresh"),window.location.href=c.redirectTo}};export default c;
//# sourceMappingURL=userfront-core.modern.js.map
