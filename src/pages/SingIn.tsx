import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useAuth from "../hooks/zustand/useAuth";

type FormValues = {
  email: string;
  password: string;
};

export default function SingIn() {
  const { register, handleSubmit } = useForm<FormValues>();
  const { signIn } = useAuth();
  const handleSignIn: SubmitHandler<FormValues> = async (data) => {
    try {
      await signIn(data);
      alert("로그인 성공");
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
        <input id="email" {...register("email", { required: true })} />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          {...register("password", { required: true })}
        />
        <button>Login</button>
      </form>
    </div>
  );
}
