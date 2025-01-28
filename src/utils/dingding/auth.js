/**
 * Dingding Auth 相关相关的方法
 */
import * as dd from 'dingtalk-jsapi';
import axios from 'axios';
import {DingCorpID} from "./ding_config.json"
import {showToast} from "vant";
import {error} from "dingtalk-jsapi";

export async function dingdingConfig() {
    const url = encodeURIComponent(location.href.split('#')[0]);
    const param = {
        'url':url
    }
    const {data} = await axios.get('prawn/ding/auth/signature')
    //const {data} = await axios.post('api/v1/prawn/ding/auth/signature',param)
    //const url = data['url']
    const timeStamp = data['timeStamp']
    const agentId = data['agentId']
    const corpId = data['corpId']
    const nonceStr = data['nonceStr']
    console.log(`nonceStr is ${nonceStr}`)
    const apiList = data['jsApiList']
    const signature = data['signature']
    console.log(`signature is ${signature}`)
    dd.config({
        agentId: agentId,
        corpId: corpId,
        timeStamp: timeStamp,
        nonceStr: nonceStr,
        signature: signature,
        jsApiList: apiList
    });
}


export async function requestDingToken() {
    const authCode = await requestDingAuthCode(DingCorpID);
    const url = 'prawn/ding/token';
    const param = {
        code: authCode
    }
    return axios.request({
        url: url,
        method: 'get',
        params: param
    }).then((res) => {
        return res;
    });
}


export function requestDingAuthCode(corpId) {
    return new Promise(
        function (resolve) {
            dd.ready(async () => {
                try {
                    const code = await permissonRequestAuthCode(corpId);
                    console.log(`the auth code is ${code}`)
                    resolve(code);
                } catch (error) {
                    console.error('Error inside dd.ready:', error);
                }
            });
            dd.error((error) => {
                console.error('DingTalk SDK initialization error:', error);
            });
        });
}

function permissonRequestAuthCode(corpId) {
    return new Promise(function (resolve) {
        dd.runtime.permission.requestAuthCode({
            corpId: corpId, // 企业id
            onSuccess: function (info) {

                resolve(info.code);
            },
            onFail: function (res) {
                showToast(res)
                console.log(res);
            }
        }).then(r => {
        });
    })
}


