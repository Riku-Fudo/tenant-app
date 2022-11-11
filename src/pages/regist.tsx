export default function Regist() {
  return (
    <section className={'item-Regist-Wrrapper'}>
      <form action="" method="post">
        <h2>商品情報入力画面</h2>
        <ul>
          <li>
            <label id="name">商品名：</label>
            <input type="text" name="name" id="name" />
          </li>
          <li>
            <label id="description">説明：</label>
            <input type="text" name="description" id="description" />
          </li>
          <li>
            <label id="price">価格：</label>
            <input type="text" name="price" id="price" />
          </li>
          <li>
            <label id="imageUrl">商品画像URL</label>
            <input type="text" name="imageUrl" id="imageUrl" />
          </li>
        </ul>

        <h2>商品オプション情報</h2>
        <ul>
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
        </ul>
      </form>
    </section>
  );
}
