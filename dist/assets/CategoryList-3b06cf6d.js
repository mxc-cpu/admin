import{C as L,_ as N}from"./MyNavBar-3f01dc6c.js";import{f as g,o as n,d as u,e as r,k as y,w as i,l,u as _,R as D,t as d,q,r as C,b as m,F as f,m as $,j as h}from"./index-e5993185.js";import{A as k}from"./AntdIcon-d361e429.js";import"./StoreLogin-90de31fe.js";import"./categoryApi-7e1a6937.js";var R={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M412.7 696.5l246-178c4.4-3.2 4.4-9.7 0-12.9l-246-178c-5.3-3.8-12.7 0-12.7 6.5V381c0 10.2 4.9 19.9 13.2 25.9L558.6 512 413.2 617.2c-8.3 6-13.2 15.6-13.2 25.9V690c0 6.5 7.4 10.3 12.7 6.5z"}},{tag:"path",attrs:{d:"M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z"}}]},name:"right-square",theme:"outlined"};const V=R;function v(o){for(var t=1;t<arguments.length;t++){var e=arguments[t]!=null?Object(arguments[t]):{},a=Object.keys(e);typeof Object.getOwnPropertySymbols=="function"&&(a=a.concat(Object.getOwnPropertySymbols(e).filter(function(s){return Object.getOwnPropertyDescriptor(e,s).enumerable}))),a.forEach(function(s){x(o,s,e[s])})}return o}function x(o,t,e){return t in o?Object.defineProperty(o,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):o[t]=e,o}var p=function(t,e){var a=v({},t,e.attrs);return g(k,v({},a,{icon:V}),null)};p.displayName="RightSquareOutlined";p.inheritAttrs=!1;const B=p,j=["title"],w={class:"card-image"},I={class:"image is-4by3"},P=["src"],A={class:"card-content"},U={class:"media"},z={class:"media-content"},E={class:"title is-4"},F={class:"content"},H={class:"card-footer"},M={class:"title is-5"},T={__name:"CategoryItem",props:{categoryName:{type:String,required:!0},categoryDescription:{type:String,default:"一个分区",required:!0},categoryDescriptionlLink:{type:String,default:"/"},categorycoverUrl:{type:String,required:!0}},setup(o){const t=o;return(e,a)=>(n(),u("div",{class:"card",title:t.categoryName},[r("div",w,[r("figure",I,[r("img",{src:t.categorycoverUrl},null,8,P)])]),r("div",A,[r("div",U,[r("div",z,[r("p",E,[y(e.$slots,"categoryName",{},()=>[l(d(t.categoryName),1)])])])]),r("div",F,[y(e.$slots,"categoryDescription",{},()=>[l(d(t.categoryDescription),1)])])]),r("footer",H,[g(_(D),{class:"card-footer-item",style:{"background-color":"rgb(141, 236, 204)"},to:t.categoryDescriptionlLink},{default:i(()=>[r("p",M,[l(" 进入 "),g(_(B))])]),_:1},8,["to"])])],8,j))}};const G={class:"header"},J={class:"container"},Q=r("footer",null,null,-1),tt={__name:"CategoryList",setup(o){q();const t=L();var e=C({arr:[{}]});return e.arr=t.CategoryListData,console.log("categoryListInfo.arr",e.arr),(a,s)=>{const S=m("n-grid-item"),b=m("n-grid");return n(),u(f,null,[r("header",G,[g(N)]),r("div",J,[g(b,{"x-gap":20,"y-gap":8,cols:"1 400:2 600:3 1000:5 "},{default:i(()=>[(n(!0),u(f,null,$(_(e).arr,(c,O)=>(n(),h(S,null,{default:i(()=>[(n(),h(T,{key:O,categorycoverUrl:c.categoryCover,categoryName:c.categoryName,categoryDescriptionlLink:`/ArticleListByCategoryId/${c.id}`},{categoryName:i(()=>[l(d(c.categoryName),1)]),categoryDescription:i(()=>[l(d(c.categoryDescription),1)]),_:2},1032,["categorycoverUrl","categoryName","categoryDescriptionlLink"]))]),_:2},1024))),256))]),_:1})]),Q],64)}}};export{tt as default};
