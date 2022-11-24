import { withIronSessionSsr } from 'iron-session/next';
import { ironOptions } from '../../../lib/config';
import { GetServerSideProps } from 'next';
import Link from 'next/link';

export const getServerSideProps: GetServerSideProps =
  withIronSessionSsr(async function getServerSideProps({ req }) {
    // console.log(req);
    const cart = req.session.cart;
    // console.log(cart);
    return {
      props: {
        cart: cart,
      },
    };
  }, ironOptions);

export default function Cart({ cart }: { cart: any }) {
  return (
    <>
      {/* <div>カートの中身: {cart.size()}</div> */}
      <table>
        <tr>
          <th>ID</th>
          <th>商品名</th>
          <th>商品の説明</th>
          <th>価格</th>
          <th>イメージ画像</th>
        </tr>
        {cart?.map((item:any) => (
        <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.description}</td>
            <td>{item.price}</td>
            <td>{item.imageUrl}</td>
        </tr> 
        ))}
      </table>
      <Link href="/items">一覧画面へ</Link>
    </>
  );
}
