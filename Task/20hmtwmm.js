/*

*/


const $ = new Env('mtwmm');
let status;
status = (status = ($.getval("mtwmmstatus") || "1") ) > 1 ? `${status}` : ""; // 账号扩展字符
let mtwmmurlArr = [], mtwmmhdArr = [],mtwmmcount = ''
let mtwmmurl = $.getdata('mtwmmurl')
let mtwmmhd = $.getdata('mtwmmhd')
let mtwmmmc = '',mtwmmid = '',mtwmm1 = ''
let mtwmmhb = ($.getval('mtwmmhb') || '1');  //兑换红包id，id 1 代表兑换10元，2代表兑换20元，3代表兑换50元，4代表兑换100元，这里可以自己手动修改兑换id。默认兑换id 11 也就是0.3元，兑换完了请修改id为12
let mtwmmdh = ($.getval('mtwmmdh') || '1');  //提现id，14代表提现0.3元,15代表提现10元,16代表提现20元,17代表提现50元,18代表提现100元,19代表提现200元，模式提现id 14 提现0.3元，不想看广告想提现其他额度自己修改提现id运行脚本就可以
var hour,minute,random

let max = 60;
let min = 35;

if ($.isNode()) {
  hour = new Date(new Date().getTime() + 8 * 60 * 60 * 1000).getHours();
  minute = new Date(new Date().getTime() + 8 * 60 * 60 * 1000).getMinutes();
} else {
  hour = (new Date()).getHours();
  minute = (new Date()).getMinutes();
}


if ($.isNode()) {

   if (process.env.mtwmm_url && process.env.mtwmm_url.indexOf('\n') > -1) {
   mtwmmurl = process.env.mtwmm_url.split('\n');
   console.log(`您选择的是用换行隔开\n`)
  } else {
   mtwmmurl = process.env.mtwmm_url.split()
  };
  Object.keys(mtwmmurl).forEach((item) => {
        if (mtwmmurl[item]) {
          mtwmmurlArr.push(mtwmmurl[item])
        }
    });
  if (process.env.mtwmm_hd && process.env.mtwmm_hd.indexOf('\n') > -1) {
   mtwmmhd = process.env.mtwmm_hd.split('\n');
   console.log(`您选择的是用换行隔开\n`)
  } else {
   mtwmmhd = process.env.mtwmm_hd.split()
  };
  Object.keys(mtwmmhd).forEach((item) => {
        if (mtwmmhd[item]) {
          mtwmmhdArr.push(mtwmmhd[item])
        }
    });

    console.log(`============ 脚本执行-国际标准时间(UTC)：${new Date().toLocaleString()}  =============\n`)
    console.log(`============ 脚本执行-北京时间(UTC+8)：${new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toLocaleString()}  =============\n`)
 } else {mtwmmurlArr.push($.getdata('mtwmmurl'))
    mtwmmhdArr.push($.getdata('mtwmmhd'))
    let mtwmmcount = ($.getval('mtwmmcount') || '1');
  for (let i = 2; i <= mtwmmcount; i++) {
    mtwmmurlArr.push($.getdata(`mtwmmurl${i}`))
    mtwmmhdArr.push($.getdata(`mtwmmhd${i}`))
  }
}



!(async () => {
if (!mtwmmhdArr[0]) {
    $.msg($.name, '【提示】请先获取一cookie')
    return;
  }
    console.log(`------------- 共${mtwmmhdArr.length}个账号-------------\n`)
    console.log('\n喵喵当前设置的兑换ID为: '+mtwmmhb + '提现ID为: '+mtwmmdh)
      for (let i = 0; i < mtwmmhdArr.length; i++) {
        if (mtwmmhdArr[i]) {

          mtwmmurl = mtwmmurlArr[i];
          mtwmmhd = mtwmmhdArr[i];
          $.index = i + 1;
          console.log(`\n开始【喵喵${$.index}】`)
          await mtwmmsign();
          await mtwmmfood();
          await mtwmmlb();
          await mtwmmjg();
          //await zqmhhb();
          //await zqmtx();
  }
}

})()
  .catch((e) => $.logErr(e))
  .finally(() => $.done())
