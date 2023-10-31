// import { FormEvent, useState } from 'react';

const LoginForm = () => {
  //   const handleLogin = (e: FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     console.log('Log in');
  //   };

  return (
    <div className="flex flex-col gap-2">
      {/* <h2 className="text-xl font-semibold">Log In</h2>
      <form className="flex flex-col gap-4" onSubmit={handleLogin}>
        <div>
          <label className="label">
            <span className="label-text">Username</span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            placeholder="Enter your username"
            name="loginUsername"
            value={loginUsername}
            onChange={handleLoginChange}
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            className="input input-bordered"
            placeholder="Enter your username"
            value={loginPassword}
            onChange={handleLoginChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Log In
        </button>
      </form> */}
    </div>
  );
};

export default LoginForm;
