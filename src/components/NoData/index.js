const NoData = ({msg}) => {
  return (
    <div style={{ padding: 60, textAlign: "center" }}>
      <img src="/no-data.png" alt="" width={150} />
      <p style={{ marginTop: 20, fontSize: 14 }}>{msg || '暂无数据'}</p>
    </div>
  );
};
export default NoData;
