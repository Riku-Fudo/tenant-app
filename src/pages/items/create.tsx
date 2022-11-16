import { useForm, SubmitHandler } from 'react-hook-form';
import Link from 'next/link';
import { FetchData } from '../../../posts/post';
import { useState } from 'react';

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
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  deleted: boolean;
  options: Option[];
};

export default function Regist() {
  const [option1, setOption1] = useState(false);
  const [option2, setOption2] = useState(false);
  const [option3, setOption3] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({ defaultValues: { deleted: false } });

  // fetch実行関数
  const doFetch: SubmitHandler<FormValues> = (data) => {
    // Number型にキャスト
    if(!(data.options.length === 0)){
      data.options.map((option) => {
        option.id = Number(option.id);
        option.price = Number(option.price);
      })
    }
    data.price = Number(data.price);
    // fetchの実行
    FetchData(data,'POST').then(() => {
      reset();
    });
  };

  return (
    <section className={'item-Regist-Wrrapper'}>
      <form onSubmit={handleSubmit(doFetch)}>
        <h2>商品情報入力画面</h2>
        <ul>
          <li>
            <label id="name">商品名 : </label>
            <input
              id="name"
              {...register('name', { required: true })}
            />
            {errors.name && (
              <div className="errorMessage">入力が必須の項目です</div>
            )}
          </li>
          <li>
            <label id="description">説明 : </label>
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

        <h2>オプション情報1</h2>
        <button onClick={() => setOption1(true)}>
          オプションを設定する
        </button>
        {option1 ? (
          <ul>
            <li>
              <label id="option-id">ID : </label>
              <input
                id="option-id"
                {...register(`options.${0}.id`)}
              />
            </li>
            <li>
              <label id="option-name">名称 : </label>
              <input
                id="option-name"
                {...register(`options.${0}.name`)}
              />
            </li>
            <li>
              <label id="option-description">説明 : </label>
              <input
                id="option-description"
                {...register(`options.${0}.description`)}
              />
            </li>
            <li>
              <label id="option-price">価格 : </label>
              <input
                id="option-price"
                {...register(`options.${0}.price`)}
              />
            </li>
          </ul>
        ) : (
          ''
        )}

        {option1 ? (
          <>
            <h2>オプション情報2</h2>
            <button onClick={() => setOption2(true)}>
              オプションを設定する
            </button>
          </>
        ) : (
          ''
        )}

        {option2 ? (
          <ul>
            <li>
              <label id="option-id">ID : </label>
              <input
                id="option-id"
                {...register(`options.${1}.id`)}
              />
            </li>
            <li>
              <label id="option-name">名称 : </label>
              <input
                id="option-name"
                {...register(`options.${1}.name`)}
              />
            </li>
            <li>
              <label id="option-description">説明 : </label>
              <input
                id="option-description"
                {...register(`options.${1}.description`)}
              />
            </li>
            <li>
              <label id="option-price">価格 : </label>
              <input
                id="option-price"
                {...register(`options.${1}.price`)}
              />
            </li>
          </ul>
        ) : (
          ''
        )}

        {option2 ? (
          <>
            <h2>オプション情報3</h2>
            <button onClick={() => setOption3(true)}>
              オプションを設定する
            </button>
          </>
        ) : (
          ''
        )}

        {option3 ? (
          <ul>
            <li>
              <label id="option-id">ID : </label>
              <input
                id="option-id"
                {...register(`options.${2}.id`)}
              />
            </li>
            <li>
              <label id="option-name">名称 : </label>
              <input
                id="option-name"
                {...register(`options.${2}.name`)}
              />
            </li>
            <li>
              <label id="option-description">説明 : </label>
              <input
                id="option-description"
                {...register(`options.${2}.description`)}
              />
            </li>
            <li>
              <label id="option-price">価格 : </label>
              <input
                id="option-price"
                {...register(`options.${2}.price`)}
              />
            </li>
          </ul>
        ) : (
          ''
        )}
        <button type="submit">登録</button>
      </form>
      <Link href="/">一覧画面へ</Link>
    </section>
  );
}
