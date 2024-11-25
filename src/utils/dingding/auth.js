
/**
 * Dingding Auth 相关相关的方法
 */
import * as dd from 'dingtalk-jsapi';
import axios from 'axios';
import {DingCorpID} from "./ding_config.json"
import {showToast} from "vant";

export async function dingdingConfig() {
  const { data } = await axios.get('prawn/ding/auth/signature')
  //const url = data['url']
  const timeStamp = data['timeStamp']
  console.log(timeStamp)
  const agentId = data['agentId']
  console.log(agentId)
  const corpId = data['corpId']
  console.log(corpId)
  const nonceStr = data['nonceStr']
  console.log(nonceStr)
  const apiList = data['jsApiList']
  console.log(apiList)
  const signature = data['signature']
  console.log(signature)
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
            console.log(res);
        }
    }).then( r =>{});
  })
}


