import{U as D,l as i}from"./StoreLogin-90de31fe.js";import{C as N}from"./categoryApi-7e1a6937.js";import{O as U,a as r,i as j,h as E,b as v,o as l,d as h,e as a,f as t,w as e,l as c,u as o,R as d,F as O,m as R,j as V,t as k,I as b}from"./index-e5993185.js";const $=U("CategoryList",{state:()=>({CategoryListData:{}})}),A={class:"navbar is-spaced has-shadow",role:"navigation","aria-label":"main navigation"},F={class:"container"},M=a("div",{class:"navbar-brand"},[a("a",{class:"navbar-item",href:"/"},[a("img",{src:"https://bulma.io/images/bulma-logo.png",width:"112",height:"28"})]),a("a",{role:"button",class:"navbar-burger","aria-label":"menu","aria-expanded":"false","data-target":"navbarBasicExample"},[a("span",{"aria-hidden":"true"}),a("span",{"aria-hidden":"true"}),a("span",{"aria-hidden":"true"})])],-1),z={id:"navbarBasicExample",class:"navbar-menu"},G={class:"navbar-start"},T=a("a",{class:"navbar-item"}," 精品 ",-1),q={class:"navbar-item has-dropdown is-hoverable"},H=a("a",{class:"navbar-link"}," 分类 ",-1),J={class:"navbar-dropdown"},K=a("hr",{class:"navbar-divider"},null,-1),P={class:"navbar-end"},Q={class:"has-text-right"},W={class:"buttons"},X={key:0},Y={key:1,class:"media"},Z={class:"media-content"},aa={class:"content"},ta={class:"title is-3"},la={__name:"MyNavBar",setup(ea){const L=D(),s=i(),C=$();let p=r(),g=r(),u=r(),_=r();j(async()=>{i().InLogin||await i().changeState(),u.value=s.InLogin,g.value=s.name1,_.value=s.userId,p.value=s.avatarUrl}),E(async()=>{i().InLogin||await i().changeState(),u.value=s.InLogin,g.value=s.name1,_.value=s.userId,p.value=s.avatarUrl});const w=[{label:"我的博客",key:"myBlog",props:{onClick:()=>{b.push(`/ArticleListByuser/${_.value}`)}}},{label:"我的园子",key:"personal",props:{onClick:()=>{b.push(`/Dynamics/${_.value}`)}}},{label:"编写文章",key:"editBlog",props:{onClick:()=>{b.push("/Editor")}}},{label:"退出登录",key:"logOut",props:{onClick:()=>{u.value=!1,L.logOut()}}}],m=r([]);return(async()=>{await N().then(n=>{n.data.success==!0?(m.value=n.data.data,C.CategoryListData=m.value):console.log("没找到分类")}).catch(n=>{console.log(n)})})(),(n,oa)=>{const y=v("n-button"),x=v("n-space"),B=v("n-avatar"),I=v("n-dropdown");return l(),h("nav",A,[a("div",F,[M,a("div",z,[a("div",G,[t(o(d),{class:"navbar-item",to:"/"},{default:e(()=>[c(" 主页 ")]),_:1}),T,a("div",q,[H,a("div",J,[(l(!0),h(O,null,R(m.value.slice(0,5),(f,S)=>(l(),V(o(d),{to:`/ArticleListByCategoryId/${f.id}`,class:"navbar-item",key:S},{default:e(()=>[c(k(f.categoryName),1)]),_:2},1032,["to"]))),128)),K,t(o(d),{to:"/categoryList",class:"navbar-item"},{default:e(()=>[c(" 全部分区 ")]),_:1})])])]),a("div",P,[a("div",Q,[a("div",W,[o(u)?(l(),h("div",Y,[t(I,{options:w},{default:e(()=>[t(B,{round:"","object-fit":"cover",size:50,src:o(p),"fallback-src":"https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"},null,8,["src"])]),_:1}),a("div",Z,[a("div",aa,[a("p",null,[a("strong",ta,k(o(g)),1)])])])])):(l(),h("div",X,[t(x,null,{default:e(()=>[t(o(d),{to:"/Register"},{default:e(()=>[t(y,{round:"",style:{width:"90px",height:"35px"},color:"#ff69b4"},{default:e(()=>[c(" 注 册 ")]),_:1})]),_:1}),t(o(d),{to:"/Login"},{default:e(()=>[t(y,{round:"",ghost:"",style:{width:"90px",height:"35px"},color:"#8a2be2"},{default:e(()=>[c(" 登 录 ")]),_:1})]),_:1})]),_:1})]))])])])])])])}}};export{$ as C,la as _};