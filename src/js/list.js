//列表页的业务逻辑
require(['require.config'],() => {
    require(['url','template','header','footer','bootstrap'],(url,template) => {
        class List{
            constructor(){
                this.getData();
            }
            //请求列表数据
            getData(){
                //发送ajax请求数据
                // $.ajax({
                //     url: url.rapBaseUrl + "list/get",
                //     type: 'get',
                //     data: {}, //query 发送请求的时候携带的参数
                //     dataType: "json", // 传输数据格式 'text' 'html' 'json'
                //     success: function(data){console.log(data)}, //成功的回调
                //     error: function(){}, // 请求失败的回调
                //     complete: function(){} //无论成功与否都会调用的回调
                // })
                $.ajax({
                        url: url.rapBaseUrl + "list/get",
                        type: 'get',
                        dataType: "json", 
                        success: data => {
                            if(data.res_code === 1) this.render(data.res_body.list);
                        }
                    })
            }
            render(list){
                $("#list-shop").html(template('list-template',{list}));
            }
        }
        
        new List();
    })
})