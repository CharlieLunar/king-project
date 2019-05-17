require(['require.config'],() => {
    require(['url','jquery','cookie'],(url,$) => {
        class Login{
            constructor(){
                this.userNameInput = $("#inputUserName");
                this.passwordInput = $("#inputPassword");
                this.btn = $("#login-btn");
                this.remember = $("#remember");
                this.bindEvents();
            }

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
            }

            loginSucc(username){
                //存cookie
                let expires = this.remember.prop('checked') ? {expires:7} : {};

                expires = Object.assign({path: "/"},expires);

                $.cookie('username',username,expires);

                alert('登录成功,即将跳转首页');
                location.href = "/";
            }
        }
        new Login();
    })
})