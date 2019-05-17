require.config({
    baseUrl : "/",
    paths : {
        "url" : "js/module/url",
        "jquery" : "libs/jquery/jquery-3.2.1",
        "header" : "js/module/header",
        "footer" : "js/module/footer",
        "bootstrap" : "libs/bootstrap/js/bootstrap.min",
        "template" : "libs/art-template/template-web",
        "cookie" : "libs/jquery-plugins/jquery.cookie",
        "zoom" : "libs/jquery-plugins/jquery.elevateZoom-3.0.8.min",
        "fly" : "libs/jquery-plugins/jquery.fly",
        "swiper" : "libs/swiper/js/swiper"
    },
    shim:{
        "bootstrap" : {
            deps:["jquery"]
        },
        "cookie" : {
            deps:["jquery"]
        },
        "zoom" : {
            deps:["jquery"]
        },
        "fly" : {
            deps:["jquery"]
        }
    }
})