//喵喵数据获取

function mtwmmck() {
   if ($request.url.indexOf("action=index") > -1) {
 const mtwmmurl = $request.url
  if(mtwmmurl)     $.setdata(mtwmmurl,`mtwmmurl${status}`)
    $.log(mtwmmurl)
  const mtwmmhd = JSON.stringify($request.headers)
        if(mtwmmhd)    $.setdata(mtwmmhd,`mtwmmhd${status}`)
$.log(mtwmmhd)
   $.msg($.name,"",'喵喵'+`${status}` +'获取数据获取成功！')
  }
}


//喵喵签到
function mtwmmsign(timeout = 0) {
  return new Promise((resolve) => {
let url = {
        url : 'https://x3535.yyyyy.run/app/index.php'+mtwmmurl.match(/index.php(.*?)action/)[1]+'&action=sign&contr=my&token='+mtwmmurl.match(/token=(\w+)/)[1]+'&version=1.0.24',
        headers : JSON.parse(mtwmmhd),
        }
      $.get(url, async (err, resp, data) => {
        try {
              //console.log('\n喵喵[签到]data回执:'+data)
              const result = JSON.parse(data)
                  if(result.status == 1){
                  console.log('\n喵喵[签到]回执:成功🌝 \n连续签到: '+result.info.sign_days+' 天')
                     //await $.wait(11000);
                     random = Math.floor(Math.random()*(max-min+1)+min)*1000
                     console.log(random);
                     await $.wait(random);
                     await mtwmmsigndouble();

                  }else {
                      console.log('\n喵喵[签到]回执:失败🚫'+result.info)
                  }

        } catch (e) {
          //$.logErr(e, resp);
        } finally {
          resolve()
        }
    },timeout)
  })
}

//喵喵签到翻倍
function mtwmmsigndouble(timeout = 0) {
  return new Promise((resolve) => {
let url = {
        url : 'https://x3535.yyyyy.run/app/index.php'+mtwmmurl.match(/index.php(.*?)action/)[1]+'&action=signDouble&contr=my&token='+mtwmmurl.match(/token=(\w+)/)[1]+'&version=1.0.24',
        headers : JSON.parse(mtwmmhd),
        }
      $.get(url, async (err, resp, data) => {
        try {
              //console.log('\n喵喵[签到翻倍]data回执:'+data)
              const result = JSON.parse(data)
                  if(result.status == 1){
                  console.log('\n喵喵[签到翻倍]回执:成功🌝')
                  }else {

                      console.log('\n喵喵[签到翻倍]回执:失败🚫'+result.info)
                      /*random = Math.floor(Math.random()*(max-min+1)+min)*1000
                      console.log(random);
                      await $.wait(random);*/
                  }

        } catch (e) {
          //$.logErr(e, resp);
        } finally {
          resolve()
        }
    },timeout)
  })
}



//喵喵签到
function mtwmmfood(timeout = 0) {
  return new Promise((resolve) => {
let url = {
        url : 'https://x3535.yyyyy.run/app/index.php'+mtwmmurl.match(/index.php(.*?)action/)[1]+'&action=daily&contr=food&token='+mtwmmurl.match(/token=(\w+)/)[1]+'&version=1.0.24',
        headers : JSON.parse(mtwmmhd),
        }
      $.get(url, async (err, resp, data) => {
        try {
              //console.log('\n喵喵[领取食物]data回执:'+data)
              const result = JSON.parse(data)
                  if(result.status == 1){
                  console.log('\n喵喵[领取食物]回执:成功🌝 \n')
                     //await $.wait(11000);
                     random = Math.floor(Math.random()*(max-min+1)+min)*1000
                     console.log(random);
                     await $.wait(random);

                  }else {
                      console.log('\n喵喵[领取食物]回执:失败🚫'+result.info)
                  }

        } catch (e) {
          //$.logErr(e, resp);
        } finally {
          resolve()
        }
    },timeout)
  })
}


