import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/zustand/useAuth';
import { SignInFormValues } from '../apis/types/authTypes';

export default function SingIn() {
  const { register, handleSubmit } = useForm<SignInFormValues>();
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const handleSignIn: SubmitHandler<SignInFormValues> = async data => {
    try {
      await signIn(data);
      navigate('/');
      alert('로그인 성공');
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <h1>Sign In Page</h1>
      <Link to="/">Home</Link>
      <form autoComplete="off" onSubmit={handleSubmit(handleSignIn)}>
        <label htmlFor="email">Email</label>
        <input id="email" {...register('email', { required: true })} />
        <label htmlFor="password">Password</label>
        <input id="password" type="password" {...register('password', { required: true })} />
        <button>Login</button>
      </form>
    </div>
  );
}
