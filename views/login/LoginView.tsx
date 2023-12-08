import Password from "@/components/password";
import Image from "next/image";
import React from "react";
import Logo from "@/public/img/logo.png";
import User from "@/models/login/User";

interface LoginViewProps {
  user: User;
  handleInputChange: Function;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

function Login({ user, handleInputChange, handleSubmit }: LoginViewProps) {
  return (
    <div className="flex items-center justify-center mt-10 mb-10">
      <div className="flex flex-col  items-center w-[700px] h-[1000px]">
        <Image src={Logo} alt="logo de l'ESTI" width={182} height={120}></Image>
        <h1 className="text-6xl font-bold mt-12 mb-16">Scholar management</h1>
        <h3 className="text-2xl font-bold">Se connecter à votre compte</h3>
        <form className="red" onSubmit={handleSubmit}>
          <div className="input flex flex-col align-baseline w-[500px] my-8 p-0">
            <label className="text-sm block mb-2 font-medium">Email *</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={(event) => handleInputChange(event)}
              className="input-login"
              required
              placeholder="example@gmail.com"
            />
          </div>

          <Password
            password={user.password}
            handleInputChange={handleInputChange}
          />
          <button
            type="submit"
            className="h-[56px] w-[500px] bg-blue-600 hover:bg-blue-700 text-white text-2xl font-semibold rounded-lg border-0"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