//喵喵视频
function mtwmmsp(timeout = 0) {
  return new Promise((resolve) => {
let url = {
        url : 'https://x3535.yyyyy.run/app/index.php'+mtwmmurl.match(/index.php(.*?)action/)[1]+'&action=video&contr=food&token='+mtwmmurl.match(/token=(\w+)/)[1]+'&version=1.0.24',
        headers : JSON.parse(mtwmmhd),
        }
      $.get(url, async (err, resp, data) => {
        try {
              //console.log('\n喵喵[领取视频奖励]data回执:'+data)
              const result = JSON.parse(data)
                  if(result.status == 1){
                  console.log('\n喵喵[领取视频奖励]回执:成功🌝 \n获得视频奖励: '+result.info.video_currency+' 猫粮')
                     //await $.wait(11000);
                     random = Math.floor(Math.random()*(max-min+1)+min)*1000
                     console.log(random);
                     await $.wait(random);
                     await $.wait(80000);
                     await mtwmmsp();

                  }else {

                      console.log('\n喵喵[领取视频奖励]回执:失败🚫当前无任务\n前去喂养喵喵🐱')
                      /*random = Math.floor(Math.random()*(max-min+1)+min)*1000
                      console.log(random);
                      await $.wait(random);*/
                            await mtwmmwy();
                  }

        } catch (e) {
          //$.logErr(e, resp);
        } finally {
          resolve()
        }
    },timeout)
  })
}

//喵喵任务
function mtwmmrw(timeout = 0) {
  return new Promise((resolve) => {

let url = {
        url : 'https://x3535.yyyyy.run/app/index.php'+mtwmmurl.match(/index.php(.*?)action/)[1]+'&action=complete&contr=task&task_id='+mtwmmid+'&token='+mtwmmurl.match(/token=(\w+)/)[1]+'&version=1.0.24',
        headers : JSON.parse(mtwmmhd),

}
      $.get(url, async (err, resp, data) => {
        try {
        console.log(`\n喵喵[试玩小程序任务]回执:`+data)
         const result = JSON.parse(data)
                if (result.status == 1) {
                     console.log(`\n喵喵[试玩小程序任务]回执:成功🌝\n`+result.info.msg)
                     //await $.wait(2000);
                     random = Math.floor(Math.random()*(max-min+1)+min)*1000
                     console.log(random);
                     await $.wait(random);
                     await mtwmmlb();
                } else {

                    //const result = JSON.parse(data)
                      console.log('\n喵喵[试玩小程序任务]回执:失败🚫')


                }
      } catch (e) {
          //$.logErr(e, resp);
        } finally {
          resolve()
        }
    },timeout)
  })
}


//喵喵列表
function mtwmmlb(timeout = 0) {
  return new Promise((resolve) => {
let url = {
        url : mtwmmurl,
        headers : JSON.parse(mtwmmhd),

}
      $.get(url, async (err, resp, data) => {
        try {
          //console.log('喵喵[获取任务列表]回执:'+data)
          if(data.match(/"s":(.*?),/)[1] === '[]'){
          console.log('\n喵喵当前没有小程序任务了,前去执行视频任务')
          /*random = Math.floor(Math.random()*(max-min+1)+min)*1000
          console.log(random);
          await $.wait(random);*/
          await mtwmmsp();
          }
          const result = JSON.parse(data)
            console.log('喵喵[获取任务列表]result回执:'+result)
                if(result.status == 1){
                   //console.log(data)
                    mtwmmid = data.match(/"id":"(\w+)",/)[1]
                    mtwmmmc = data.match(/"title":"(.+?)",/)[1]

                      console.log('\n喵喵[获取任务列表]回执:成功🌝  \n[任务ID]: '+mtwmmid+' \n[任务名称]: '+mtwmmmc+'\n开始领取任务奖励')
                   //$.done()
                     //await $.wait(2000);
                     random = Math.floor(Math.random()*(max-min+1)+min)*1000
                     console.log(random);
                     await $.wait(random);
                     await mtwmmrw();

                } else {
                      console.log('喵喵[获取任务列表]回执:失败🚫 当前账号可能没有任务了')
                      /*random = Math.floor(Math.random()*(max-min+1)+min)*1000
                      console.log(random);
                      await $.wait(random);*/
                      await mtwmmsp();
                }
        } catch (e) {
          //$.logErr(e, resp);
        } finally {
          resolve()
        }
    },timeout)
  })
}


