//SKU模块接口管理
import type { BaseResponseData } from '@/utils/request'
import request from '@/utils/request'
import type { SkuInfoData, SkuResponseData } from './type'
//枚举地址
enum API {
  //获取已有的商品的数据-SKU
  SKU_URL = '/admin/product/list/',
  //上架
  SALE_URL = '/admin/product/onSale/',
  //下架的接口
  CANCELSALE_URL = '/admin/product/cancelSale/',
  //获取商品详情的接口
  SKUINFO_URL = '/admin/product/getSkuInfo/',
  //删除已有的商品
  DELETESKU_URL = '/admin/product/deleteSku/',
}
//获取商品SKU的接口
export const reqSkuList = (page: number, limit: number) =>
  request.get<BaseResponseData, SkuResponseData>(API.SKU_URL + `${page}/${limit}`)
//已有商品上架的请求
export const reqSaleSku = (skuId: number) =>
  request.get<BaseResponseData, BaseResponseData>(API.SALE_URL + skuId)
//下架的请求
export const reqCancelSale = (skuId: number) =>
  request.get<BaseResponseData, BaseResponseData>(API.CANCELSALE_URL + skuId)
//获取商品详情的接口
export const reqSkuInfo = (skuId: number) =>
  request.get<BaseResponseData, SkuInfoData>(API.SKUINFO_URL + skuId)
//删除某一个已有的商品
export const reqRemoveSku = (skuId: number) =>
  request.delete<BaseResponseData, BaseResponseData>(API.DELETESKU_URL + skuId)
