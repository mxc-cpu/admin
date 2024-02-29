import{E as s,O as c,V as l,W as d,I as g}from"./index-e5993185.js";new TextEncoder;const i=new TextDecoder,u=t=>{const e=atob(t),o=new Uint8Array(e.length);for(let a=0;a<e.length;a++)o[a]=e.charCodeAt(a);return o},h=t=>{let e=t;e instanceof Uint8Array&&(e=i.decode(e)),e=e.replace(/-/g,"+").replace(/_/g,"/").replace(/\s/g,"");try{return u(e)}catch{throw new TypeError("The input to be decoded is not correctly encoded.")}};class f extends Error{static get code(){return"ERR_JOSE_GENERIC"}constructor(e){var o;super(e),this.code="ERR_JOSE_GENERIC",this.name=this.constructor.name,(o=Error.captureStackTrace)==null||o.call(Error,this,this.constructor)}}class r extends f{constructor(){super(...arguments),this.code="ERR_JWT_INVALID"}static get code(){return"ERR_JWT_INVALID"}}function p(t){return typeof t=="object"&&t!==null}function w(t){if(!p(t)||Object.prototype.toString.call(t)!=="[object Object]")return!1;if(Object.getPrototypeOf(t)===null)return!0;let e=t;for(;Object.getPrototypeOf(e)!==null;)e=Object.getPrototypeOf(e);return Object.getPrototypeOf(t)===e}const y=h;function m(t){if(typeof t!="string")throw new r("JWTs must use Compact JWS serialization, JWT must be a string");const{1:e,length:o}=t.split(".");if(o===5)throw new r("Only JWTs using Compact JWS serialization can be decoded");if(o!==3)throw new r("Invalid JWT");if(!e)throw new r("JWTs must contain a payload");let a;try{a=y(e)}catch{throw new r("Failed to base64url decode the payload")}let n;try{n=JSON.parse(i.decode(a))}catch{throw new r("Failed to parse the decoded payload as JSON")}if(!w(n))throw new r("Invalid JWT Claims Set");return n}const O=async t=>await s.get("/Users/GetUserName/"+t),S=async t=>await s.get("/Users/GetUserAvatar/"+t),E=c("StoreLogin",{state:()=>({exp:Date.now(),token:null}),actions:{async UsrerLogin(t){this.token=await t,localStorage.setItem("tokenAnt",this.token)},logOut(){l(),I().changeState()},async UserLigonAuthorization(t){const{data:e}=await d(t);console.log(e.email),this.UsrerLogin(e.token),console.log(e.token+" emial:"+e.email+" id:"+e.id),g.replace("/")}}}),I=c("loginState",{state:()=>({InLogin:!1,name1:"",avatarUrl:"",userId:0}),actions:{async changeState(){if(localStorage.getItem("tokenAnt")){const t=localStorage.getItem("tokenAnt");this.InLogin=!0;const e=m(t);this.userId=e.id;const[o,a]=await Promise.all([S(e.id),O(e.id)]);this.name1=a.data,o.data.success==!0?this.avatarUrl=o.data.data:console.log("获取头像失败")}else this.name1="",this.userId=0,this.InLogin=!1,console.log("退出登入")}}});export{S as G,E as U,O as a,I as l};