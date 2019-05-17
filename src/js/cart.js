require(['require.config'],() => {
    require(['template','header','footer','bootstrap'],(template,header) => {
        class Cart{
            constructor(){
                this.init();
                this.c = 0;//单选选中数量
                this.allChecked();
                this.checkChange();
            }

            init(){
                let cart = localStorage.getItem('cart');
                cart = JSON.parse(cart);
                if(cart === null || cart.length === 0){
                    console.log(cart === null || cart.length === 0)
                    let infoTitle = $(".info-title"),
                        allChecked = $(".all-checked"),
                        recommend = $(".recommend"),
                        calc = $(".calc");
                    let noCart = $(".no-cart");
                    infoTitle.hide();
                    allChecked.hide();
                    recommend.hide();
                    calc.hide();
                    noCart.show();
                }else{
                    //渲染列表
                    //cart = JSON.parse(cart);
                    this.render(cart);
                    let noCart = $(".no-cart");
                    let infoTitle = $(".info-title"),
                        allChecked = $(".all-checked"),
                        recommend = $(".recommend"),
                        calc = $(".calc");
                    noCart.hide();
                    infoTitle.show();
                    allChecked.show();
                    recommend.show();
                    calc.show();
                }
            }


            render(cart){
                $("#cart-container").html(template('cart-template',{cart}));
                this.getMoreNum();
                this.getLessNum();
                this.delClick();
                //this.totalCalc();
                
            }

            //全选
            allChecked(){
                let allChecked = document.querySelector("#all-checked");
                let checks = Array.from(document.querySelectorAll(".check"));
                allChecked.onchange = () => {
                    checks.forEach(check => {
                        check.checked = allChecked.checked;
                    })
                    this.c = allChecked.checked ? checks.length : 0;//修改C的值
                    this.numCalc();
                }
            }

            //单选
            checkChange(){
                let checks = Array.from(document.querySelectorAll(".check"));
                let allChecked = document.querySelector("#all-checked");
                checks.forEach(check => {
                    check.onchange = () => {
                        this.c += check.checked ? 1 : -1;
                        allChecked.checked = this.c === checks.length;
                        this.numCalc();
                    }
                })
                
            }

            //计算总价
            //遍历li，找到已勾选的商品，取出小计数据相加，赋值
            numCalc(){
                let aTr = $('.cart-shop');
                let totalPriceCalc = document.querySelector('.total-price-calc');
                let sPriceNum = 0; 
                $('.cart-shop').each(function(index){
                    let radioCheck = $(this).find(".info").find(".check");
                    
                    if(radioCheck.prop('checked')){
                        // let numMore = $(".num-more");
                        // numMore.on('click',() => {

                        // })
                        //console.log($(this).find(".total-price").find(".totalPrice"))
                        let sPrice = $(this).find(".total-price").find(".totalPrice");
                        //console.log(sPrice)
                        let s = Number(sPrice.html());
                        //console.log(s)
                        sPriceNum += s;
                        
                        //如果在选中状态下数量++，则
                    }
                    totalPriceCalc.innerHTML = sPriceNum.toFixed(2);
                })
                
            }

            // //计算选中数量
            // totalCalc(){
            //     //遍历li，找到已勾选的商品，取出input数据相加，赋值
            //     let aTr = $('.cart-shop');
            //     let totalNum = document.querySelector('.total-num');
            //     let count = 0;
            //     $('.cart-shop').each(function(index){
            //         let radioCheck = $(this).find(".info").find(".check"); 
            //         radioCheck.on("change",() => {
            //             if(radioCheck.prop('checked')){
            //                 let numInput = $(this).find(".num-choose").find(".num-input");
            //                 count += Number(numInput.val());
            //                 let numMore = $(this).find(".num-choose").find(".num-more");
            //                 numMore.on('click',() => {
            //                     count++;
            //                 })
            //             }else{
            //                 let numInput = $(this).find(".num-choose").find(".num-input");
            //                 count -= Number(numInput.val());
            //             }
            //             totalNum.innerHTML = count;
            //         })
            //     })
            // }

            delClick(){
                //循环li 找到每个li对应的删除按钮
                let aTr = $('.cart-shop');
                Array.from(aTr).forEach(tr => {
                    let delBtn = tr.querySelector('.delete');
                    delBtn.onclick = () => {
                        let cartShop = $(".cart-shop");
                        if(confirm("确认删除吗？")){
                            tr.remove();
                            //找到选择删除的商品的id
                            let id = Number(cartShop.attr("data-id"));
                            //从localStorage里取出cart
                            let cart = localStorage.getItem('cart');
                            cart = JSON.parse(cart);
                            //过滤掉要删除的商品
                            cart = cart.filter((shop,i) => {
                                return shop.id !== id;
                            });
                            //重新存cart
                            localStorage.setItem('cart',JSON.stringify(cart));
                            header.calcCartNum();

                            //删除一条信息后，要重新获取一次checks
                            let checks = Array.from(document.querySelectorAll(".check"));
                            let allChecked = document.querySelector("#all-checked");
                            //再从剩下的checks中重新计算c
                            this.c = 0;
                            checks.forEach(check => {
                                this.c += check.checked ? 1 : -1;
                            })
                            allChecked.checked = this.c === checks.length;
                            this.init();
                        }
                        this.checkChange();
                    }
                })
            }

            getMoreNum(){
                //列表页自定义属性，详情页可以不用
                //取到这条id对应的数据
                //把this.data存在localstorage里
                let numMore = $(".num-more");
                let numInput = $(".num-input");
                let aTr = $('.cart-shop');
                let _this = this;
                numMore.each(function(a){
                    $(this).on('click',() => {
                        // let totalNum = $('.total-num');
                        // let shopNum = totalNum.html();
                        let count = Number(numInput[a].value);
                        count++;
                        numInput[a].value = count;
                        //先把cart取出来
                        let cart = localStorage.getItem('cart');
                        let id = Number($(".cart-shop").attr("data-id"));
                        cart = JSON.parse(cart);
                        let index = -1;
                        if(cart.some((shop,i) => {
                            //some方法只要找到满足条件的就不会再继续了，所以index的值在最后就等于满足条件的索引
                            index = i;
                            return shop.id === id;
                        })){
                            //有这条数据
                            cart[index].num++;
                        }
                        //重新存cart
                        localStorage.setItem('cart',JSON.stringify(cart));
                        header.calcCartNum();
                        let salePrice = $(".now-price");
                        let totalPrice = $(".totalPrice");
                        let price = Number(salePrice[a].innerHTML);
                        totalPrice[a].innerHTML = `${(count*price).toFixed(2)}`;

                        //加数量时，找到对应的li，判断当前li下的单选框是否选中，若选中则获取总件数，总件数++，未选中则什么都不做
                        
                        // let trCheck = aTr[a].children[0].children[0];
                        // if(trCheck.checked){
                        //     shopNum++;
                        //     totalNum.innerHTML = shopNum;
                        // }
                        _this.numCalc();
                    })
                    
                })
            }

            getLessNum(){
                let numLess = $(".num-less");
                let numInput = $(".num-input");
                let aTr = $('.cart-shop');
                let _this = this;
                numLess.each(function(a){
                    $(this).on('click',() => {
                        // let totalNum = $('.total-num');
                        // let shopNum = totalNum.html();
                        let count = Number(numInput[a].value);
                        if(count <= 1){
                            count = 1; 
                        }else{
                            count--;
                        }
                        numInput[a].value = count;
                        //先把cart取出来
                        let cart = localStorage.getItem('cart');
                        let id = Number($(".cart-shop").attr("data-id"));
                        //console.log(id);
                        cart = JSON.parse(cart);
                        let index = -1;
                        if(cart.some((shop,i) => {
                            //some方法只要找到满足条件的就不会再继续了，所以index的值在最后就等于满足条件的索引
                            index = i;
                            return shop.id === id;
                        })){
                            //有这条数据
                            //购物车数量不能少于商品种类数
                            if(cart[index].num <= 1){
                                cart[index].num = 1;
                            }else{
                                cart[index].num--;
                            }
                        }
                        //重新存cart
                        localStorage.setItem('cart',JSON.stringify(cart));
                        header.calcCartNum();
                        let salePrice = $(".now-price");
                        let totalPrice = $(".totalPrice");
                        let price = Number(salePrice[a].innerHTML);
                        totalPrice[a].innerHTML = `${(count*price).toFixed(2)}`;

                        // let trCheck = aTr[a].children[0].children[0];
                        // if(trCheck.checked){
                        //     //循环找到已勾选的商品，把它们的input值相加，shopNum不能小于它们的和
                        //     if(count > 1){
                        //         shopNum--;
                        //         // totalNum.innerHTML = shopNum;
                        //         console.log(111)
                        //     }else if(count === 1){
                        //         console.log(222)
                        //         let aTr = $('.cart-shop');
                        //         let checkedNum = 0;
                        //         $('.cart-shop').each(function(index){
                        //             let radioCheck = $(this).find(".info").find(".check"); 
                        //             if(radioCheck.prop('checked')){
                        //                 let numInput = $(this).find(".num-choose").find(".num-input");
                        //                 let calcNum = Number(numInput.val());
                        //                 checkedNum += calcNum;
                        //                 shopNum = checkedNum;
                        //             }
                        //         })
                                
                        //     }
                        //     totalNum.innerHTML = shopNum;
                            
                        // }
                        _this.numCalc();
                    })
                })
            }
        }
        new Cart();
    })
})