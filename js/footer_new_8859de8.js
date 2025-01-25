  
// 关闭风险警示
if (document.getElementById('alert-pay-close')) {
  document.getElementById('alert-pay-close').onclick = function(){
    document.body.removeChild(document.getElementById('alert-pay'));
  }
}


  var winheight=window.screen.height;//获取窗口的宽度
  var bodyheight=document.body.clientHeight//获取body的宽度
  var elment=document.getElementById('cli_support');//JS原生获取类名
  if ((winheight-bodyheight)>51) {
    if (document.getElementById('b_link') && elment!=null) {//判断底部是不是显示企业码信息
      elment.className+="cli_support_a";
    }
  }else if((winheight-bodyheight)<=51){
      if (document.getElementById('b_link')){//判断底部是不是显示企业码信息
        elment.style.padding="10px 0px 55px";
      }else{
        //自适应
    };
  }

function ajax(url,param,callback){
  var http = new XMLHttpRequest();
  http.onreadystatechange = function(){
    if(http.readyState==4&&http.status==200){
      var json = eval("("+http.responseText+")");
      callback(json);
    };
  };
  http.open('POST',url,true);
  http.setRequestHeader("CONTENT-TYPE","application/x-www-form-urlencoded");
  http.send(param);
}
function getqr(coding){
      ajax("/Home/Coding/get_entrurl","coding="+coding,function(ret){
        if(ret.status==1){
           document.getElementById('qr_show').style.display='block';
           document.getElementById('qrcode').setAttribute('src',ret.url);
        }
      });      
}
function loadmcover(id,ua){
    var img=document.getElementById(id).getElementsByTagName('img')[0];
    var img_src=img.getAttribute('data_src');
    img.src=img_src;
    document.getElementById(id).style.display='block';
}

//富文本电话拨号
function makecall(obj){
  var span=obj.getElementsByTagName('span');
  for(var i=0,length=span.length;i<length;i++){
    var _this=span[i];
    if(_this.className=='phone_num'){
      var value=_this.innerHTML;
      obj.href='tel:'+value;
    }
  }
}

//微信下提示用浏览器打开并下载文件
function isAndroid(){
  var download_guide = document.getElementById('file_download_show');
  download_guide.style.display = "block";
  download_guide.onclick = function(){
    download_guide.style.display = "none";
  }//关闭提示
}

