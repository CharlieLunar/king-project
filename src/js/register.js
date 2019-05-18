require(['require.config'],() => {
    require(['url','jquery'],(url) => {
        class Register{
            constructor(){
                this.userNameInput = $("#inputUserName");
                this.userPromptInfo = $(".user-prompt-info");
                this.passwordInput = $("#inputPassword");
                this.pwdPromptInfo = $(".pwd-prompt-info");
                this.pwdConfirm = $("#pwdConfirm");
                this.btn = $("#submit");
                this.checkbox = $("#checkbox");
                this.bindEvents();
                this.regTest();
            }
            bindEvents(){
                this.btn.on("click",() => {
                    //取用户名和密码提交后台
                    let username = this.userNameInput.val(),
                        password = this.passwordInput.val(),
                        pwdConfirm = this.pwdConfirm.val();
                    
                    if(username === "" || password === ""){
                        alert("用户名或密码不能为空")
                    }else{
                        if(this.checkbox.prop('checked')){
                            if(pwdConfirm === password){
                                $.ajax({
                                    url: url.phpBaseUrl + "user/register.php",
                                    type : "post",
                                    data: {username,password}, //解构赋值
                                    success: data => {
                                        console.log(data);
                                        if(data.res_code === 1){
                                            alert(data.res_message + ",即将跳转登录页");
                                            location.href = '/html/login.html';
                                        }else{
                                            alert(data.res_message);
                                        }
                                    },
                                    dataType: 'json'
                                })
                            }else{
                                alert("密码输入不一致，请重新输入");
                            }
                        }else{
                            alert("请阅读相关服务条款和隐私政策");
                        }
                    }
                })
            }

            regTest(){
                // 用户名为6~18位的数字
                // 密码为只包含数字或字母的6位以上
                let name = /^[a-zA-Z0-9_]{3,16}$/;
                    // pwd = /^[a-z]||[0-9]||[A-Z].{5,}/;
                    
                // if(name.test(username) && pwd.test(password)){
                    
                // }
                this.passwordInput.on('click',() => {
                    let username = this.userNameInput.val();
                    if(name.test(username)){
                        this.userPromptInfo.hide();
                    }else{
                        this.userPromptInfo.show();
                    }
                })
                // this.pwdConfirm.on('click',() => {
                //     let password = this.passwordInput.val();
                //     if(pwd.test(password)){
                //         this.pwdPromptInfo.hide();
                //     }else{
                //         this.pwdPromptInfo.show();
                //     }
                // })
            }
        }

        new Register();
    })
})