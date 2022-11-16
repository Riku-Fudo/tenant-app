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

// formの型指定
type FormValues = {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  deleted: boolean;
  options: Option[];
};

export default function Regist() {
  // オプションの表示判定state
  const [option1, setOption1] = useState(false);
  const [option2, setOption2] = useState(false);
  const [option3, setOption3] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: { deleted: false },
    criteriaMode: 'all',
  });

  // fetch実行関数
  const doFetch: SubmitHandler<FormValues> = (data) => {
    // Number型にキャスト
    if (!(typeof data.options === 'undefined')) {
        data.options.map((option) => {
        option.id = Number(option.id);
        option.price = Number(option.price);
      });
    }
    data.price = Number(data.price);
    // fetchの実行
    FetchData(data, 'POST').then(() => {
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
              {...register('name', {
                required: '『商品名』は入力必須の項目です。',
              })}
            />
            {errors.name?.message && (
              <div className="errorMessage">
                {errors.name.message}
              </div>
            )}
          </li>
          <li>
            <label id="description">説明 : </label>
            <input
              id="description"
              {...register('description', {
                required: '『説明』は入力必須の項目です。',
              })}
            />
            {errors.description?.message && (
              <div className="errorMessage">
                {errors.description.message}
              </div>
            )}
          </li>
          <li>
            <label id="price">価格：</label>
            <input
              id="price"
              {...register('price', {
                required: {
                  value: true,
                  message: '『価格』は入力必須の項目です。',
                },
                pattern: {
                  value: /^[0-9]+$/,
                  message: '数字のみ入力してください。',
                },
              })}
            />
            {errors.price?.types?.required && (
              <div className="errorMessage">
                {errors.price.types?.required}
              </div>
            )}
            {errors.price?.types?.pattern && (
              <div className="errorMessage">
                {errors.price.types.pattern}
              </div>
            )}
          </li>
          <li>
            <label id="imageUrl">商品画像URL : </label>
            <input
              id="imageUrl"
              {...register('imageUrl', {
                required: '『説明』は入力必須の項目です。',
              })}
            />
            {errors.imageUrl?.message && (
              <div className="errorMessage">
                {errors.imageUrl.message}
              </div>
            )}
          </li>
        </ul>
        <section className={'option-wrrapper'}>
          <div className={'option-item'}>
            <h2>オプション情報1</h2>
            <input
              type="button"
              value="オプションを設定"
              onClick={() => setOption1(!option1)}
            />
            {option1 && (
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
            )}
          </div>

          <div className={'option-item'}>
            {option1 && (
              <>
                <h2>オプション情報2</h2>
                <input
                  type="button"
                  value="オプションを設定"
                  onClick={() => setOption2(!option2)}
                />
              </>
            )}

            {option2 && (
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
            )}
          </div>
          <div className={'option-item'}>
            {option2 && (
              <>
                <h2>オプション情報3</h2>
                <input
                  type="button"
                  value="オプションを設定"
                  onClick={() => setOption3(!option3)}
                />
              </>
            )}

            {option3 && (
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
            )}
          </div>
        </section>
        <button type="submit">登録</button>
      </form>
      <Link href="/">一覧画面へ</Link>
    </section>
  );
}
