require(['require.config'],() => {
    require(['url','jquery'],(url) => {
        class Register{
            constructor(){
                this.userNameInput = $("#inputUserName");
                this.passwordInput = $("#inputPassword");
                this.pwdConfirm = $("#pwdConfirm");
                this.btn = $("#submit");
                this.checkbox = $("#checkbox");
                this.bindEvents();
            }
            bindEvents(){
                this.btn.on("click",() => {
                    //取用户名和密码提交后台
                    let username = this.userNameInput.val(),
                        password = this.passwordInput.val(),
                        pwdConfirm = this.pwdConfirm.val();

                    // if(pwdConfirm === password){
                    //     $.ajax({
                    //         url: url.phpBaseUrl + "user/register.php",
                    //         type : "post",
                    //         data: {username,password}, //解构赋值
                    //         success: data => {
                    //             console.log(data);
                    //             if(data.res_code === 1){
                    //                 alert(data.res_message + ",即将跳转登录页");
                    //                 location.href = '/html/login.html';
                    //             }else{
                    //                 alert(data.res_message);
                    //             }
                    //         }
                    //     })
                    // }else{
                    //     alert("密码输入不一致，请重新输入");
                    // }



                    if(username === "" || password === ""){
                        alert("用户名或密码不能为空");
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
                    
                        // if(pwdConfirm !== password){
                        //     alert("密码输入不一致，请重新输入");
                        // }else{
                        //     if(this.checkbox.prop('checked')){
                        //         $.ajax({
                        //                     url: url.phpBaseUrl + "user/register.php",
                        //                     type : "post",
                        //                     data: {username,password}, //解构赋值
                        //                     dataType: 'json',
                        //                     success: data => {
                        //                         if(data.res_code === 1){
                        //                             alert(data.res_message + ",即将跳转首页");
                        //                         }else{
                        //                             alert(data.res_message);
                        //                         }
                        //                     }
                                            
                           
                        //          })
                        //     }else{
                        //         alert("请阅读相关服务条款和隐私政策")
                        //     }
                        // }
                    


                    // $.ajax({
                    //         url: url.phpBaseUrl + "user/register.php",
                    //         type : "post",
                    //         data: {username,password}, //解构赋值
                    //         success: data => {
                    //             if(data.res_code === 1){

                    //                 if(pwdConfirm === password){
                    //                     
                    //                         alert(data.res_message + ",即将跳转首页");
                    //                         location.href = '/';
                    //                    
                    //                 }else{
                    //                     alert("密码输入不一致，请重新输入");
                    //                 }
                    //             }else{
                    //                 alert(data.res_message);
                    //             }
                    //         },
                    //         dataType: 'json'
                    //     })
                })
            }
        }

        new Register();
    })
})