import UseSWR, { useSWRConfig } from 'swr';
import Link from "next/link";
import { FetchData } from '../../posts/post';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

// 商品一覧の取得と描画
export default function GetItemList() {
  const { mutate } = useSWRConfig()
  const del = (id:number) => {
    const data = {id: id, deleted: true};
    FetchData(data,'PATCH').then(() => mutate('api/items?deleted=false'));
  };

  // 商品一覧を取得する
  const { data, error } = UseSWR(
    '/api/items?deleted=false',
    fetcher
  );
  // エラーなら一覧取得失敗を画面表示
  if (error) return <div>エラー</div>;
  // 取得待ち
  if (!data) return <div>ロード中...</div>;

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
        (item: { id: number; name: string; description: string}) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.description}</td>
            <td>
              <Link href={`/items/detail?id=${item.id}`}>詳細</Link>
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
