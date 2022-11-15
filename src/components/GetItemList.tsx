import UseSWR from 'swr';
import Link from "next/link";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const del = (id:number) => {
  const data = {deleted: true};
  fetch(`http://localhost:8000/items/${id}`,{method: 'PATCH', headers:{'Content-Type': 'application/json'}, body: JSON.stringify(data),}).then((response) => {console.log(response)});
};

// 商品一覧の取得と描画
export default function GetItemList() {
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
      {data.filter((item:{deleted: boolean}) => !item.deleted).map(
        (item: { id: number; name: string; description: string}) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.description}</td>
            <td>
              <Link href={`/items/${item.id}`}>詳細</Link>
            </td>
            <td>
              <button type="submit" onClick={() => del(item.id)}>削除</button>
            </td>
          </tr>
        )
      )}
    </table>
  );
}
