import UseSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function GetItemList() {
  // 商品一覧を取得する
  const { data, error } = UseSWR(
    'api/items',
    fetcher
  );
  // エラーなら一覧取得失敗を画面表示
  if (error) return <div>Failed to load</div>;
  // 取得待ち
  if (!data) return <div>Loading...</div>;

  return (
    <table>
      <tr>
        <th>ID</th>
        <th>商品名</th>
        <th>商品の説明</th>
        <th>詳細画面へ</th>
        <th>削除</th>
      </tr>
      {data.map(
        (item: { id: number; name: string; description: string }) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.description}</td>
            <td>
              <button type="submit">詳細</button>
            </td>
            <td>
              <button type="submit">削除</button>
            </td>
          </tr>
        )
      )}
    </table>
  );
}

export default GetItemList;
