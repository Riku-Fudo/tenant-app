import UseSWR from 'swr';
const fetcher = (url: string) => fetch(url).then((res) => res.json());
type Item = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  deleted: boolean;
};

export async function GetItemDetail(id: string) {
  // 商品ID一覧を取得する
  const res = await fetch(`http://localhost:8000/items/${id}`);
  const data = await res.json();
  return data;
}
