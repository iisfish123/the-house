var doc = document,
    heads = doc.getElementsByTagName("head");

// 测试码 coding 输出 相应 console
var TEST_CODING = ['FvnK9S', 'Bog5ub'];

//是否已经进行了 看到powerby的埋点click
var HAS_CLICKLOG = false;



function in_array (coding, arr) {
    return arr.indexOf(coding);
}
/*
 * Javascript base64Decode() base64解密函数
   用于解密base64加密的字符串
 * @param string input base64加密字符串
 * @return string 解密后的字符串
*/
function base64Decode(input){
        rv = window.atob(input);
        rv = escape(rv);
        rv = decodeURIComponent(rv);
        return rv;
}
// 转换为数字
function intval(v) {
    v = parseInt(v);
    return isNaN(v) ? 0 : v;
}
//DOM没有提供insertAfter()方法
function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        // 如果最后的节点是目标元素，则直接添加。因为默认是最后
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
        //如果不是，则插入在目标元素的下一个兄弟节点 的前面。也就是目标元素的后面
    }
}
// 获取元素信息
function getPos(e) {
    var l = 0;
    var t = 0;
    var w = intval(e.style.width);
    var h = intval(e.style.height);
    var wb = e.offsetWidth;
    var hb = e.offsetHeight;
    while (e.offsetParent) {
        l += e.offsetLeft + (e.currentStyle ? intval(e.currentStyle.borderLeftWidth) : 0);
        t += e.offsetTop + (e.currentStyle ? intval(e.currentStyle.borderTopWidth) : 0);
        e = e.offsetParent;
    }
    l += e.offsetLeft + (e.currentStyle ? intval(e.currentStyle.borderLeftWidth) : 0);
    t += e.offsetTop + (e.currentStyle ? intval(e.currentStyle.borderTopWidth) : 0);
    return {
        x: l,
        y: t,
        w: w,
        h: h,
        wb: wb,
        hb: hb
    };
}
var createAjax = function(){
    var xhr=null;
    try {
        xhr=new ActiveXObject("microsoft.xmlhttp"); // IE系列浏览器
    } catch(e1) {
        try{
            xhr=new XMLHttpRequest(); // 非IE浏览器
        } catch(e2) {
            window.alert("您的浏览器不支持ajax，请更换！");
        }
    }
    return xhr;
};

/* 判断是不是 json 字符串*/
function isJson(str) {
    if (typeof str == 'string') {
        try {
            JSON.parse(str);
            return true;
        } catch (e) {
            return false;
        }
    }
}

