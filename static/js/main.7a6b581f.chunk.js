(this.webpackJsonpwebsite=this.webpackJsonpwebsite||[]).push([[0],{159:function(e,t,n){},160:function(e,t,n){},266:function(e,t,n){},267:function(e,t,n){},268:function(e,t,n){},269:function(e,t,n){},270:function(e,t,n){},271:function(e,t,n){},272:function(e,t,n){},273:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),s=n(41),i=n.n(s),r=(n(159),n(21)),l=n(22),o=n(29),j=n(275),u=n(280),d=n(66),b=n(67),O=n(42),h=n(279),x=n(281),f=n(285),m=n(286),v=n(101),g=(n(160),n(6)),p=j.a.Content,y=j.a.Footer;var S=function(e){var t=Object(l.g)(),n=e.videoNum,a=e.userNum;return Object(g.jsxs)(j.a,{className:"layout",children:[Object(g.jsx)(u.a,{title:"Bilibili Crawler",extra:[Object(g.jsx)(d.a,{shape:"circle",icon:Object(g.jsx)(v.a,{}),onClick:function(){t.push("/search")}})],className:"header-title"}),Object(g.jsx)(p,{style:{padding:"0 50px"},className:"content",children:Object(g.jsxs)("div",{className:"center-content",children:[Object(g.jsx)("div",{className:"title",children:"Hello, World!"}),Object(g.jsxs)(b.a,{gutter:16,children:[Object(g.jsx)(O.a,{span:12,children:Object(g.jsx)(o.b,{to:"/videos",children:Object(g.jsx)(h.a,{className:"card video-card",hoverable:"true",children:Object(g.jsx)(x.a,{title:"\u603b\u89c6\u9891\u6570",value:n,prefix:Object(g.jsx)(f.a,{}),loading:null==n,valueStyle:{fontFamily:"monaco"}})})})}),Object(g.jsx)(O.a,{span:12,children:Object(g.jsx)(o.b,{to:"/users",children:Object(g.jsx)(h.a,{className:"card user-card",hoverable:"true",children:Object(g.jsx)(x.a,{title:"\u603b\u7528\u6237\u6570",value:a,loading:null==a,prefix:Object(g.jsx)(m.a,{}),valueStyle:{fontFamily:"monaco"}})})})})]})]})}),Object(g.jsx)(y,{className:"footer",children:"\xa92021 Liang Yesheng"})]})},N=n(94),w=n.n(N);function C(e,t,n){w.a.get(e,{params:t}).then((function(e){e.data.code>=0?n(e.data):console.log(e)})).catch((function(e){console.log(e)}))}function T(e,t){C("/user",{id:e},(function(e){return t(e.data)}))}var z=n(278),D=(n(266),j.a.Footer),k=j.a.Content;var _=function(e){var t=Object(l.g)();return Object(g.jsxs)(j.a,{children:[Object(g.jsxs)(k,{className:"content-container",children:[Object(g.jsx)("div",{style:{height:"60px"}}),Object(g.jsx)("div",{className:"inseted-content",children:e.children}),e.avatar&&Object(g.jsx)(u.a,{onBack:function(){e.toRoot?t.replace("/"):t.goBack()},title:e.title,subTitle:e.subTitle,className:"header",avatar:{src:e.avatar}}),!e.avatar&&Object(g.jsx)(u.a,{onBack:function(){e.toRoot?t.replace("/"):t.goBack()},title:e.title,subTitle:e.subTitle,className:"header"})]}),Object(g.jsx)(D,{className:"footer",children:"\xa92021 Liang Yesheng"})]})},B=n(98),R=n(277),E=n(284);n(267);var F=function(e){var t=e.total,n=e.cols,a=parseInt(t/n)+(t%n!==0?1:0),c=e.content,s=e.itemId;return Object(g.jsx)(E.b,{direction:"vertical",size:16,className:"grid-container",style:{width:"100%"},children:Array(a).fill(null).map((function(e,i){return Object(g.jsx)(b.a,{align:"middle",gutter:[16,16],style:{flexDirection:"row"},children:Array(i===a-1?0===i?t:t%n:n).fill(null).map((function(e,t){return Object(g.jsx)(O.a,{span:parseInt(24/n),children:c(i*n+t)},s(i*n+t))}))},i.toString())}))})};var I=function(e){var t=e.videos?e.videos:[],n=e.cols?e.cols:4,a=e.delay?e.delay:0;return Object(g.jsx)(F,{total:t.length,cols:n,content:function(e){return Object(g.jsx)(o.b,{to:"/video/"+t[e].id,children:Object(g.jsxs)(h.a,{hoverable:!0,className:"c",style:{animationDelay:(.03*e+a).toString()+"s"},children:[Object(g.jsx)(B.a,{title:t[e].title,children:Object(g.jsx)("h3",{className:"card-header card-text",children:t[e].title})}),Object(g.jsx)("div",{className:"card-description card-text",children:t[e].description}),Object(g.jsx)(R.a,{src:t[e].cover_url+"@412w_232h_1c.jpg",preview:!1,style:{marginTop:"16px",borderRadius:"3px"}})]})})},itemId:function(e){return t[e].id}})},L=(n(268),j.a.Footer);var q=function(e){var t=Object(l.h)().page,n=Object(l.g)(),c=Object(a.useState)([]),s=Object(r.a)(c,2),i=s[0],o=s[1],j=Object(a.useState)(40),u=Object(r.a)(j,2),d=u[0],b=u[1],O=Object(a.useState)(t),h=Object(r.a)(O,2),x=h[0],f=h[1],m=e.videoNum;return Object(a.useEffect)((function(){!function(e,t,n){C("/list",{page:e,count:t,type:"v"},(function(e){return n(e.data)}))}(t,d,(function(e){o(e),f(x),window.scrollTo({top:0})}))}),[t,d]),Object(g.jsxs)(_,{title:"\u6240\u6709\u89c6\u9891",subTitle:"\u7b2c "+t.toString()+" \u9875",toRoot:!0,children:[i.length>0&&Object(g.jsx)(I,{videos:i}),0===i.length&&Object(g.jsx)("div",{style:{minHeight:"1000px"}}),Object(g.jsx)(L,{align:"center",children:Object(g.jsx)(z.a,{showSizeChanger:!0,showQuickJumper:!0,onChange:function(e,t){f(e),b(t),n.push("/videos/"+e.toString())},defaultCurrent:t,total:m,pageSize:d,pageSizeOptions:[20,40,60,100]})})]})},J=n(150);n(269);var A=function(e){var t=Object(a.useState)(e.user),n=Object(r.a)(t,2),c=n[0],s=n[1],i=e.id,l=e.title,j=e.showBio,u=!!e.hoverable&&e.hoverable;return Object(a.useEffect)((function(){i&&!c&&T(i,(function(e){s(e)}))})),Object(g.jsx)(h.a,{title:l,loading:null==c,className:e.className,style:e.style,hoverable:u,children:c&&Object(g.jsxs)(E.b,{direction:"vertical",size:8,children:[Object(g.jsxs)(b.a,{gutter:16,align:"middle",wrap:!1,children:[Object(g.jsx)(O.a,{flex:"none",children:Object(g.jsx)(J.a,{src:c.avatar_url+"@90w_90h_1c_100q.webp"})}),Object(g.jsx)(O.a,{className:"user-name",flex:"auto",children:Object(g.jsx)(d,{})})]}),c.bio.length>0&&j&&Object(g.jsxs)("div",{style:{marginTop:"15px"},children:[Object(g.jsx)("strong",{children:"\u7b80\u4ecb"}),Object(g.jsx)("div",{style:{color:"gray"},children:c.bio})]})]})});function d(){return e.link?Object(g.jsx)(o.b,{to:"/user/"+c.id,className:"user-name",children:Object(g.jsx)("strong",{className:"user-link",children:c.name})}):Object(g.jsx)("strong",{className:"user-name",children:c.name})}};var H=function(e){var t=e.users?e.users:[],n=e.cols?e.cols:4,a=e.delay?e.delay:0;return Object(g.jsx)(F,{total:t.length,cols:n,content:function(e){return Object(g.jsx)(o.b,{to:"/user/"+t[e].id,children:Object(g.jsx)(A,{user:t[e],className:"c",style:{animationDelay:(a+.01*e).toString()+"s"},hoverable:!0})})},itemId:function(e){return t[e].id}})},M=j.a.Footer;var P=function(e){var t=Object(l.h)().page,n=Object(l.g)(),c=Object(a.useState)([]),s=Object(r.a)(c,2),i=s[0],o=s[1],j=Object(a.useState)(40),u=Object(r.a)(j,2),d=u[0],b=u[1],O=Object(a.useState)(t),h=Object(r.a)(O,2),x=h[0],f=h[1],m=e.userNum;return Object(a.useEffect)((function(){!function(e,t,n){C("/list",{page:e,count:t,type:"u"},(function(e){return n(e.data)}))}(t,d,(function(e){o(e),f(x),window.scrollTo({top:0})}))}),[t,d]),Object(g.jsxs)(_,{title:"\u6240\u6709\u7528\u6237",subTitle:"\u7b2c "+t.toString()+" \u9875",toRoot:!0,children:[i.length>0&&Object(g.jsx)(H,{users:i,cols:4}),0===i.length&&Object(g.jsx)("div",{style:{minHeight:"1000px"}}),Object(g.jsx)(M,{align:"center",children:Object(g.jsx)(z.a,{showSizeChanger:!0,onChange:function(e,t){f(e),b(t),n.push("/users/"+e.toString())},defaultCurrent:t,total:m,pageSize:d,pageSizeOptions:[20,40,60,100]})})]})},U=n(276),Q=n(287),W=n(288),Y=n(289),G=n(290);n(270);function V(e){for(var t=e.length-1;t>0;t--){var n=Math.floor(Math.random()*(t+1)),a=e[t];e[t]=e[n],e[n]=a}}var K=function(){var e=Object(l.h)().id,t=Object(a.useState)(null),n=Object(r.a)(t,2),c=n[0],s=n[1];return Object(a.useEffect)((function(){!function(e,t){C("/video",{id:e},(function(e){return t(e.data)}))}(e,(function(e){s(e),window.scrollTo(0,0)}))}),[e]),Object(g.jsx)(_,{title:c?c.title:"\u52a0\u8f7d\u4e2d",subTitle:c?c.time:e,children:Object(g.jsxs)(b.a,{gutter:24,style:{marginTop:"20px",marginRight:"20px",marginLeft:"20px"},children:[Object(g.jsx)(O.a,{span:18,children:Object(g.jsxs)(E.b,{direction:"vertical",size:24,style:{width:"100%"},children:[Object(g.jsx)("iframe",{title:"bilibili",className:"video-player fade-slide-animated",border:"0",frameBorder:"no",allowFullScreen:!0,src:"https://player.bilibili.com/player.html?bvid="+e,style:{width:"100%",aspectRatio:"1.7",backgroundColor:"#fff"}}),Object(g.jsx)(h.a,{className:"fade-slide-animated",title:"\u8bc4\u8bba",style:{animationDelay:"0.2s"},loading:null==c,children:c&&function(){var e=["Ailce","Bob","Carol","Dave","Eve"],t=["#fa541c","#fa8c16","#faad14","#fadb14","#a0d911","#52c41a","#13c2c2","#1890ff","#2f54eb","#722ed1"];return V(t),c.comments.map((function(n,a){return Object(g.jsx)(U.a,{className:"fade-slide-animated",author:e[a%5],avatar:Object(g.jsx)(J.a,{style:{backgroundColor:t[a%5]}}),content:n,style:{animationDelay:(.1*a).toString()+"s"}},a)}))}()})]})}),Object(g.jsxs)(O.a,{span:6,children:[Object(g.jsx)(A,{id:c?c.author_id:null,className:"fade-slide-animated",title:"UP \u4e3b",style:{animationDelay:"0.05s"},link:!0,showBio:!0}),Object(g.jsx)("div",{style:{height:24}}),Object(g.jsx)(h.a,{className:"fade-slide-animated",title:"\u89c6\u9891\u4fe1\u606f",loading:null==c,style:{animationDelay:"0.1s"},children:c&&Object(g.jsxs)(E.b,{direction:"vertical",size:18,style:{width:"100%"},children:[i("\u64ad\u653e\u91cf",c.plays,Object(g.jsx)(Q.a,{}),0),i("\u70b9\u8d5e\u6570",c.stars,Object(g.jsx)(W.a,{}),1),i("\u5f39\u5e55\u6570",c.shoots,Object(g.jsx)(Y.a,{}),2),i("\u6295\u5e01\u6570",c.coins,Object(g.jsx)(G.a,{}),3),c.description.length>4&&Object(g.jsxs)("div",{className:"fade-slide-animated",style:{marginTop:"15px",animationDelay:"0.3s"},children:[Object(g.jsx)("strong",{children:"\u7b80\u4ecb"}),Object(g.jsx)("div",{style:{color:"gray"},children:c.description})]})]})})]})]})});function i(e,t,n,a){return Object(g.jsx)(x.a,{className:"fade-slide-animated",title:e,value:t,prefix:n,style:{animationDelay:(.06*a).toString()+"s"}})}},X=n(291),Z=n(292);n(271);var $=function(){var e=Object(l.h)().id,t=Object(a.useState)(null),n=Object(r.a)(t,2),c=n[0],s=n[1],i=Object(a.useState)(null),o=Object(r.a)(i,2),j=o[0],u=o[1];return Object(a.useEffect)((function(){T(e,(function(e){u(e)})),function(e,t){C("/list",{type:"uv",id:e},(function(e){return t(e.data)}))}(e,(function(e){s(e),console.log(e)}))}),[e]),Object(g.jsx)(_,{title:j?j.name:"\u52a0\u8f7d\u4e2d",avatar:j?j.avatar_url+"@90w_90h_1c_100q.webp":null,children:Object(g.jsxs)(b.a,{gutter:48,children:[Object(g.jsx)(O.a,{span:18,children:Object(g.jsxs)(E.b,{direction:"vertical",size:24,style:{width:"100%"},children:[Object(g.jsx)("h2",{className:"fade-animated section-header",style:{animationDelay:"0.5s",marginTop:"10px"},children:"\u89c6\u9891"}),c&&Object(g.jsx)(I,{videos:c,delay:.3,cols:3})]})}),Object(g.jsx)(O.a,{span:6,children:Object(g.jsx)(h.a,{className:"fade-slide-animated",title:"\u5173\u4e8e UP \u4e3b",loading:null==j,style:{animationDelay:"0.5s"},children:j&&Object(g.jsxs)(E.b,{direction:"vertical",size:18,style:{width:"100%"},children:[d("\u7c89\u4e1d\u6570",j.fan_num,Object(g.jsx)(X.a,{}),4),d("\u5173\u6ce8\u6570",j.subs_num,Object(g.jsx)(Z.a,{}),5),j.bio.length>4&&Object(g.jsxs)("div",{className:"fade-slide-animated",style:{marginTop:"15px",animationDelay:"0.6s"},children:[Object(g.jsx)("strong",{children:"\u7b80\u4ecb"}),Object(g.jsx)("div",{style:{color:"gray"},children:j.bio})]})]})})})]})});function d(e,t,n,a){return Object(g.jsx)(x.a,{className:"fade-slide-animated",title:e,value:t,prefix:n,style:{animationDelay:(.06*a).toString()+"s"}})}},ee=n(282),te=n(283),ne=j.a;function ae(e){var t=e.data,n=e.content,c=Object(a.useState)(20),s=Object(r.a)(c,2),i=s[0],l=s[1],o=Object(a.useState)(1),j=Object(r.a)(o,2),u=j[0],d=j[1],b=t.slice((u-1)*i,u*i);return Object(g.jsxs)(g.Fragment,{children:[n(b),Object(g.jsx)(ne,{align:"center",children:Object(g.jsx)(z.a,{showSizeChanger:!0,showQuickJumper:!0,onChange:function(e,t){d(e),l(t),window.scrollTo(0,0)},defaultCurrent:1,total:t.length,pageSize:i,pageSizeOptions:[20,40,60,100]})})]})}n(272);var ce=ee.a.Search;var se=function(){var e=Object(a.useState)("v"),t=Object(r.a)(e,2),n=t[0],c=t[1],s=Object(a.useState)([]),i=Object(r.a)(s,2),l=i[0],o=i[1],j=Object(a.useState)([]),u=Object(r.a)(j,2),d=u[0],b=u[1],O=Object(a.useState)(""),h=Object(r.a)(O,2),x=h[0],f=h[1],m=Object(a.useState)(""),v=Object(r.a)(m,2),p=v[0],y=v[1],S=Object(a.useState)(),N=Object(r.a)(S,2),w=N[0],T=N[1],z=Object(a.useState)(!0),D=Object(r.a)(z,2),k=D[0],B=D[1];return Object(g.jsx)(_,{title:"\u641c\u7d22",subTitle:w?(1e3*w).toString()+"ms":"",children:Object(g.jsxs)(E.b,{direction:"vertical",size:24,style:{width:"100%",marginLeft:"24px",marginRight:"24px"},children:[Object(g.jsx)(ce,{placeholder:"\u641c\u7d22"+("v"===n?"\u89c6\u9891":"\u7528\u6237"),className:"fade-slide-animated",size:"large",onChange:function(){return B(!0)},onSearch:function(e){!e&&k||("v"===n&&x!==e?(f(e),B(!1),T(null),C("/search",{type:"v",q:e},(function(e){o(e.data),T(e.interval.toString())}))):p!==e&&(y(e),B(!1),T(null),function(e,t){C("/search",{type:"u",q:e},t)}(e,(function(e){b(e.data),T(e.interval)}))))}}),Object(g.jsxs)(te.a.Group,{className:"fade-slide-animated",style:{animationDelay:"0.1s"},defaultValue:n,buttonStyle:"solid",onChange:function(e){return c(e.target.value)},children:[Object(g.jsx)(te.a.Button,{value:"v",children:"\u89c6\u9891"}),Object(g.jsx)(te.a.Button,{value:"u",children:"\u7528\u6237"})]}),Object(g.jsx)("h2",{className:"fade-slide-animated",children:"v"===n?x:p}),"v"===n&&l.length>0&&Object(g.jsx)(ae,{data:l,content:function(e){return Object(g.jsx)(I,{videos:e})}}),"u"===n&&d.length>0&&Object(g.jsx)(ae,{data:d,content:function(e){return Object(g.jsx)(H,{users:e})}}),("v"===n&&0===l.length||"u"===n&&0===d.length)&&Object(g.jsx)("div",{className:"fade-slide-animated",style:{height:"800px",animationDelay:"0.1s"},children:"\u8f93\u5165\u641c\u7d22\u5185\u5bb9"})]})})};var ie=function(){w.a.defaults.baseURL="http://localhost:8000";var e=Object(a.useState)(null),t=Object(r.a)(e,2),n=t[0],c=t[1],s=Object(a.useState)(null),i=Object(r.a)(s,2),j=i[0],u=i[1];return Object(a.useEffect)((function(){var e;e=function(e){return c(e)},C("/stats?type=v",null,(function(t){return e(t.data)})),function(e){C("/stats?type=u",null,(function(t){return e(t.data)}))}((function(e){return u(e)}))}),[]),Object(g.jsx)(o.a,{basename:"/2020-2021-Programming-Web",children:Object(g.jsxs)(l.d,{children:[Object(g.jsx)(l.b,{path:"/",exact:!0,render:function(){return Object(g.jsx)(S,{userNum:j,videoNum:n})}}),Object(g.jsx)(l.b,{path:"/videos/:page",component:function(){return Object(g.jsx)(q,{videoNum:n})}}),Object(g.jsx)(l.b,{path:"/users/:page",component:function(){return Object(g.jsx)(P,{userNum:j})}}),Object(g.jsx)(l.b,{path:"/video/:id",component:function(){return Object(g.jsx)(K,{})}}),Object(g.jsx)(l.b,{path:"/user/:id",component:function(){return Object(g.jsx)($,{})}}),Object(g.jsx)(l.b,{path:"/videos",component:function(){return Object(g.jsx)(l.a,{to:"/videos/1"})}}),Object(g.jsx)(l.b,{path:"/users",component:function(){return Object(g.jsx)(l.a,{to:"/users/1"})}}),Object(g.jsx)(l.b,{path:"/search",component:function(){return Object(g.jsx)(se,{})}})]})})};i.a.render(Object(g.jsx)(c.a.StrictMode,{children:Object(g.jsx)(ie,{})}),document.getElementById("root"))}},[[273,1,2]]]);
//# sourceMappingURL=main.7a6b581f.chunk.js.map