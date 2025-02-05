import {Platform} from "@/const/platform";
import {dingdingConfig, requestDingToken} from "@/utils/dingding/auth";
import * as microsoftTeams from "@microsoft/teams-js";


export async function fetchPlatformToken(platform) {
    if (platform === Platform.Teams) {
        return await fetchTeamsToken();
    }
    if (platform === Platform.Ding) {
        return await fetchDingToken()
    }
    return Promise.resolve(null);
}


function getClientSideToken() {

    return new Promise((resolve, reject) => {
        microsoftTeams.authentication.getAuthToken().then((result) => {
            console.log(`The teams token is ${result}`)
            resolve(result);
        }).catch((error) => {
            reject("Error getting token: " + error);
        });
    });
}


async function fetchTeamsToken() {

    return new Promise(
        function (resolve,reject) {
            console.log("start to fetch teams log")
            microsoftTeams.app.initialize().then(() => {
                microsoftTeams.authentication.getAuthToken().then((result) => {
                    resolve(result);
                }).catch((error) => {
                    reject("Error getting token: " + error);
                });
            });
        }
    )
}

async function fetchDingToken() {
    await dingdingConfig()
    const result = await requestDingToken();
    return result.data
}