var ajax = function(conf) {
    var type=conf.type; // type参数,可选
    var url=conf.url; // url参数，必填
    var data= conf.data; // data参数可选，只有在post请求时需要

    var dataType=conf.dataType; // datatype参数可选
    var success=conf.success; // 回调函数可选
    if (type == null) {
        type="get"; // type参数可选，默认为get
    }
    if (dataType == null){
        dataType="text"; // dataType参数可选，默认为text
    }
    var xhr = createAjax();
    xhr.open(type,url,true);
    if (type=="GET" || type=="get") {
        xhr.send(null);
    } else if (type=="POST" || type=="post") {
        xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
        xhr.send(data);
    }
    xhr.onreadystatechange=function(){
        if ((xhr.readyState == 4) && (xhr.status == 200)) {
            if (dataType=="text" || dataType=="TEXT"){
                if (success != null){
                    success(xhr.responseText); // 普通文本
                }
            } else if(dataType=="xml" || dataType=="XML"){
                if (success != null){
                    success(xhr.responseXML); // 接收xml文档
                }
            } else if (dataType=="json" || dataType=="JSON"){
                if (success != null) {
                    success(eval("("+xhr.responseText+")")); //将json字符串转换为js对象
                }
            }
        }
    };
}
var ajax_jsonp = function(params) {
    params = params || {};
    params.data = params.data || {};
    var json = params.jsonp ? jsonp(params) : json(params);

    function jsonp(params) {
        //创建script标签并加入到页面中
        var callbackName = params.jsonp;
        var head = document.getElementsByTagName('head')[0];
        // 设置传递给后台的回调参数名
        params.data['callback'] = callbackName;
        var data = formatParams(params.data);
        var script = document.createElement('script');
        head.appendChild(script);

        var isSettimeOut = false;
        //创建jsonp回调函数
        window[callbackName] = function(json) {
            head.removeChild(script);
            clearTimeout(script.timer);
            window[callbackName] = null;
            if (!isSettimeOut) {
                params.success && params.success(json);
            }
        };
        //发送请求
        script.src = params.url + '?' + data;

        //为了得知此次请求是否成功，设置超时处理
        if(params.time) {
            script.timer = setTimeout(function() {
                isSettimeOut = true;
                params.error && params.error({
                    message: '超时'
                });
            }, params.time);
        }
    };

    //格式化参数
    function formatParams(data) {
        var arr = [];
        for(var name in data) {
            arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
        };
        // 添加一个随机数，防止缓存

        arr.push('v=' + random());
        return arr.join('&');
    }
        // 获取随机数
    function random() {
        return Math.floor(Math.random() * 10000 + 500);
    }
}
function getScrollTop(){
　　var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
　　if(document.body){
　　　　bodyScrollTop = document.body.scrollTop;
　　}
　　if(document.documentElement){
　　　　documentScrollTop = document.documentElement.scrollTop;
　　}
　　scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
　　return scrollTop;
}
//文档的总高度
function getScrollHeight(){
　　var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
　　if(document.body){
　　　　bodyScrollHeight = document.body.scrollHeight;
　　}
　　if(document.documentElement){
　　　　documentScrollHeight = document.documentElement.scrollHeight;
　　}
　　scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
　　return scrollHeight;
}
//浏览器视口的高度
function getWindowHeight(){
　　var windowHeight = 0;
　　if(document.compatMode == "CSS1Compat"){
　　　　windowHeight = document.documentElement.clientHeight;
　　}else{
　　　　windowHeight = document.body.clientHeight;
　　}
　　return windowHeight;
}
// 获取滚动条信息
function getScroll(obj) {
    var t, l, w, h;
    var height=window.screen.height ;
    if (document.documentElement && document.documentElement.scrollTop) {
        t = document.documentElement.scrollTop;
        l = document.documentElement.scrollLeft;
        w = document.documentElement.scrollWidth;
        h = document.documentElement.scrollHeight;
    } else if (document.body) {
        t = document.body.scrollTop;
        l = document.body.scrollLeft;
        w = document.body.scrollWidth;
        h = document.body.scrollHeight;
    }
    if(typeof obj !="undefined"){
        b=intval(getScrollHeight())-getWindowHeight()-getScrollTop();
    }else{
        b=0;
    }
    return {
        t: t,
        l: l,
        w: w,
        h: h,
        b: b
    };
}

if ($) {
    $(function() {
        var win_height = $(window).height();
        var doc_height = $(document).height();
        var host = window.location.host;

        var $preview_footer_btn = '';

        $(window).on('message', function (e) {
            var originalEvent = e.originalEvent;
            var data = originalEvent.data;
            var type = data.type;
            var _from = data.from;

            if (!type || type !== 'previewOld') {
                return;
            }

            if (_from === 'console') {
                return;
            }

            if (_from === 'cli') {
                var $parent = $(window.parent.document);
                var $preview_show = $parent.find('#preview_show');

                should_show_button();

                $preview_footer_btn = $preview_show.length > 0 ? $preview_show.find('#preview_footer_btn') : '';

                if ($preview_footer_btn.length > 0) {
                    $(window).on('scroll', throttle(should_show_button, 500)); // 元素的在可视区域的记录
                }
            }
        });

        function should_show_button () {
            var win_scroll_top = $(window).scrollTop();

            if (win_height >= doc_height) {
                footerBtnShow();
            } else if (win_scroll_top + win_height + 20 > doc_height) {
                footerBtnShow();
            } else {
                footerBtnHide();
            }
        }

        // 节流函数
        function throttle(func, wait) {
            var timeout;
            return function() {
                var context = this;
                var args = arguments;
                if (!timeout) {
                    timeout = setTimeout(function(){
                        timeout = null;
                        func.apply(context, args)
                    }, wait)
                }

            }
        }

        // 显示预览按钮中 的
        function footerBtnShow() {
            if ($preview_footer_btn) {
                $preview_footer_btn.removeClass('none').show();
            }
        }

        // 隐藏预览按钮中 的
        function footerBtnHide() {
            if ($preview_footer_btn) {
                $preview_footer_btn.addClass('none').hide();
            }
        }
     })
}

