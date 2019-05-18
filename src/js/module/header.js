//import { resolve } from "dns";

//import { resolve } from "path";

//定义一个模块的时候就要依赖其他模块，可以直接传进来
define(['url','jquery','bootstrap','cookie'],(url,$) => {
    function Header(){
        this.container = $("#header-container");
        //this.cartClick = $(".cart-click");
        this.load().then(() => {
            this.search();
            this.isLogin();
            this.login();
            this.calcCartNum();
        });
    }

    //Object.assign(Header.prototype,{

    //});

    //对象合并
    $.extend(Header.prototype,{
        load(){
            return new Promise(resolve => {
                //header.html加载到container里
                //this.container.load('/html/module/header.html #header-bottom');//选择加载文件中的某一部分
                this.container.load('/html/module/header.html',() => {
                    //load异步执行结束
                    resolve();
                });
            })
        },

        search(){
            //搜索框功能
            //找到container里面的所有.search-form
            //let form = this.container.find(".search-form")

            $("#search-input").on('keyup',function(){
                let keyWords = $(this).val(); //jquery写法
                //带上关键字请求jsonp接口
                $.getJSON('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?cb=?&wd='+keyWords,data =>{
                    console.log(data);
                })
            })
        },

        login(){
            this.userNameInput = $("#inputUserName");
            this.passwordInput = $("#inputPassword");
            this.btn = $("#login-btn");
            this.remember = $("#remember");
            this.bindEvents();
        },

        bindEvents(){
            this.btn.on('click',() => {
                let username = this.userNameInput.val(),
                    password = this.passwordInput.val();

                $.ajax({
                    url: url.phpBaseUrl + "user/login.php",
                    type: "post",
                    data: {username,password}, //解构赋值
                    success: data => {
                        if(data.res_code === 1){
                            this.loginSucc(username);
                            
                        }else{
                            alert(data.res_message);
                        }
                    },
                    dataType: 'json'
                })
            })
        },

        loginSucc(username){
            // let addModel = $("#addModel");
            //存cookie
            let expires = this.remember.prop('checked') ? {expires:7} : {};

            expires = Object.assign({path: "/"},expires);

            $.cookie('username',username,expires);

            alert('登录成功');
            location.href = "/";

            // this.addModel.hide();
        },

        isLogin(){
            this.loginBtn = $("#login");
            this.afterLogin = $("#after-login");
            this.nameSpan = $("#name");
            this.exit = $("#exit");
            this.icon = $("#login-icon");
            let username = $.cookie("username");
            if(username){
                this.loginBtn.hide();
                this.afterLogin.show();
                this.icon.hide();
                this.nameSpan.html(username);
            }
            this.exit.on('click',() => {
                //退出登录
                if(confirm("确定要退出吗？")){
                    $.removeCookie("username",{path: '/'});
                    this.loginBtn.show();
                    this.afterLogin.hide();
                }
               
            })
        },

        calcCartNum(){
            let cart = localStorage.getItem('cart');
            let num = 0;
            if(cart){
                //计算总数量
                cart = JSON.parse(cart);
                //num放的是商品总数量或者种类数
                //此处以总数量为例
                num = cart.reduce((n,shop) => {
                    n += shop.num;
                    return n;
                },0);
            }
            $("#cart-num").html(num);
            $("#aside-cart-num").html(num);
        }
    })

    return new Header();
});