//喵喵喂养
function mtwmmwy(timeout = 0) {
  return new Promise((resolve) => {
let url = {
        url : 'https://x3535.yyyyy.run/app/index.php'+mtwmmurl.match(/index.php(.*?)action/)[1]+'&action=feed&contr=my&token='+mtwmmurl.match(/token=(\w+)/)[1]+'&is_remind=2&version=1.0.24',
        headers : JSON.parse(mtwmmhd),
        }
      $.get(url, async (err, resp, data) => {
        try {
    //console.log('\n喵喵[喂养]data回执:'+data)
    const result = JSON.parse(data)
        if(result.status == 1){
        console.log('\n喵喵[喂养]回执:成功🌝 \n成功添加喂养进度'+result.info.percentage+'%\n当前金豆余额:'+result.info.member.currency+' 个\n猫粮剩余:'+result.info.member.foodstuff)

} else {
       console.log('\n喵喵[喂养]回执:失败🚫 '+result.info)


}

        } catch (e) {
          //$.logErr(e, resp);
        } finally {
          resolve()
        }
    },timeout)
  })
}

//喵喵进贡
function mtwmmjg(timeout = 0) {
  return new Promise((resolve) => {
let url = {
        url : 'https://x3535.yyyyy.run/app/index.php'+mtwmmurl.match(/index.php(.*?)action/)[1]+'&action=upcurrency&contr=my&token='+mtwmmurl.match(/token=(\w+)/)[1]+'&is_remind=2&version=1.0.24',
        headers : JSON.parse(mtwmmhd),
        }
      $.get(url, async (err, resp, data) => {
        try {
    //console.log('\n喵喵[进贡]data回执:'+data)
    const result = JSON.parse(data)
        if(result.status == 1){
        console.log('\n喵喵[进贡]回执:成功🌝 \n成功收取进贡'+result.info.collect_currency+'金豆')

        } else {
               console.log('\n喵喵[进贡]回执:失败🚫 '+result.info)


        }

        } catch (e) {
          //$.logErr(e, resp);
        } finally {
          resolve()
        }
    },timeout)
  })
}

//喵喵兑换
function mtwmmhhb(timeout = 0) {
  return new Promise((resolve) => {
let url = {
        url : 'https://x3535.yyyyy.run/app/index.php'+mtwmmurl.match(/index.php(.*?)action/)[1]+'&action=index&token='+mtwmmurl.match(/token=(\w+)/)[1]+'&id='+mtwmmhb+'&version=1.0.24',
        headers : JSON.parse(mtwmmhd),
        }
      $.get(url, async (err, resp, data) => {
        try {
              //console.log('喵喵成功兑换红包data：'+data)
              const result = JSON.parse(data)
                  if(result.status == 1){
                        console.log('喵喵成功兑换红包,前往提现')
                  } else {
                         $.msg('喵喵兑换红包','','喵喵兑换红包回执:失败🚫 '+result.info+'如果当前兑换额度没有机会了请修改兑换id')
                  }

        } catch (e) {
          //$.logErr(e, resp);
        } finally {
          resolve()
        }
    },timeout)
  })
}

//喵喵提现
function mtwmmtx(timeout = 0) {
  return new Promise((resolve) => {
let url = {
        url : 'https://x3535.yyyyy.run/app/index.php'+mtwmmurl.match(/index.php(.*?)action/)[1]+'&action=withdrawals&contr=my&token='+mtwmmurl.match(/token=(\w+)/)[1]+'&money_id='+mtwmmdh+'&payment_code=&pwd=&version=1.0.24',
        headers : JSON.parse(mtwmmhd),
        }
      $.get(url, async (err, resp, data) => {
        try {
            //console.log('\n喵喵[提现]data回执:'+data)
            const result = JSON.parse(data)
            if(result.status == 1){
                  $.msg('喵喵提现','','喵喵成功提现至微信0.3元')

            } else {
                   console.log('\n喵喵[提现]回执:失败🚫 '+result.info)
            }

        } catch (e) {
          //$.logErr(e, resp);
        } finally {
          resolve()
        }
    },timeout)
  })
}





function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
