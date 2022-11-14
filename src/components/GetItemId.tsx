// jsonの型
type Item = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  deleted: boolean;
};

export async function GetItemId() {
  // 商品ID一覧を取得する
  const res = await fetch('http://localhost:8000/items/')
  const posts = await res.json() 
  const paths = posts.map((item: Item) => ({
    params: {
      id: item.id.toString(),
    },
  }))

  return { paths};
}
