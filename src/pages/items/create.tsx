import { useForm, SubmitHandler } from 'react-hook-form';
import Link from 'next/link';
type FormValues = {name: string, description:string, price:number,imageUrl: string};

export default function Regist() {

  const { register, handleSubmit, formState: { errors }} = useForm<FormValues>();
  // const onSubmit:SubmitHandler<FormValues> = (data) => console.log(data);
  const onSubmit:SubmitHandler<FormValues> = (data) => {
  fetch('http://localhost:8000/items',{method: 'POST', headers:{'Content-Type': 'application/json'}, body: JSON.stringify(data),}).then((response) => {console.log(response)});
  };

  return (
    <section className={'item-Regist-Wrrapper'}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>商品情報入力画面</h2>
        <ul>
          <li>
            <label id="name">商品名：</label>
            <input id="name" {...register('name', {required: true})} />
            {errors.name && <div className="errorMessage">入力が必須の項目です</div>}
          </li>
          <li>
            <label id="description">説明：</label>
            <input id="description" {...register('description')} />
          </li>
          <li>
            <label id="price">価格：</label>
            <input id="price" {...register('price')} />
          </li>
          <li>
            <label id="imageUrl">商品画像URL : </label>
            <input id="imageUrl" {...register('imageUrl')} />
          </li>
        </ul>

        <h2>商品オプション情報</h2>
        {/* <ul>
          <li>
            <label id="option-name">名称：</label>
            <input type="text" name="option-name" id="option-name" />
          </li>
          <li>
            <label id="option-description">説明：</label>
            <input type="text" name="option-description" id="option-description" />
          </li>
          <li>
            <label id="option-price">価格：</label>
            <input type="text" name="option-price" id="option-price" />
          </li>
        </ul> */}
        <button type="submit">登録</button>
      </form>
      <Link href="/">一覧画面へ</Link>
    </section>
  );
}
