import { useSymbolsList, useDataList, useColumns } from "./hooks";
import { Select, Table } from "antd";
import { formatNumber } from "./utils";
import { FieldWrapper, Container } from "./styles";

const { Option } = Select;

function App() {
  const symbols = useSymbolsList();
  const columns = useColumns();
  const { loading, dataSource, fetchDataSource } = useDataList();
  const { dataList, tiker24h, ticker } = dataSource;
  const { priceChange, priceChangePercent } = tiker24h;

  return (
    <Container>
      <strong>Public market data</strong>

      <FieldWrapper>
        <Select
          placeholder="Please select the symbol"
          style={{ width: 300, marginTop: 24 }}
          onChange={fetchDataSource}
        >
          {symbols.map((sym, idx) => (
            <Option key={sym}>{sym}</Option>
          ))}
        </Select>
      </FieldWrapper>
      {ticker && (
        <FieldWrapper>Current Price: {formatNumber(ticker)}</FieldWrapper>
      )}
      {priceChange && (
        <FieldWrapper>24H Price: {formatNumber(priceChange)}</FieldWrapper>
      )}
      {priceChangePercent && (
        <FieldWrapper>24H Change: {priceChangePercent + "%"}</FieldWrapper>
      )}

      <Table
        data-testid="ant-table"
        rowKey="id"
        loading={loading}
        style={{ width: "100%" }}
        columns={columns}
        // @ts-ignore
        dataSource={dataList}
      />
    </Container>
  );
}

export default App;
