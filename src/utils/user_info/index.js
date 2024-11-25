import { getLocalItem, setLocalItem } from "@/common/util/local_storage";
import {requestDingToken,requstDingAuthCode} from "../dingding/auth"
import {DingCorpID} from "../dingding/ding_config"

export async function fetchUserToken() {

    const result =  await requestDingToken();
    return result.data;
}

export async function fetchAuthCode(){
    let result;
    result = await requstDingAuthCode(DingCorpID);
    return result
}

export function localUserToken() {
    return getLocalItem("token");
}

export function saveUserToken(token) {
    setLocalItem("token",token);
}
