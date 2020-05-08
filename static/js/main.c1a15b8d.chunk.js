(this["webpackJsonpexchange-rate-checker"]=this["webpackJsonpexchange-rate-checker"]||[]).push([[0],{53:function(e,t,n){e.exports=n(62)},59:function(e,t,n){},62:function(e,t,n){"use strict";n.r(t);var a=n(8),r=n.n(a),c=n(50),u=n.n(c),s=n(35),o=n.n(s),l=n(44),i=n(30),f=(n(59),n(51)),m=n.n(f),h=function(e){var t=e.base,n=e.currency,c=e.currencyData,u=Object(a.useState)(),s=Object(i.a)(u,2),o=s[0],l=s[1];return Object(a.useEffect)((function(){window.onresize=function(){return null===o||void 0===o?void 0:o.resize()}})),Object(a.useEffect)((function(){null===o||void 0===o||o.destroy(),l(function(e,t,n){var a=document.getElementById("chart");if(!a)return;for(var r=[],c=6;c>=0;c--){var u=new Date;u.setMonth(u.getMonth()-c),r.push(u.toLocaleString("default",{month:"long"}))}return new m.a(a.getContext("2d"),{type:"line",data:{labels:r,datasets:[{label:"".concat(t," in ").concat(e),data:n,backgroundColor:"rgba(0, 0, 0, 0.4)",borderColor:"#4E4E4E",borderWidth:3}]}})}(t,n,c))}),[t,n,c]),r.a.createElement("div",{className:"chart"},r.a.createElement("canvas",{id:"chart"}))};var p=function(e){var t=e.base,n=e.currency,a=e.rate;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"subtitle"},"1 ",t," equals"),r.a.createElement("div",{className:"title"},a," ",n))},d=function(e){var t=e.rate,n=Object(a.useState)("1"),c=Object(i.a)(n,2),u=c[0],s=c[1],o=Object(a.useState)(""),l=Object(i.a)(o,2),f=l[0],m=l[1];return Object(a.useEffect)((function(){t&&(s("1"),m((1*t).toString()))}),[t]),r.a.createElement("tr",{className:"calculator"},r.a.createElement("td",null,r.a.createElement("input",{className:"calculator__base",value:u,onChange:function(e){var n=b(e.currentTarget.value);s(n),m(b((+n*t).toString()))},type:"text",autoFocus:!0})),r.a.createElement("td",{className:"spacing"}),r.a.createElement("td",null,r.a.createElement("input",{className:"calculator__currency",value:f,onChange:function(e){var n=b(e.currentTarget.value);m(n),s(b((+n/t).toString()))},type:"text"})))};function b(e){if(!isNaN(+e.slice(0,e.length-1))&&"e"===e[e.length-1])return e;for(;isNaN(+e);)e=e.slice(0,e.length-1);return e}var v=function(e){var t=e.currenciesNames,n=e.base,c=e.currency,u=e.handleBaseChange,s=e.handleCurrencyChange;return Object(a.useEffect)((function(){if(t){var e=document.querySelector(".select__base"),a=document.querySelector(".select__currency");Object.entries(t).sort((function(e,t){return e[1]>t[1]?1:-1})).forEach((function(e){var t=Object(i.a)(e,2),r=t[0],u=t[1],s=document.createElement("option");s.value=r,s.textContent=u.toString();var o=s.cloneNode(!0);n===r&&(s.selected=!0),c===r&&(o.selected=!0),null===a||void 0===a||a.append(o)}));var r=document.createElement("option");r.value=n,r.textContent=t[n],null===e||void 0===e||e.append(r)}}),[t]),r.a.createElement("tr",{className:"select"},r.a.createElement("td",null,r.a.createElement("select",{className:"select__base",onChange:u})),r.a.createElement("td",{className:"spacing"}),r.a.createElement("td",null,r.a.createElement("select",{className:"select__currency",onChange:s})))},E=function(){var e=Object(a.useState)(),t=Object(i.a)(e,2),n=t[0],c=t[1],u=Object(a.useState)("USD"),s=Object(i.a)(u,2),f=s[0],m=s[1],b=Object(a.useState)("RUB"),E=Object(i.a)(b,2),j=E[0],O=E[1],N=Object(a.useState)(),x=Object(i.a)(N,2),S=x[0],w=x[1];function C(){return(C=Object(l.a)(o.a.mark((function e(t){var n,a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.currentTarget.value,e.next=3,y(n,j);case 3:a=e.sent,w(a),m(n),n===j&&O(f);case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function _(){return(_=Object(l.a)(o.a.mark((function e(t){var n,a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.currentTarget.value,e.next=3,y(f,n);case 3:a=e.sent,w(a),O(n);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}Object(a.useEffect)((function(){(function(){return g.apply(this,arguments)})().then(c)}),[]),Object(a.useEffect)((function(){y(f,j).then(w)}),[]);var k=n?n[f]:f,B=n?n[j]:j,D=S?S[S.length-1]:null;return r.a.createElement("div",{className:"app"},r.a.createElement("div",{className:"content"},r.a.createElement(p,{base:k,currency:B,rate:D}),r.a.createElement("table",null,r.a.createElement("tbody",null,r.a.createElement(d,{rate:D}),r.a.createElement(v,{currenciesNames:n,base:f,currency:j,handleBaseChange:function(e){return C.apply(this,arguments)},handleCurrencyChange:function(e){return _.apply(this,arguments)}})))),r.a.createElement(h,{currencyData:S,base:k,currency:B}))};function g(){return(g=Object(l.a)(o.a.mark((function e(){var t,n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://openexchangerates.org/api/currencies.json");case 2:return(n=e.sent).ok||console.error("Error loading currencies names"),e.next=6,n.json();case 6:return t=e.sent,e.abrupt("return",t);case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function y(e,t){return j.apply(this,arguments)}function j(){return(j=Object(l.a)(o.a.mark((function e(t,n){var a,r;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=[],r=O(t,n),e.next=4,Promise.all(r).then((function(e){e.forEach((function(e){return a.push(e.rates[n])}))}));case 4:return e.abrupt("return",a.reverse());case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function O(e,t){for(var n=[],a=0;a<7;a++){var r=new Date;r.setMonth(r.getMonth()-a);var c=r.toJSON().slice(0,10),u=new URL("https://openexchangerates.org/api/historical/"+c+".json");u.searchParams.set("app_id","e785e47f3cc94b4bbcf8ec131d31a076"),u.searchParams.set("base",e),u.searchParams.set("symbols",t),n.push(fetch(u.toString()).then((function(e){return e.ok||console.error("Error loading currency data"),e.json()})))}return n}u.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(E,null)),document.getElementById("root"))}},[[53,1,2]]]);
//# sourceMappingURL=main.c1a15b8d.chunk.js.map