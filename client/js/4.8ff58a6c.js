(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[4],{"4de0":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-layout",{staticStyle:{"min-height":"100vh"},attrs:{container:""}},[a("q-header",[a("q-toolbar",{staticClass:"bg-primary"},[a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",dense:"",icon:"arrow_back","text-color":"white",to:"/"}}),a("q-toolbar-title",{staticClass:"text-weight-bold text-white"},[t._v("通知訊息")])],1)],1),a("q-page-container",{staticClass:"scroll"},[a("q-page",[a("q-card",{staticStyle:{"min-height":"100vh"}},[a("q-list",{staticClass:"rounded-borders",attrs:{bordered:"",separator:"",padding:""}},t._l(20,(function(e){return a("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],key:e,attrs:{clickable:""},on:{click:function(a){return t.notification(e)}}},[a("q-item-section",{attrs:{avatar:""}},[a("q-avatar",[a("img",{attrs:{src:"https://cdn.quasar.dev/img/boy-avatar.png"}})])],1),a("q-item-section",[a("q-item-label",[t._v("消息標題"+t._s(e))]),a("q-item-label",{attrs:{caption:"",lines:"1"}},[t._v("副標題")])],1),a("q-item-section",{attrs:{side:""}},[t._v("\n              "+t._s((new Date).toDateString())+"\n            ")])],1)})),1)],1)],1),a("q-dialog",{attrs:{persistent:"",maximized:!0,"transition-show":"slide-up","transition-hide":"slide-down"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[a("notification-detail",{attrs:{news:t.selectnew}})],1)],1)],1)},n=[],o={data(){return{selectnew:{},dialog:!1}},computed:{},mounted(){},methods:{notification(t){this.selectnew.title=t,this.dialog=!0}}},s=o,r=(a("52f8"),a("2877")),c=a("4d5a"),l=a("e359"),d=a("65c6"),p=a("9c40"),u=a("6ac5"),m=a("09e3"),b=a("9989"),g=a("f09f"),f=a("1c1c"),v=a("66e5"),w=a("4074"),h=a("cb32"),q=a("0170"),Q=a("24e8"),_=a("7f67"),k=a("714f"),y=a("eebe"),C=a.n(y),x=Object(r["a"])(s,i,n,!1,null,"7e6d33be",null);e["default"]=x.exports;C()(x,"components",{QLayout:c["a"],QHeader:l["a"],QToolbar:d["a"],QBtn:p["a"],QToolbarTitle:u["a"],QPageContainer:m["a"],QPage:b["a"],QCard:g["a"],QList:f["a"],QItem:v["a"],QItemSection:w["a"],QAvatar:h["a"],QItemLabel:q["a"],QDialog:Q["a"]}),C()(x,"directives",{ClosePopup:_["a"],Ripple:k["a"]})},"52f8":function(t,e,a){"use strict";a("cd49")},cd49:function(t,e,a){}}]);