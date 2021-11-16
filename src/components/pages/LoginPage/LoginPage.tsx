import { FC, useState } from "react";

type LoginPageProps = {
  //
};

interface Account {
  username: string;
  password: string;
  level?: string;
}

const LoginPage: FC<any> = () => {
  const [account, setAccount] = useState<Account>({
    username: "",
    password: "",
    level: "normal",
  });

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="username"
          onChange={(e) => setAccount({ ...account, username: e.target.value })}
        />
        <br />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setAccount({ ...account, password: e.target.value })}
        />
        <br />
        <span>#Debug: {JSON.stringify(account)}</span>
        <br />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default LoginPage;
