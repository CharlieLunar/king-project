require(['require.config'],() => {
    require(['url','template','swiper','header','footer'],(url,template,Swiper) => {
        class Index{
            constructor(){
                this.getDisplay();
                this.banner();
            }
        //     //绑定头部登录事件
        //     bindEvents(){
        //         //由于登录键是通过header模块的异步加载得到的，所以在这里同步代码获取不到，使用时间委托
        //         $("#header-container").on('click',"#login-btn",() => {
        //             console.log(123);           
        //         })           
        //     }
            banner(){
                var mySwiper = new Swiper ('.swiper-container', {
                    direction: 'horizontal', // 水平切换选项
                    loop: true, // 循环模式选项
                    autoplay:true,
                    
                    // 如果需要分页器
                    pagination: {
                      el: '.swiper-pagination',
                    }
                }) 
                //鼠标覆盖停止自动切换
                mySwiper.el.onmouseover = function(){
                    mySwiper.autoplay.stop();
                }
                mySwiper.el.onmouseleave = function(){
                    mySwiper.autoplay.start();
                }
                // console.log($('.swiper-pagination-bullet'))
                // $('.swiper-pagination-bullet').each(function(index){
                //     $(this).on('mouseover',() => {
                //         $('.swiper-slide').hasClass('swiper-slide-duplicate-active').removeClass('swiper-slide-duplicate-active');
                //         $('.swiper-slide')[index].addClass('swiper-slide-duplicate-active');
                //         console.log(index)
                //     })
                // })

                // $('.swiper-pagination').on('mouseover',() => {
                //     mySwiper.autoplay.stop();
                // })
                // $('.swiper-pagination').on('mouseleave',() => {
                //     mySwiper.autoplay.start();
                // })
                // Array.from($('.swiper-pagination')).forEach(function (item, i) {
                //     btn.onclick = function () {
                //         index = i; // 现在的索引
                //         changeImg();
                //     }
                // })
            }


            getDisplay(){
                //发送ajax请求
                $.get(url.rapBaseUrl + 'index/display',data => {
                    if(data.res_code === 1){
                        this.renderDisplay(data.res_body.list);
                    }
                })
            }

            renderDisplay(list){
                let html = template("shop-display",{list});
                $("#index-display").html(html);
            }
        }
        new Index();
        
    })
})
