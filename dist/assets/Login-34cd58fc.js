import{r as h,b as a,o as k,j as x,w as n,f as e,l as u,G as L,H as y,u as S,p as U,g as C,e as I}from"./index-e5993185.js";import{U as z}from"./StoreLogin-90de31fe.js";import{_ as B}from"./_plugin-vue_export-helper-c27b6911.js";const N=l=>(U("data-v-0ea27aa5"),l=l(),C(),l),R=N(()=>I("h1",{class:"title container login-tiele-center"},"登录",-1)),V={__name:"Login",setup(l){let _={email:[{required:!0,message:"请输入邮箱",trigger:"blur"},{validator:function(d,t,r){/^\w{1,64}@[a-z0-9\-]{1,256}(\.[a-z]{2,6}){1,2}$/i.test(t)==!1?r(new Error("邮箱格式错误")):r()},trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"},{min:3,max:18,message:"密码长度在3-18个字符",trigger:"blur"}]};const o=h({email:"",password:"",ip:sessionStorage.getItem("ip")}),c=z(),m=async()=>{await c.UserLigonAuthorization(o)};return(d,t)=>{const r=a("n-divider"),i=a("n-input"),p=a("n-form-item"),g=a("n-form"),f=a("n-checkbox"),v=a("RouterLink"),w=a("n-button"),b=a("n-card");return k(),x(b,{class:"box login-panel"},{footer:n(()=>[e(f,{Checked:o.rember,"onUpdate:Checked":t[3]||(t[3]=s=>o.rember=s),label:"记住我"},null,8,["Checked"]),e(v,{to:"/Register",style:{float:"right"}},{default:n(()=>[u("还未注册?")]),_:1}),e(r),e(w,{class:"container",color:"#8a2be2",block:"false",size:"large",onClick:m,style:{width:"100px"}},{default:n(()=>[u("登 录")]),_:1})]),default:n(()=>[R,e(r),e(g,{rules:S(_),model:o},{default:n(()=>[e(p,{path:"email",label:"邮箱"},{default:n(()=>[e(i,{value:o.email,"onUpdate:value":t[0]||(t[0]=s=>o.email=s),placeholder:"请输入邮箱"},null,8,["value"])]),_:1}),e(p,{path:"password",label:"密码"},{default:n(()=>[e(i,{type:"password","show-password-on":"mousedown",value:o.password,"onUpdate:value":t[1]||(t[1]=s=>o.password=s),placeholder:"请输入密码"},null,8,["value"])]),_:1}),L(e(p,{part:"ip"},{default:n(()=>[e(i,{"input-props":{type:"hidden"},value:o.ip,"onUpdate:value":t[2]||(t[2]=s=>o.ip=s)},null,8,["value"])]),_:1},512),[[y,d.hidden]])]),_:1},8,["rules","model"])]),_:1})}}},D=B(V,[["__scopeId","data-v-0ea27aa5"]]);export{D as default};
