(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[3],{"62cc":function(t,i,a){"use strict";a.r(i);var e=function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("q-layout",{staticStyle:{"min-height":"100vh"},attrs:{container:""}},[a("q-page-container",{staticClass:"scroll"},[a("q-page",[a("div",{staticClass:"q-pa-xl"},[a("div",{staticClass:"q-pa-xl text-center text-weight-bold text-h4 text-primary"},[t._v("FoodYork")]),a("div",{staticClass:"q-gutter-y-md"},[a("q-btn",{staticClass:"full-width",attrs:{unelevated:"",color:"primary",size:"18px"},on:{click:function(i){t.dialogLogin=!0}}},[a("div",[t._v("帳號登入")])]),a("q-separator",{attrs:{inset:"",spaced:"lg"}}),a("q-btn",{staticClass:"full-width",staticStyle:{color:"#3B5998"},attrs:{unelevated:"",outline:"",size:"18px"}},[a("div",[t._v("用Facebook登入")])]),a("q-btn",{staticClass:"full-width",staticStyle:{color:"#00B900"},attrs:{unelevated:"",outline:"",size:"18px",label:"用Line登入"},on:{click:t.oauthLine}}),a("q-btn",{staticClass:"full-width",attrs:{unelevated:"",outline:"",color:"black",size:"18px",label:"用Google登入"}})],1)]),a("q-dialog",{attrs:{persistent:"",maximized:!0,"transition-show":"slide-up","transition-hide":"slide-down"},model:{value:t.dialogLogin,callback:function(i){t.dialogLogin=i},expression:"dialogLogin"}},[a("div",{staticClass:"bg-white"},[a("q-toolbar",{staticClass:"text-center"},[a("q-btn",{attrs:{flat:"",round:"",dense:"",color:"primary",icon:"keyboard_arrow_left"},on:{click:function(i){t.dialogLogin=!1}}}),a("q-toolbar-title",[t._v("帳號登入")]),a("q-btn",{staticClass:"invisible"})],1),a("div",{staticClass:"q-pa-xl"},[a("Login",{attrs:{calss:"absolute-center",isLoading:t.isLoading},on:{onLogin:t.onLogin}}),a("div",{staticClass:"q-pt-lg"},[t._v("沒有帳號？")]),a("q-btn",{staticClass:"full-width",attrs:{unelevated:"",outline:"",color:"primary",size:"18px",label:"註冊新帳號"},on:{click:function(i){t.dialogRegister=!0}}})],1)],1)]),a("q-dialog",{attrs:{persistent:"",maximized:!0,"transition-show":"slide-left","transition-hide":"slide-right"},model:{value:t.dialogRegister,callback:function(i){t.dialogRegister=i},expression:"dialogRegister"}},[a("div",{staticClass:"bg-white"},[a("q-toolbar",{staticClass:"text-center"},[a("q-btn",{attrs:{flat:"",round:"",dense:"",color:"primary",icon:"keyboard_arrow_left"},on:{click:function(i){t.dialogRegister=!1}}}),a("q-toolbar-title",[t._v("帳號註冊")]),a("q-btn",{staticClass:"invisible"})],1),a("div",{staticClass:"q-pa-xl"},[a("Register"),a("div",{staticClass:"q-pt-lg"},[t._v("\n              點擊註冊表示您同意\n              "),a("a",{attrs:{target:"_blank",href:"http://www.google.com"}},[t._v("資料使用政策及條款")])])],1)],1)])],1)],1)],1)},s=[],o=(a("e6cf"),a("a79d"),{data(){return{dialogLogin:!1,dialogRegister:!1,isLoading:!1}},computed:{},async beforeCreate(){},methods:{onLogin(t){this.isLoading=!0,this.$user.login(t).then((t=>{this.onLoginSuccess()})).catch((t=>{this.$q.dialog({title:"帳號或密碼錯誤",message:"請重新輸入"})})).finally((()=>{console.log(123),this.isLoading=!1}))},oauthLine(){this.$router.push({path:"/line"})},onLoginSuccess(){this.$q.notify({message:"登入成功",type:"positive",position:"center",timeout:2e3}),this.$router.push("/")}}}),l=o,n=(a("b897"),a("2877")),r=a("4d5a"),c=a("09e3"),d=a("9989"),g=a("9c40"),u=a("0016"),p=a("eb85"),b=a("24e8"),h=a("65c6"),v=a("6ac5"),f=a("eebe"),q=a.n(f),w=Object(n["a"])(l,e,s,!1,null,"230f6a41",null);i["default"]=w.exports;q()(w,"components",{QLayout:r["a"],QPageContainer:c["a"],QPage:d["a"],QBtn:g["a"],QIcon:u["a"],QSeparator:p["a"],QDialog:b["a"],QToolbar:h["a"],QToolbarTitle:v["a"]})},8182:function(t,i,a){},b897:function(t,i,a){"use strict";a("8182")}}]);