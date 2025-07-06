export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

//已有的品牌的ts数据类型
export interface TradeMark {
  id?: number
  tmName: string
  logoUrl: string
}

//包含全部品牌数据的ts类型
export type Records = TradeMark[]

//获取的已有全部品牌的数据ts类型
export interface TradeMarkResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    searchCount: boolean
    pages: number
  }
}

// 添加/修改品牌的响应类型
export interface AddOrUpdateTrademarkResponse extends ResponseData {
  data: null
}

// 删除品牌的响应类型
export interface DeleteTrademarkResponse extends ResponseData {
  data: null
}
