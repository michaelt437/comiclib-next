import React, { useState } from "react";
import supabase from "../supabase";
import Layout from "../components/Layout/Layout";
import { useRouter } from "next/dist/client/router";

export default function Login () {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function updateEmail (event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function updatePassword (event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  async function login (): Promise<void> {
    if (email !== "" && password !== "") {
      const { user, error } = await supabase.auth.signIn({
        email: email,
        password: password
      });
      if (error) {
        window.alert("Login failed");
      } else {
        router.push("/");
      }
    } else {
      window.alert("Missing credentials.");
    }
  }
  return (
    <Layout layoutStyles="flex flex-col justify-center items-center">
      <div className="border border-gray-200 rounded-md w-2/5 p-6">
        <h2 className="mb-5">Log In</h2>
        <label htmlFor="email" className="block font-medium mb-1">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="text"
          value={email}
          placeholder="example@email.com"
          className="form-field w-full mb-5"
          onChange={updateEmail}
        />
        <label htmlFor="Password" className="block font-medium mb-1">
          Password
        </label>
        <input
          id="Password"
          name="Password"
          value={password}
          type="password"
          className="form-field w-full mb-5"
          onChange={updatePassword}
        />
        <button className="btn primary w-full" onClick={login}>
          Log In
        </button>
      </div>
    </Layout>
  );
}
