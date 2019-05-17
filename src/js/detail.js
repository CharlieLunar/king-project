require(['require.config'],() => {
    require(['url','template','header','footer','zoom','fly'],(url,template,header) => {
        class Detail{
            constructor(){
                this.init();
                this.getMoreNum();
                this.getLessNum();
                this.addCart();
            }

            init(){
                //从url取到id,携带id请求详情数据
                let id = Number(location.search.slice(4));
                $.get(url.rapBaseUrl + "detail/get",{id},res => {
                    if(res.res_code === 1){
                        let {data} = res.res_body;
                        //data展开成 title:"abc",pice:100
                        //再在后面解构赋值增加一个id字段
                        //{title: "abc", price: 100, id: id}
                        //当接口变成真实接口时，这句代码不需要
                        data = {...data,id};
                        this.data = data;
                        this.render(data);
                    }
                })
            }

            render(data){
                $("#detail").html(template("detail-template",{data}));
                //zoom在$原型(prototype上新增了一个方法)
                //$("div")就是$的实例，所以就能访问elevateZoom方法
                this.zoom();
            }

            getMoreNum(){
                // $("#num-more").on('click',() => {
                //     let count = $("#num-choose").val();
                //     console.log($("#num-more"));
                // })
                
                $("#detail").on('click','#num-more',e => {
                    let count = $("#num-choose").val();
                    count++;
                    $("#num-choose").val(count);
                })
                
            }

            getLessNum(){
                $("#detail").on('click','#num-less',e => {
                    let count = $("#num-choose").val();
                    if(count <= 1){
                        count = 1;
                    }else{
                        count--;
                    }
                    $("#num-choose").val(count);
                })
            }

            addCart(){
                //事件委托
                $("#detail").on('click','#add-cart',e => {
                    alert('商品已加入购物车')
                    //完成抛物线加购物车功能
                    $(`<img src='${this.data.images[0]}' style='width:30px;height:30px;'>`).fly({
                        start: {
                            left: e.clientX,
                            top: e.clientY
                        },
                        end: {
                            left: $("#aside-cart-num").offset().left,
                            top: $("#aside-cart-num").offset().top
                        },
                        onEnd: function(){
                            this.destroy();//销毁抛物体
                            header.calcCartNum();
                        }
                    })
                    //列表页自定义属性，详情页可以不用
                    //let id = $(this).attr("data-id");
                    //取到这条id对应的数据
                    //把this.data存在localstorage里

                    //点击加入购物车时，从input中取出数量
                    let count = Number($("#num-choose").val());

                    //先把cart取出来
                    let cart = localStorage.getItem('cart');
                    if(cart){
                        cart = JSON.parse(cart);
                        //已经存过购物车了
                        //判断有没有当前商品
                        let index = -1;
                        if(cart.some((shop,i) => {
                            //some方法只要找到满足条件的就不会再继续了，所以index的值在最后就等于满足条件的索引
                            index = i;
                            return shop.id === this.data.id;
                        })){
                            //有这条数据
                            cart[index].num += count;
                        }else{
                            //没有这条数据
                            cart.push({...this.data,num: count});
                        }


                    }else{
                        //购物车为空
                        //第一次加入购物车的时候只买一个
                        cart = [{...this.data,num: count}];
                    }
                    //重新存cart
                    localStorage.setItem('cart',JSON.stringify(cart));

                })
            }

            zoom(){
                //放大镜插件
                $(".zoom-img").elevateZoom({ 
                    gallery: 'gal1',
                    cursor: 'pointer',
                    galleryActiveClass: 'active',
                    borderSize: '1',
                    borderColor: '#888'
                });
            }
        }
        new Detail();
    })
})