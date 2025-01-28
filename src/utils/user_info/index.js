import { getLocalItem, setLocalItem } from "@/common/util/local_storage";
import {requestDingToken,requestDingAuthCode} from "../dingding/auth"
import {DingCorpID} from "../dingding/ding_config"
import {showToast} from "vant";

export async function fetchUserToken() {

    const result =  await requestDingToken();
    console.log(`token is ${result.data}`)
    return result.data;
}

export async function fetchAuthCode(){
    let result;
    result = await requestDingAuthCode(DingCorpID);
    return result
}

export function localUserToken() {
    return getLocalItem("token");
}

export function saveUserToken(token) {
    setLocalItem("token",token);
}
