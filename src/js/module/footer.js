define(['jquery'],$ => {
    function Footer(){
        this.container = $("#footer-container");
        this.load();
    }

    //Object.assign(Footer.prototype,{

    //});

    //对象合并
    $.extend(Footer.prototype,{
        load(){
            //header.html加载到container里
            this.container.load('/html/module/footer.html');//选择加载文件中的某一部分
            
        }
    })

    return new Footer();
});