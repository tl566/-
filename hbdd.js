/*

202106011  tom

软件名：红包多多    
下载地址：https://down.xmiles.cn/down/15653/3420007

看一次视频获取CK 

 一机一号！！！
 一机一号！！！
 一机一号！！！
 一机一号！！！
别想着一机多号 ！！！！

秒到秒到！！！！！！！！！！！！

抓包后运行脚本，脚本运行结束后在打开APP提现！！！！！！！！！！！！！！！！！！！！！！！
抓包后运行脚本，脚本运行结束后在打开APP提现！！！！！！！！！！！！！！！！！！！！！！！
抓包后运行脚本，脚本运行结束后在打开APP提现！！！！！！！！！！！！！！！！！！！！！！！
///////////////////////////////////////////////////

撸了不一定有，不撸肯定没有！
TG频道 https://t.me/tom_ww     
Task地址：https://raw.githubusercontent.com/xl2101200/-/main/Tom_task.josn
boxjs地址 ： https://raw.githubusercontent.com/xl2101200/-/main/tom.box.json  
    
///////////////////////////////////////////////////

CRON自行设置

每天运行一次即可！！！！！！！！！！
每天运行一次即可！！！！！！！！！！
每天运行一次即可！！！！！！！！！！
每天运行一次即可！！！！！！！！！！
每天运行一次即可！！！！！！！！！！


v2p配置如下：

【REWRITE】
匹配链接（正则表达式） https://api.jidiandian.cn/redchat-account/api

对应重写目标   https://raw.githubusercontent.com/xl2101200/-/main/hbdd.js

【MITM】  
api.jidiandian.cn

/////////////////////////////////////////////////////////////

圈X配置如下，其他软件自行测试
cron自己设置 
[task_local]
#红包多多
0 22 * * * https://raw.githubusercontent.com/xl2101200/-/main/hbdd.js, tag=红包多多, img-url=https://raw.githubusercontent.com/sngxpro/QuanX/master/icons/tom.png, enabled=true
[rewrite_local]
#红包多多
https://api.jidiandian.cn/redchat-account/api url script-request-body https://raw.githubusercontent.com/xl2101200/-/main/hbdd.js
[MITM]
hostname = api.jidiandian.cn

*/ 



const $ = new Env('红包多多');
let status;

status = (status = ($.getval("hbddstatus") || "1") ) > 1 ? `${status}` : ""; // 账号扩展字符
const hbddurlArr = [],hbddhdArr = [],hbddbodyArr = [],hbddcount = ''
let hbddurl = $.getdata('hbddurl')
let hbddhd = $.getdata('hbddhd')
let hbddbody = $.getdata('hbddbody')
let b = new Date().getTime()
let DD = RT(28000,35000)
let tz = ($.getval('tz') || '1'); //签到通知
let txid = '',txidd = '',ibody = ''
$.message = ''





!(async () => {
  if (typeof $request !== "undefined") {
    await hbddck()
  } else {hbddurlArr.push($.getdata('hbddurl'))
    hbddhdArr.push($.getdata('hbddhd'))
    hbddbodyArr.push($.getdata('hbddbody'))
    let hbddcount = ($.getval('hbddcount') || '1');
  for (let i = 2; i <= hbddcount; i++) {
    hbddurlArr.push($.getdata(`hbddurl${i}`))
    hbddhdArr.push($.getdata(`hbddhd${i}`))
    hbddbodyArr.push($.getdata(`hbddbody${i}`))}
    console.log(`------------- 共${hbddhdArr.length}个账号-------------\n`)
  for (let i = 0; i < hbddhdArr.length; i++) {
      if (hbddhdArr[i]) {
      
      hbddurl = hbddurlArr[i];
      hbddhd = hbddhdArr[i];
      hbddbody = hbddbodyArr[i];
      $.index = i + 1;
      console.log(`\n开始【红包多多${$.index}】`)}

     
      //默认运行100次
      for (let c = 0; c < 100; c++) {
        $.index = c + 1
        console.log(`\n第${c+1}次执行任务！`)

        await hbddkhb()
        console.log(`随机延迟${DD/1000}秒`)
        await $.wait(DD)

      }

        await tx()
        await $.wait(1000)
        await tx1()
        await $.wait(1000)
        await tx2()
        await $.wait(1000)
        await tx3()
        await $.wait(1000)


message()
      }}})()

  .catch((e) => $.logErr(e))
  .finally(() => $.done())
