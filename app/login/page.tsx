"use client";

import { FormEvent, useState } from "react";
import styles from "./login.module.scss";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [data, setData] = useState({});

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:9000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        router.push("/dashboard");
      } else {
        console.error(result.message || "Login failed");
      }
      console.log("HTTP Status:", response.status);
      console.log("API Response:", result);
      console.log("Response OK:", response.ok);
      console.log("Success:", result.success);

      console.log(result);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  // const googleLogin = async () => {
  //   const response = await fetch("http://localhost:9000/api/auth/google", {
  //     method: "GET",
  //     headers: {
  //       content: "application/json",
  //     },
  //   });

  //   const result = await response.json();

  //   console.log(result);
  // };

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Login</h1>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="email">Email</label>

            <input
              id="email"
              type="email"
              placeholder="Email"
              onChange={(e) => {
                setData({
                  ...data,
                  email: e.target.value,
                });
              }}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password">Password</label>

            <input
              id="password"
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setData({
                  ...data,
                  password: e.target.value,
                });
              }}
            />
          </div>

          <button type="submit" className={styles.loginButton}>
            Login
          </button>
        </form>

        <div className={styles.divider}>
          <span>OR</span>
        </div>

        <a
          href="http://localhost:9000/api/auth/google"
          className={styles.googleButton}
        >
          Continue with Google
        </a>
      </div>
    </main>
  );
}
