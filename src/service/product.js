
import axios from '../utils/axios'

export function createProduct(param) {
    param["productStatus"] =3;
    delete param["productId"]
    return saveProduct(param)
}
//保存产品信息
export function saveProduct(param) {
    return axios.post('prawn/save-product',param);
}

//发布产品
export function publishProduct(productId){
    return requestChangeProductStatus(productId,3);
}

// 获取产品详情
export function getProductDetail(productId){
    return axios.get(`prawn/product/detail?productId=${productId}`,)
}

export async function payPublishProductOrder(payType,productId){
    await dingdingConfig()
    const param = {
        'productId':productId,
        'payType':payType
    }

    const {data} = await axios.post('prawn/order/publish',param)
    window.location.href = data
    return new Promise(function(resolve){
        resolve('demo resolve')
    });
}

export  async function  getProductFavorite(productId) {
    return axios.get(`prawn/favorite/is-favorite?productId=${productId}`)
}

export  async  function  updateProductFavorite(productId,favoriteStatus) {
    const path = favoriteStatus ? `prawn/favorite/add`:`prawn/favorite/cancel`
    const param = {
        'productId':productId
    }
    return axios.post(path,param)
}

function requestChangeProductStatus(productId,status){
    // PrawnProductStatusSaved(1,"保存中"),
    // PrawnProductStatusApproving(2,"审核中"),
    // PrawnProductStatusOnSale(3,"出售中"),
    // PrawnProductStatusSaled(4,"已出售"),
    // PrawnProductStatusRevoked(5,"已撤销");
    const param = {
        "productId":productId,
        "productStatus":status,
    }
    return axios.post('prawn/product/change-status',param)
}