function hbddck() {
   if ($request.url.indexOf("update") > -1) {
const hbddurl = $request.url
   if(hbddurl)     $.setdata(hbddurl,`hbddurl${status}`)
   $.log(hbddurl)

   const hbddhd = JSON.stringify($request.headers)
   if(hbddhd)    $.setdata(hbddhd,`hbddhd${status}`)
$.log(hbddhd)

const hbddbody = $request.body
if(hbddbody)     $.setdata(hbddbody,`hbddbody${status}`)
  $.log(hbddbody)

 $.msg($.name,"",`红包多多${status}视频body获取成功`)

  }
}




//开红包
function hbddkhb(timeout = 0) {
  return new Promise((resolve) => {
    ibody = (hbddbody).replace(/"timestamp":\d+/g,`"timestamp":${b}`)
let url = {
      url : `https://api.jidiandian.cn/redchat-account/api/popularity/update`,
     headers : JSON.parse($.getdata('hbddhd')),
      body : ibody,
}
      $.post(url, async (err, resp, data) => {
      try {

      data = JSON.parse(data)

      if(data.code == 0){  
        
        console.log('\n获得红包券'+data.data.point)
        $.message +='\n获得红包券'+data.data.point

      } else {

      console.log('\n'+data.message)
      $.message +='\n'+data.message
    }
        } catch (e) {

        } finally {

          resolve()
        }
    },timeout)
  })
}


//提现0.3元
function tx(timeout = 0) {
  return new Promise((resolve) => {
    txid = hbddbody.match(/"phead":(\S+)/)[1]
    txidd = (txid).replace(/"timestamp":\d+/g,`"timestamp":${b}`)
let url = {
     url : `https://api.jidiandian.cn/redchat-account/api/cashOut/action`,
     headers : JSON.parse($.getdata('hbddhd')),
     body : `{"id":"46","type":0,"phead":${txidd}`,
}
      $.post(url, async (err, resp, data) => {
      try {

      data = JSON.parse(data)

      if(data.code == 0){  
        
        console.log('\n0.3元提现成功')
      
      await tx()
      } else {

      console.log('\n'+data.message)
      
    }
        } catch (e) {

        } finally {

          resolve()
        }
    },timeout)
  })
}


//提现0.5元
function tx1(timeout = 0) {
  return new Promise((resolve) => {
    
let url = {
      url : `https://api.jidiandian.cn/redchat-account/api/cashOut/action`,
      headers : JSON.parse($.getdata('hbddhd')),
      body : `{"id":"47","type":0,"phead":${txidd}`,
}
      $.post(url, async (err, resp, data) => {
      try {

      data = JSON.parse(data)

      if(data.code == 0){  
        
        console.log('\n0.5元提现成功')
        
      
      } else {

      console.log('\n'+data.message)
      
    }
        } catch (e) {

        } finally {

          resolve()
        }
    },timeout)
  })
}


//提现1元
function tx2(timeout = 0) {
  return new Promise((resolve) => {
   
let url = {
      url : `https://api.jidiandian.cn/redchat-account/api/cashOut/action`,
      headers : JSON.parse($.getdata('hbddhd')),
      body : `{"id":"48","type":0,"phead":${txidd}`,
}
      $.post(url, async (err, resp, data) => {
      try {

      data = JSON.parse(data)

      if(data.code == 0){  
        
        console.log('\n1元提现成功')
      
      } else {

      console.log('\n'+data.message)
      
    }
        } catch (e) {

        } finally {

          resolve()
        }
    },timeout)
  })
}

//提现3元
function tx3(timeout = 0) {
  return new Promise((resolve) => {
    
let url = {
      url : `https://api.jidiandian.cn/redchat-account/api/cashOut/action`,
      headers : JSON.parse($.getdata('hbddhd')),
      body : `{"id":"49","type":0,"phead":${txidd}`,
}
      $.post(url, async (err, resp, data) => {
      try {

      data = JSON.parse(data)

      if(data.code == 0){  
        
        console.log('\n3元提现成功')
      
      
      } else {

      console.log('\n'+data.message)
      
    }
        } catch (e) {

        } finally {

          resolve()
        }
    },timeout)
  })
}



function message() {
  if(tz == 1){$.msg($.name,"",$.message)}
  }

function RT(X, Y) {
    do rt = Math.floor(Math.random() * Y);
    while (rt < X)
    return rt;}


//console.log('\n'+getCurrentDate());
function getCurrentDate() {
var date = new Date();
var seperator1 = "-";
var seperator2 = ":";
var month = date.getMonth() + 1;
var strDate = date.getDate();
if (month >= 1 && month <= 9) {
month = "0" + month;
}
if (strDate >= 0 && strDate <= 9) {
  strDate = "0" + strDate;
}
var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
+ " " + date.getHours() + seperator2 + date.getMinutes()
+ seperator2 + date.getSeconds();
return currentdate;
  
  
  }
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
