import { GetItemId } from 'components/GetItemId';
import { GetItemDetail } from 'components/GetItemDetail';
import { useForm, SubmitHandler } from 'react-hook-form';
import Link from 'next/link';
import { FetchData } from '../../../posts/post';
import { useRouter } from 'next/router';

type Option = {
  // 識別子
  id: number;
  // オプションの名前
  name: string;
  // オプションの説明
  description: string;
  // オプションの価格
  price: number;
};

type FormValues = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
};

// jsonの型
type Item = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  deleted: boolean;
  options: Option[];
};

export async function getStaticPaths() {
  //const paths = GetItemId();
  //商品ID一覧を取得する
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

export async function getStaticProps({
  params,
}: {
  params: { id: string };
}) {
  const data = await GetItemDetail(params.id);
  return {
    props: {
      data,
    },
  };
}

export default function Detail({ data }: { data: Item }) {
  const router = useRouter();
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      id: data.id,
      name: data.name,
      description: data.description,
      price: data.price,
      imageUrl: data.imageUrl,
    },
  });
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    data.price = Number(data.price);
    FetchData(data, 'PATCH').then(() => router.push(`/`));
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
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
            <td>{data.id}</td>
            <td>
              <input id="name" {...register('name')} />
            </td>
            <td>
              <input id="description" {...register('description')} />
            </td>
            <td>
              <input id="price" {...register('price')} />
            </td>
            <td>
              <input id="imageUrl" {...register('imageUrl')} />
            </td>
            <td>{data.deleted ? 'true' : 'false'}</td>
          </tr>
        </table>

        {typeof data.options === 'undefined'
          ? ''
          : data.options.map((option) => (
              <table key={option.id}>
                <tr>
                  <th colSpan={4}>オプション情報(ID:{option.id})</th>
                </tr>
                <tr>
                  <th>ID</th>
                  <th>名称</th>
                  <th>説明</th>
                  <th>価格</th>
                </tr>
                <tr>
                  <td>{option.id}</td>
                  <td>{option.name}</td>
                  <td>{option.description}</td>
                  <td>{option.price}</td>
                </tr>
              </table>
            ))}
        <button type="submit">更新</button>
      </form>
      <Link href="/">一覧へ</Link>
    </>
  );
}