// 获取cookie
function getCookie(name)
{
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

// 设置cookie
function setCookie(name, value, time)
{
    var Days = 30;
    var exp = new Date();
    var Time;
    if (!time) {
        Time = exp.getTime() + Days * 24 * 60 * 60 * 1000;
    } else {
        Time = exp.getTime() + time * 1000;
    }

    exp.setTime(Time);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

function getDomain() {
    var recentUrl = window.location.host;
    var recentDomain;
    if(recentUrl.indexOf('cli.im') != -1) {
        recentDomain = "cli.im";
    } else if(recentUrl.indexOf('cliim.com') != -1) {
        recentDomain = "cliim.com";
    } else if(recentUrl.indexOf('cli.me') != -1 || recentUrl.indexOf('cliim.net') != -1) {
        recentDomain = "cliim.net";
    } else {
        recentDomain = "cli.im";
    }
    return recentDomain;
}

/**
 *  AB 测试，单双数
 */
function _cvid_is_conditions_three (_cvid) { // cvid (0,2,4,6,8)
    if (typeof _cvid == 'number') {
        _cvid = _cvid.toString();
    }
    if (_cvid == 'a') {
        return 4;
    }
    if (typeof _cvid != 'undefined') {
        if (!!_cvid) {
            if (/0|3|6|9/.test(_cvid.substr(-1))) {
                return 1;
            } else if (/1|4|7/.test(_cvid.substr(-1))) {
                return 2
            } else if (/2|5|8/.test(_cvid.substr(-1))) {
                return 3;
            }
        }
    }
    return -1;
}

/**
 * 获取cvid
 * 方法
 *
 */
function setCvid(coding) {
    var domain = location.hostname.split('.').slice(-2).join('.');
    if (domain == 'clewm.net') {
        domain = 'cli.im';
    }
    hm = document.createElement('script');
    hm.src = '//user.' + domain + '/api/visitor_analysis/get_cvid';
    s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(hm, s);
    if (in_array(coding, TEST_CODING) > -1) {
        console.log('---hm.src---', hm.src);
        console.log('---domain---', domain);
    }
}



// 锚点(Anchor)间平滑跳转
function scroller(el, duration, type,obj,obj1,num,num1) {
    if (typeof el != 'object') {
        el = document.getElementById(el);
    }
    if (!el) return;
    var z = this;
    z.el = el;
    z.p = getPos(el);
    z.s = getScroll(obj);
    z.clear = function() {
        window.clearInterval(z.timer);
        z.timer = null
    };
    var ao1=0;
    if(typeof type!="undefined"&&doc.getElementById('cli_capacity_d1')){
         var ao1=intval(doc.getElementById('cli_capacity_d1').offsetHeight);
    }
    var o = new Date();
    z.t = o.getTime();
    var ao=intval(z.el.offsetHeight);
    z.step = function(){
        var x = new Date(),
            t = x.getTime();
        var p = (t - z.t) / duration;
        if (t >= duration + z.t) {
            if(typeof type!="undefined"){
                obj1.style.display='none';
                doc.getElementById('ci_weui_media_box').style.paddingBottom="0px";
            }
            z.clear();
        } else {
            if(typeof type=="undefined"){
                st = ((-Math.cos(p * Math.PI) / 2) + 0.5) * (z.p.y - z.s.t) + z.s.t;
                sl = ((-Math.cos(p * Math.PI) / 2) + 0.5) * (z.p.x - z.s.l) + z.s.l;
            }else{
                st = -(((-Math.cos(p * Math.PI) / 2) + 0.5) * (ao+num-z.s.b-intval(num1)+ao1)) + z.s.t;
                sl=0;
            }
            z.scroll(st, sl);
        }
    };
    z.scroll = function(t, l) {
        window.scrollTo(l, t)
    };
    z.timer = window.setInterval(function(){
        z.step();
    }, 13);
}

// 主要是最后一个参数，这个参数表示通过接口请求跨域的 cookie, 3 表示 通过接口没有拿到cookie，表示没有 cvid

function setPowerBy (name,son_name,obj,type1, ret, data_tips, code_cvid) {
    if (ret.status == 1) {
        if (ret.data.scant) {
            data_tips['scant'] = ret.data.scant;
        }
        if (ret.data.coding) {
            data_tips['coding'] = ret.data.coding;
        }
        if (ret.data.capacity) {
            data_tips['capacity'] = ret.data.capacity;
        }
        if (ret.data.account) {
            data_tips['account'] = '创作者:' + decodeURIComponent(ret.data.account);
        }
        if (ret.data.qrurl) {
            data_tips['qrurl'] = decodeURIComponent(ret.data.qrurl);
        } else {    //没有参数
            data_tips['qrurl'] = escape(urls.split('?')[0]);    //取当前链接为二维码地址
        }
        if (ret.data.gtype) {
            data_tips['gtype'] = ret.data.gtype;
        }
    }
    var content_tips='',add_heght=0,gtype_link=obj.checkgtype(data_tips['gtype']);
    if(data_tips['gtype']==4||document.getElementById('b_link')){
        add_heght=50;
    }
    if(data_tips['gtype']==2){
        add_heght = 4;
    }
    if(document.getElementById('idcode_link')){
        add_heght=72; //身份码,poweredby 60 +12
    }
    if (window.location.href.indexOf('vcardview') > 0) {
        add_heght=72;   //名片码“保存到通讯录”按钮增高,poweredby 60 +12
    }

    // 文件码
    // if (document.getElementById('filesize')) {
    //     if (document.getElementById('b_link')) {
    //         add_heght = 119;
    //     } else {
    //         add_heght = 66;
    //     }
    // }
    if (window.__wxjs_environment === 'miniprogram') {
        ret.data.powered_link = 'javascript:;'
    }

    var now_url = window.location.host;
    var h5_url;
    if(now_url.indexOf('cli.im') != -1 || now_url.indexOf('clewm.net') != -1) {
        h5_url = "//h5.clewm.net";
    } else if(now_url.indexOf('cliim.com') != -1) {
        h5_url = "//h5.cliim.com";
    } else if(now_url.indexOf('cli.me') != -1 || now_url.indexOf('cliim.net') != -1) {
        h5_url = "//h5.cliim.net";
    } else {
        h5_url = "//h5.clewm.net";
    }

    // var ab_test_num = _cvid_is_conditions_three(code_cvid);
    var ab_text =   '<a id="footer_powered_row_a" href="javascript:;" data-link="https://cli.im" target="_blank" data-params="25,'+ret.data.industry+'">'+
                        '<span style="margin-right:3px"></span>草料二维码<span style="margin-left:3px">提供技术服务</span>' +
                    '</a>';


    /* Powered by 内容 */
    if (ret.data.edition_id) {
        var z=(obj.inint.height+add_heght)+'px';
        var iphoneXHeight = (obj.inint.height+add_heght+16)+'px';
        var isFreeShow = ret.data.edition_id == 1 ? "show" : "";
        var isCollectShow = ret.data.show_collect == 1 ? "": "none";
        var hideComplain = ret.data.edition_id != 1 ? "none" : "";
        var showDivider = !(ret.data.edition_id == 1 && ret.data.show_collect == 1) ? "none" : "";
        var showCollect = ret.data.edition_id == 1 || ret.data.show_collect == 1  ? "show" : "";
        var isBuyShow = ret.data.edition_id == 1 ? "none" : "";
        var content = content_tips + '<div id="footer_powered_content" class="clearfix">\
                                            <div id="footer_collect_row" class="footer_collect_row '+showCollect+'" style="margin-bottom: 8px">\
                                                <a id="footer_complain_row_a" href="//h5.clewm.net/complain?coding='+coding+'&codepath='+encodeURIComponent(window.location.href)+'" class="footer_collect_row_a ' + hideComplain + '">投诉</a>\
                                                <span id="footer_divider" class="footer_divider ' + showDivider + '">|</span>\
                                                <a id="footer_collect_row_a" class="footer_collect_row_a ' + isCollectShow + '" href="//'+getDomain()+'/api/weixin/authorize_collect?coding='+coding+'&type=active" data-params="25,5">收藏</a>\
                                                <a id="footer_collect_row_span" href="javascript:;" class="footer_collect_row_span">已收藏</a>\
                                            </div>\
                                            <div id="footer_powered_row" class="'+isFreeShow+'">\
                                                '+ ab_text +'\
                                            </div>\
                                        </div>';
        // obj.createC(staticdomain+'/cli/css/mobile_collect_bottom.css?v=20170403');
        if (window.__wxjs_environment != 'miniprogram') {
            doc.getElementById(name).style.minHeight= "100%";
        }
        doc.getElementById(son_name).style.paddingBottom=z;
        var footer_div_id = 'footer_powered';
        if (data_tips['gtype'] == 1||typeof type1 !='undefined') {
           insertAfter(obj.createD(footer_div_id, content),doc.getElementById(name));
        } else {
            doc.body.appendChild(obj.createD(footer_div_id, content));
        }
        doc.getElementById(footer_div_id).style.marginTop='-'+z;

        var footer_powered_row_a = doc.getElementById('footer_powered_row_a');
        var footer_collect_row_a = doc.getElementById('footer_collect_row_a');
        var footer_collect_row_span = doc.getElementById('footer_collect_row_span');
        var footer_divider = doc.getElementById('footer_divider');

        // var footer_fufeishengji_a = doc.getElementById('fufeishengji');
        // var footer_liaojiexiangqing_a = doc.getElementById('liaojiexiangqing');

        var sUserAgent = navigator.userAgent;
        var isMobile = sUserAgent.indexOf('Android') > -1 || sUserAgent.indexOf('iPhone') > -1 || sUserAgent.indexOf('iPad') > -1 || sUserAgent.indexOf('iPod') > -1 || sUserAgent.indexOf('Symbian') > -1

        if (getCookie('has_cli_wx_unionid') == 1) {
            var urlwxcollect = 'https://'+getDomain()+'/wx_collect.html?coding='+coding+'&type=active';
            footer_collect_row_a.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx74e11b8ce3ec48e5&redirect_uri=http%3a%2f%2fwechat.cli.im%2fwx-api-im%2foauth%2fopenid%3fredirect_uri%3d'+encodeURIComponent(encodeURIComponent(urlwxcollect))+'%26appid%3dwx74e11b8ce3ec48e5&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect';
        }
        if (window.__wxjs_environment === 'miniprogram') {  // 小程序端webview访问
            footer_collect_row_a.style.display = 'none';
            footer_divider.style.display = 'none';
            doc.getElementById(name).style.minHeight = document.body.offsetHeight -60 + "px";
        }

        powerBySeen(data_tips['qrurl']);

        // if (isFreeShow == 'show' && isCollectShow == 'show' && window.__wxjs_environment !== 'miniprogram') {
        //     doc.getElementById('footer_powered_row').style.marginLeft = '20px';
        //     doc.getElementById('footer_powered_row').style.float = 'left';
        //     doc.getElementById('footer_powered_buy').style.marginLeft = '20px';
        //     doc.getElementById('footer_powered_buy').style.float = 'left';
        //     doc.getElementById('footer_collect_row').style.marginRight = '20px';
        //     doc.getElementById('footer_collect_row').style.float = 'right';
        // }

        (function(){
            // Really basic check for the ios platform
            // https://stackoverflow.com/questions/9038625/detect-if-device-is-ios
            // iPhone X、iPhone XS
            var isIPhoneX = /iphone/gi.test(window.navigator.userAgent) && window.devicePixelRatio && window.devicePixelRatio === 3 && window.screen.width === 375 && window.screen.height === 812;
            // iPhone XS Max
            var isIPhoneXSMax = /iphone/gi.test(window.navigator.userAgent) && window.devicePixelRatio && window.devicePixelRatio === 3 && window.screen.width === 414 && window.screen.height === 896;
            // iPhone XR
            var isIPhoneXR = /iphone/gi.test(window.navigator.userAgent) && window.devicePixelRatio && window.devicePixelRatio === 2 && window.screen.width === 414 && window.screen.height === 896;
            if (isIPhoneX || isIPhoneXSMax || isIPhoneXR) {
                doc.getElementById(footer_div_id).style.marginTop='-' + (iphoneXHeight);
            }
        })();

        //详情点击等
        doc.getElementById('footer_powered_row_a').onclick=function(e){
            e.stopPropagation();
            e.preventDefault();

            obj.StatisticsData(140, 3, 'callbackNew');

            AnalysisData(104, 118027, {
                coding: data_tips['qrurl'],
            });

            var page_url = window.location.href;
            var ua = navigator.userAgent;

            var user_tag = {
                coding: coding,
                'ua' : ua,
            }

            ajax({
                type: "post",
                url: "//cli.im/Api/LogApi/browserError",
                data: "from=activeCodePowerByInfo&page_url=" + encodeURIComponent(page_url) + '&user_tag=' + JSON.stringify(user_tag) + '&error_msg=' + JSON.stringify(user_tag),
                success:function(ret) {
                }
            });


            var list = footer_powered_row_a.getAttribute('data-params').split(',');
            var url = footer_powered_row_a.getAttribute('data-link');

            var fir = list[0],sec = list[1];
            obj.StatisticsData(fir, sec, '');

            var is_weixin = is_weixin_env();

            if (is_weixin > -1) {
                if (window.__wxjs_environment === 'miniprogram') {
                    setTimeout(function () {
                        wx.miniProgram.navigateTo({ url: '/pages/webview/webview?q=' + url });
                    }, 500);
                    return false;
                }
                setTimeout(function() {
                    newWin(url, 'about-power-click');
                }, 500)
            } else {
                setTimeout(function() {
                    newWin(url, 'about-power-click');
                }, 500)
            }

        };

        // doc.getElementById('footer_powered').onmouseover=function(e) {
        //     e.stopPropagation();
        //     if (!isMobile) {
        //         if (doc.getElementById('footer_powered_row').className == 'show') {
        //             doc.getElementById('footer_powered_row').className = 'none';
        //         }
        //         if (doc.getElementById('footer_collect_row').className == 'footer_collect_row show') {
        //             doc.getElementById('footer_collect_row').className = 'footer_collect_row none';
        //         }
        //         if (doc.getElementById('footer_powered_buy').className == 'footer_powered_buy none') {
        //             doc.getElementById('footer_powered_buy').className = 'footer_powered_buy show';
        //         }
        //     }
        // };

        // doc.getElementById('footer_powered').onmouseleave=function(e) {
        //     e.stopPropagation();
        //     if (!isMobile) {
        //         if (doc.getElementById('footer_powered_row').className == 'none') {
        //             doc.getElementById('footer_powered_row').className = 'show';
        //         }
        //         if ((isCollectShow == 'show') && (doc.getElementById('footer_collect_row').className == 'footer_collect_row none')) {
        //             doc.getElementById('footer_collect_row').className = 'footer_collect_row show';
        //         }
        //         if (doc.getElementById('footer_powered_buy').className == 'footer_powered_buy show') {
        //             doc.getElementById('footer_powered_buy').className = 'footer_powered_buy none';
        //         }
        //     }
        // };

        // 收藏点击
        footer_collect_row_a.onclick=function(e) {
            e.stopPropagation();
            if (getCookie('has_cli_wx_unionid') != 1) {
                setCookie('has_cli_wx_unionid', 1);
            }
            footer_collect_row_a.style.display = "none";
            footer_collect_row_span.style.display = "inline-block";
            var list = footer_collect_row_a.getAttribute('data-params').split(',');
            var fir = list[0],sec = list[1];
            obj.StatisticsData(fir, sec);
        };

        // // 付费升级点击
        // footer_fufeishengji_a.onclick = function(e) {
        //     e.stopPropagation();
        //     obj.StatisticsData(122,24);
        // }

        // // 了解详情点击
        // footer_liaojiexiangqing_a.onclick = function(e) {
        //     e.stopPropagation();
        //     obj.StatisticsData(122,25);
        // }
    }
}
function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
    s[8] = s[13] = s[18] = s[23] = "-";
    var uuid = s.join("");
    return uuid;
}
function AnalysisData(fir, sec, datas) {
    var now_url = window.location.host;
    var cvid = getCookie('cvid');
    if (!cvid) {
        cvid = this.uuid();
        document.cookie="cvid="+cvid;
    }
    datas.cvid = cvid;
    var logApiUrl;
    if(now_url.indexOf('cli.im') != -1 || now_url.indexOf('clewm.net') != -1) {
      logApiUrl = "//log-api.cli.im";
    } else if(now_url.indexOf('cliim.com') != -1) {
      logApiUrl = "//log-api.cliim.com";
    } else if(now_url.indexOf('cli.me') != -1 || now_url.indexOf('cliim.net') != -1) {
      logApiUrl = "//log-api.cliim.net";
    } else {
      logApiUrl = "//log-api.cli.im";
    }
    console.log(datas);
    datas = JSON.stringify(datas);
    $.ajax({
        type: 'post',
        url: logApiUrl + '/log/click',
        data: {
            'fir': fir,
            'sec': sec,
            'datas': datas,
        },
    });
}

function powerBySeen(coding) {
    var pb_top = $('#footer_powered_row_a').offset().top;
    var wd_srcoll = $(window).scrollTop();
    var wd_height = $(window).height();
    if (pb_top > wd_srcoll && pb_top < (wd_srcoll + wd_height) && !HAS_CLICKLOG) {
        HAS_CLICKLOG = true;
        AnalysisData(104, 118028, {
            coding: coding,
        });
    }

    $(window).scroll(function () {
        var pb_top = $('#footer_powered_row_a').offset().top;
        var wd_srcoll = $(window).scrollTop();
        var wd_height = $(window).height();
        if (pb_top > wd_srcoll && pb_top < (wd_srcoll + wd_height) && !HAS_CLICKLOG) {
            HAS_CLICKLOG = true;
            AnalysisData(104, 118028, {
                coding: coding,
            });
        }
    })
}

function newWin(url, id) {
    var a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('target', '_blank');
    a.setAttribute('id', id);
    // 防止反复添加
    if(document.getElementById(id)) {
      document.body.removeChild(document.getElementById(id));
    }
    document.body.appendChild(a);

    var is_weixin = is_weixin_env();

    if (is_weixin > -1) {
        a.click();
        a.click();
    } else {
        a.click();
    }
}

function is_weixin_env () {
    return window.navigator.userAgent.toLocaleLowerCase().indexOf('micromessenger');
}

var bizfree = function(name,son_name,type1) {
    var _this=this;
    if (in_array(coding, TEST_CODING) > -1) {
        console.log('------进入了bizfree，add之前------');
    }
    this.add(name,son_name,_this,type1);
    if (in_array(coding, TEST_CODING) > -1) {
        console.log('------进入了bizfree，add之后------');
    }
}
bizfree.prototype = {
    inint:{
        height: 64,
    },
    add:function(name,son_name,obj,type1) {
        var url = window.location.search, //获取url中"?"符后的字串
        url_pathname=window.location.pathname,
            data_tips = {
                'scant': 0,//当日扫描量
                'capacity': 0,//容量
                'account':'',//用户名
                'qrurl':'',//二维码地址
                'coding':'',//码CODING
                'gtype':0,//码类型
            };
        var urls=window.location.href;
        if (urls.indexOf("/test/") != -1) {
            data_tips['coding'] = data.v_coding;
        } else if (urls.indexOf("/vcardview/") != -1 || urls.indexOf("v.2w") != -1) {
            data_tips['coding'] = data.block.coding;
        } else if (urls.indexOf("/idcodeview/") != -1) {
            data_tips['coding'] = data.tree_list[0].coding;
        } else if (window.location.host.indexOf("targurl") != -1) {
            data_tips['coding'] = obj.getQueryString("coding");
        } else {
            var a = url_pathname.split('/');
            data_tips['coding'] = a[a.length-1];
        }
        if (data_tips['coding'] != '') {
            if (in_array(data_tips['coding'], TEST_CODING) > -1) {
                console.log('---getc3url---');
            }
            var now_url = window.location.host;
            var getc3url,staticdomain;
            if(now_url.indexOf('cli.im') != -1 || now_url.indexOf('clewm.net') != -1) {
                getc3url = "//clitotalentr.cli.im/Code/get";
                staticdomain = '//static.clewm.net';
            } else if(now_url.indexOf('cliim.com') != -1) {
                getc3url = "//clitotalentr.cliim.com/Code/get"
                staticdomain = '//static-test.clewm.net';
            } else if(now_url.indexOf('cliim.net') != -1) {
                getc3url = "//clitotalentr.cliim.net/Code/get";
                staticdomain = '//static-develop.clewm.net';
            } else if(now_url.indexOf('cli.me') != -1) {
                getc3url = "//clitotalentr.cliim.net/Code/get";
                staticdomain = '//static.cli.me';
            } else {
                getc3url = "//clitotalentr.cli.im/Code/get";
                staticdomain = '//static.clewm.net';
            }
            // ajax({
            //     type: "post",
            //     url: getc3url,
            //     data: "coding=" + data_tips['coding'],
            //     dataType: "json",
            //     success:function(ret) {

            //         setPowerBy(name, son_name, obj, type1, ret, data_tips, '');

            //         // var code_cvid = getCookie('code_cvid');
            //         // var domain = getDomain();
            //         // if (in_array(data_tips['coding'], TEST_CODING) > -1) {
            //         //     console.log('---ret---', ret);
            //         //     console.log('---before code_cvid---', code_cvid);
            //         // }
            //         // if (!code_cvid) {
            //         //     // 数据统计
            //         //     ajax_jsonp({
            //         //         url: '//'+ domain +'/Apis/Visitor/get_code_cvid',
            //         //         time: 5000,
            //         //         jsonp: 'callback_cvid',
            //         //         success:function(result){
            //         //             if (in_array(data_tips['coding'], TEST_CODING) > -1) {
            //         //                 console.log('---result---', result);
            //         //             }

            //         //             if (result.status == 1) {
            //         //                 code_cvid = result.data && result.data.code_cvid;
            //         //                 code_cvid = code_cvid.toString();
            //         //                 var expires = result.data && result.data.expires_time;
            //         //                 setCookie('code_cvid', code_cvid, expires);
            //         //                 setPowerBy(name, son_name, obj, type1, ret, data_tips, code_cvid);
            //         //             }
            //         //         },
            //         //         error: function(error) {
            //         //             if (in_array(data_tips['coding'], TEST_CODING) > -1) {
            //         //                 console.log('---code_cvid error---', code_cvid);
            //         //             }

            //         //             if (!code_cvid) {
            //         //                 code_cvid = '00000';
            //         //                 setPowerBy(name, son_name, obj, type1, ret, data_tips, code_cvid);
            //         //             }
            //         //         }
            //         //     });
            //         // } else {
            //         //     setPowerBy(name, son_name, obj, type1, ret, data_tips, code_cvid);
            //         // }
            //     }
            // });
        }
    },
    StatisticsData:function(fir,sec, callbackName, code_cvid){

        var now_url = window.location.host;
        var clicl_url;
        if(now_url.indexOf('cli.im') != -1 || now_url.indexOf('clewm.net') != -1) {
            clicl_url = "//cli.im/Api/ClickLog/click"
        } else if(now_url.indexOf('cliim.com') != -1) {
            clicl_url = "//cliim.com/Api/ClickLog/click"
        } else if(now_url.indexOf('cli.me') != -1 || now_url.indexOf('cliim.net') != -1) {
            clicl_url = "//cliim.net/Api/ClickLog/click";
        } else {
            clicl_url = "//cli.im/Api/ClickLog/click"
        }
        // 数据统计
        if (code_cvid) {
            ajax_jsonp({
                url: clicl_url,
                jsonp: callbackName ? callbackName : 'callback',
                data: {
                    'fir': fir,
                    'sec': sec,
                    'code_cvid': code_cvid,
                },
                success:function(res){
                },
                error: function(error) {}
            });
        } else {
            ajax_jsonp({
                url: clicl_url,
                jsonp: callbackName ? callbackName : 'callback',
                data: {
                    'fir': fir,
                    'sec': sec,
                },
                success:function(res){
                },
                error: function(error) {}
            });
        }
    },
    checkgtype:function(o){
        var o=parseInt(o),a;
        switch(o){
            case 0:a='//biz.cli.im/test/KL255608';break;
            case 1:a='//biz.cli.im/test/JU256699';break;
            case 2:a='//biz.cli.im/test/EV256717';break;
            case 4:a='//biz.cli.im/test/GQ256709';break;
            case 11:a='//biz.cli.im/test/GQ256709';break;
        }
        return a;
    },
    createD:function(iname,html){
        var div = doc.createElement('div');
        div.setAttribute('id',iname);
        div.innerHTML=html;
        return div;
    },
    createC:function(url){
        var link = doc.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("type", "text/css");
        link.setAttribute("href", url);
        var heads = doc.getElementsByTagName("head");
        if (heads.length) {
            heads[0].appendChild(link);
        } else {
            doc.documentElement.appendChild(link);
        }
    },
    check_img_complete:function(callback){
        // var doc.getElementsByTagName(img);
    },
    createT:function(obj){
        var content='<div class="cli_weui_panel_bd pos-rlt">\
                            <div class="cli_weui_media_box cli_weui_media_text">\
                                <h4 class="cli_weui_media_title font-14">投诉非法内容</h4>\
                                <p class="cli_weui_media_desc font-12">\
                                如果你认为该二维码内容存在问题,请点击此投诉,草料审核人员将第一事件审核内容,对非法内容及时屏蔽</p>\
                                <ul class="weui_media_info">\
                                    <li class="weui_media_info_meta weui_media_info_meta_extra font-12 fr">投诉</li>\
                                </ul>\
                            </div>\
                        </div>\
                        <div class="cli_weui_panel_bd pos-rlt">\
                            <div class="cli_weui_media_box cli_weui_media_text">\
                                <h4 class="cli_weui_media_title font-14">向草料提建议</h4>\
                                <p class="cli_weui_media_desc font-12">\
                                草料二维码团队一直以两周一次的更新周期持续改进产品,如果你对产品有什么不满意和建议,请告知我们</p>\
                                <ul class="weui_media_info">\
                                    <li class="weui_media_info_meta weui_media_info_meta_extra font-12 fr">反馈</li>\
                                </ul>\
                            </div>\
                            <div id="go_back1" class="pos-abt"></div>\
                        </div>';
            var o=this.createD('cli_tips_d',content);
                o.setAttribute('class','cli_enter');
            obj.children[0].appendChild(o);
            cli_tips_d=doc.getElementById('cli_tips_d');
            doc.getElementById('go_back1').onclick=function(){
                 cli_tips_d.setAttribute('class','cli_leave');
                 setTimeout(function () {
                    obj.children[0].removeChild(cli_tips_d);
                }, 500);
            }
    },
    getQueryString:function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
}
