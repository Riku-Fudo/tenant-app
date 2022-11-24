import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/router';

type Login = {
  id: string;
  password: string;
};
export default function Login() {
  const router = useRouter();
  const login: SubmitHandler<Login> = (data: Login) => {
    console.log(`id: ${data.id}`);
    console.log(`パスワード: ${data.password}`);
    fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then((res) =>{
      if(res.status === 200){
        router.push(`/items`)
      }else{
        alert('ログイン失敗');
        reset();
      }
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Login>();

  return (
    <form onSubmit={handleSubmit(login)} className={'login'}>
      <h2>ログイン画面</h2>
      <label id="id">ID : </label>
      <input
        id="id"
        {...register('id', { required: '『ID』は入力必須です.' })}
      />
      <br />
      {errors.id?.message && (
        <div className="errorMessage">{errors.id.message}</div>
      )}
      <label id="password">パスワード : </label>
      <input
        id="password"
        type="password"
        {...register('password', {
          required: '『パスワード』は入力必須です.',
        })}
      />
      <br />
      {errors.password?.message && (
        <div className="errorMessage">{errors.password.message}</div>
      )}
      <button type="submit">ログイン</button>
    </form>
  );
}
