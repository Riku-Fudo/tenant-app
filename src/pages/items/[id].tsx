import { GetItemId } from 'components/GetItemId';
import { GetItemDetail } from 'components/GetItemDetail';
import UseSWR from 'swr';
const fetcher = (url: string) => fetch(url).then((res) => res.json());

// jsonの型
type Item = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  deleted: boolean;
};

export async function getStaticPaths() {
  //   const paths = GetItemId();
  // 商品ID一覧を取得する
  const res = await fetch('http://localhost:8000/items/');
  const posts = await res.json();
  const paths = posts.map((item: Item) => ({
    params: {
      id: item.id.toString(),
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params}: {params: { id: string };}) {
    const data = await GetItemDetail(params.id);
    return {
        props:{
            data
        }
    }
}

export default function detail({ data }: { data: Item }) {
  return (
    <table>
      <tr>
        <th>ID</th>
        <th>商品名</th>
        <th>商品の説明</th>
        <th>価格</th>
        <th>イメージ画像</th>
        <th>削除フラグ</th>
      </tr>
      <tr>
        {/* <td>{data.id}</td>
        <td>{data.name}</td>
        <td>{data.description}</td>
        <td>{data.price}</td>
        <td>{data.imageUrl}</td>
        <td>{data.imageUrl}</td> */}
        <td>ID</td>
        <td>Name</td>
        <td>BB</td>
        <td>AAA</td>
        <td>URL</td>
        <td>true</td>
      </tr>
    </table>
  );
}
