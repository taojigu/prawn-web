//
//
// import {Platform} from "@/const/platform";
// import {dingdingConfig, requestDingToken} from "@/utils/dingding/auth";
// import * as microsoftTeams from "@microsoft/teams-js";
//
//
// export async function fetchPlatformToken(platform) {
//     if (platform === Platform.Teams) {
//
//         return await fetchTeamsToken();
//     }
//     if (platform === Platform.Ding) {
//         return await fetchDingToken()
//     }
//     return Promise.resolve(null);
// }
//
// async function fetchTeamsToken() {
//
//     return  new Promise(
//         function (resolve){
//             microsoftTeams.app.initialize().then(() => {
//                 microsoftTeams.authentication.getAuthToken({
//                     successCallback: (token) => {
//                         console.log("Teams Access Token:", token);
//                         resolve.resolve(token)
//                     },
//                     failureCallback: (error) => {
//                         console.error("Teams Failed to get token:", error);
//                     }
//                 });
//             });
//         }
//     )
// }
//
// async function fetchDingToken() {
//     await dingdingConfig()
//     const result =  await requestDingToken();
//     return result.data
// }