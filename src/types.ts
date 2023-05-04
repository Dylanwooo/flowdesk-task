export interface IColumn {
  title: string;
  dataIndex: string;
  key: string;
  sorter?: any;
  render?: any;
}

export interface IDATA {
  id: string;
  price: string;
  qty: string;
  time: number;
}

export type Columns = Array<IColumn>;

export interface ITicker24 {
  priceChangePercent: string;
  priceChange: string;
}

export interface IState {
  tiker24h: Partial<ITicker24>;
  ticker: string;
  dataList: Array<string>;
}
