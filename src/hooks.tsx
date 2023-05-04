import { useState, useEffect, useMemo, useCallback } from "react";
import { API_PATH } from "./api";
import { Columns, IState, IDATA } from "./types";
import { requestAPI } from "./utils";
import moment from "moment";

export const useSymbolsList = (): Array<string> => {
  return [
    "BTCUSDT",
    "ETHUSDT",
    "BNBUSDT",
    "APEUSDT",
    "DASHUSDT",
    "ADAUSDT",
    "ARBUSDT",
    "DYDXUSDT",
  ];
};

export const useColumns = (): Columns => {
  const columns = useMemo(
    () => [
      { title: "ID", dataIndex: "id", key: "id" },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
        sorter: (a: IDATA, b: IDATA) => Number(a.price) - Number(b.price),
      },
      {
        title: "Quantity",
        dataIndex: "qty",
        key: "qty",
        sorter: (a: IDATA, b: IDATA) => Number(a.qty) - Number(b.qty),
      },
      {
        title: "Time",
        dataIndex: "time",
        key: "time",
        sorter: (a: any, b: any) => a.time - b.time,
        render: (time: number) => (
          <span>{moment(time).format("YYYY-MM-DD HH:mm:ss")}</span>
        ),
      },
    ],
    []
  );
  return columns;
};

/**
 * Data fetching managment hook
 * @returns loading, dataSource, fetchDataSource
 */
const INIT = {
  tiker24h: { priceChange: "", priceChangePercent: "" },
  ticker: "",
  dataList: [],
};
export const useDataSource = () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<IState>(INIT);

  const fetchDataSource = useCallback(async (symbol: string) => {
    try {
      setLoading(true);
      const [dataList, tiker24h, { price: ticker }] = await Promise.all([
        await requestAPI(API_PATH.TRADE_LIST, {
          symbol,
          limit: 50,
        }),
        await requestAPI(API_PATH.TICKER_24H, {
          symbol,
        }),
        await requestAPI(API_PATH.TICKER, {
          symbol,
        }),
      ]);

      setDataSource({
        tiker24h,
        ticker,
        dataList,
      });
    } catch (e) {
      // some error handlers
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setDataSource(INIT);
  }, []);

  useEffect(() => {
    // Some initial setup
  }, []);

  return { reset, loading, dataSource, fetchDataSource };
};
