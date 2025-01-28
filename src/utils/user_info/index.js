import { getLocalItem, setLocalItem } from "@/common/util/local_storage";
import {requestDingToken,requestDingAuthCode} from "../dingding/auth"
import {DingCorpID} from "../dingding/ding_config"
import {showToast} from "vant";

export async function fetchUserToken() {

    const result =  await requestDingToken();
    console.log(`fetch user token is ${result.data}`)
    return result.data;
}

export async function fetchAuthCode(){
    let result;
    result = await requestDingAuthCode(DingCorpID);
    return result
}

export function localUserToken() {
    let token = getLocalItem("token");
    console.log(`read local token ${token}`)
    return token
}

export function saveUserToken(token) {
    setLocalItem("token",token);
}
