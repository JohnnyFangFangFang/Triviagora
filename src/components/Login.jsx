// 使用的 UI 元件：https://tailwindcomponents.com/component/login-page-glass-effect-and-background-image

// 之後要記得改 logo 圖與背景

import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
// 不用把 auth 從 firebase.js 引入嗎？
import { app, db } from "@/utils/firebase"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";


export default function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  // 按下登入鈕
  function handleLoginClick(e) {
    e.preventDefault(); // 防止表單自動提交

    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const userRef = doc(db, "users", user.uid);
        // 更新資料庫裡的 userLastSignInTime
        await updateDoc(userRef, {
          userLastSignInTime: user.metadata.lastSignInTime
        });
        // 登入後把使用者導向個人頁面
        console.log("成功登入耶耶耶")
        navigate('/profile');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("errorCode: ", errorCode)
        alert("errorMessage: ", errorMessage)
        // 帳號輸入錯誤提示
        if (errorCode === "auth/user-not-found") {
          alert(`User is not found. Please check whether the email is correct or please register first.`)
        }
        // 密碼輸入錯誤提示
        if (errorCode === "auth/wrong-password") {
          alert(`Wrong password, please check again.`)
        }
      });
  }

  return (
    <>
      {/* 最外層 container，負責背景圖 */}
      <div
        className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1499123785106-343e69e68db1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1748&q=80")'
        }}
      >
        {/* 登入框 */}
        <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
          <div className="text-white">
            <div className="mb-8 flex flex-col items-center">
              {/* 放 logo 圖 */}
              <img
                src="https://www.logo.wine/a/logo/Instagram/Instagram-Glyph-Color-Logo.wine.svg"
                width={150}
                alt=""
                srcSet=""
              />
              <h1 className="mb-2 text-2xl">Triviagora</h1>
              <span className="text-gray-300">Enter Login Details</span>
            </div>
            <form className='flex flex-col items-center' action="#">
              {/* 輸入帳號 */}
              <div className="mb-4 text-lg">
                <input
                  className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="text"
                  name="name"
                  placeholder="id@email.com"
                  onChange={e => setEmail(e.target.value.trim())}
                />
              </div>
              {/* 輸入密碼 */}
              <div className="mb-4 text-lg">
                <input
                  className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="Password"
                  name="name"
                  placeholder="*********"
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              {/* 登入鈕 */}
              <div className="mt-8 flex justify-center text-lg text-black">
                <button
                  type="button"
                  className="rounded-3xl bg-yellow-400 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600"
                  onClick={handleLoginClick}
                >
                  Login
                </button>
              </div>
              {/* 導向註冊頁面 */}
              <div className="mt-4 flex justify-center text-sm text-black">
                <button
                  type="button"
                  className="rounded-3xl bg-gray-400 bg-opacity-20 px-10 py-2 text-gray-300 shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-gray-300 hover:text-black"
                  onClick={() => navigate('/register')}
                >
                  Does not have an account?<br />
                  Welcome to register!
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}