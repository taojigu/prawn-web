
/**
 * Dingding Auth 相关相关的方法
 */
import * as dd from 'dingtalk-jsapi';
import axios from 'axios';
import {DingCorpID} from "./ding_config.json"
import {showToast} from "vant";
import {error} from "dingtalk-jsapi";

export async function dingdingConfig() {
  const { data } = await axios.get('api/v1/prawn/ding/auth/signature')
  //const url = data['url']
  const timeStamp = data['timeStamp']
  console.log(timeStamp)
  const agentId = data['agentId']

  const corpId = data['corpId']

  const nonceStr = data['nonceStr']

  const apiList = data['jsApiList']

  const signature = data['signature']

  dd.config({
    agentId: agentId,
    corpId: corpId,
    timeStamp: timeStamp,
    nonceStr: nonceStr,
    signature: signature,
    jsApiList: apiList
  });
}


export  async function requestDingToken(){
    const authCode = await requstDingAuthCode(DingCorpID);
    showToast(`code is ${authCode}`)
    const url = 'prawn/ding/token';
    const param = {
      code:authCode
    }
    return axios.request({
      url:url,
      method:'get',
      params:param}).then((res) =>{
        return res;
    });
}


export function requstDingAuthCode(corpId) {
  return new Promise(
    function (resolve){
      dd.ready(async ()=>{ 
          const code = await permissonRequestAuthCode(corpId);
          resolve(code);
      });
    });
}

function permissonRequestAuthCode(corpId){
  return new Promise( function(resolve){
    dd.runtime.permission.requestAuthCode({
        corpId: corpId, // 企业id
        onSuccess: function (info) {

            resolve(info.code);
        },
        onFail: function (res) {
            showToast(res)
            console.log(res);
        }
    }).then( r =>{});
  })
}


