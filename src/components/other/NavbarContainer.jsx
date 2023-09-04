/* eslint-disable react/prop-types */
// 使用的 UI 元件：https://tailwindcomponents.com/component/sidebar-with-navbar-and-breadcrumb
// UI 元件備案：https://tailwindcomponents.com/component/sticky-navbar-component
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { app } from "@/utils/firebase"
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { DEFAULT_AVATAR_SVG } from '@/constants';
import { RiGithubFill } from 'react-icons/ri'
import { BiLogOut } from "react-icons/bi";

export default function NavbarContainer({ children, currentPage }) {
  const navigate = useNavigate()
  const [userPhoto, setUserPhoto] = useState(null)

  // 登出功能
  function handleLogoutClick() {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
      // 若使用者登出則導回登入頁面
      console.log("成功登出")
      navigate('/login');
    }).catch((error) => {
      // An error happened.
      console.log("error: ", error)
    });
  }

  // 確認使用者登入狀態並撈使用者頭像
  const auth = getAuth(app);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserPhoto(user.photoURL)
    } else {
      // 若使用者未登入則導回登入頁
      navigate('/login');
    }
  });

  // 在 DOM 生成後用選取元素的方式去操作側邊欄收合
  useEffect(() => {
    const navbar = document.getElementById("navbar");
    const sidebar = document.getElementById("sidebar");
    const btnSidebarToggler = document.getElementById("btnSidebarToggler");
    const navClosed = document.getElementById("navClosed");
    const navOpen = document.getElementById("navOpen");

    const handleToggle = (e) => {
      e.preventDefault();
      sidebar.classList.toggle("show");
      navClosed.classList.toggle("hidden");
      navOpen.classList.toggle("hidden");
    };

    btnSidebarToggler.addEventListener("click", handleToggle);
    sidebar.style.top = parseInt(navbar.clientHeight) - 1 + "px";

    // 在元件卸載時移除監聽事件
    return () => btnSidebarToggler.removeEventListener("click", handleToggle);
  }, []);


  return (

    <div className='relative min-h-screen'>
      {/*Change class "fixed" to "sticky" in "navbar" (l. 33) so the navbar doesn't hide any of your page content!*/}
      {/* 
      使用React中的dangerouslySetInnerHTML屬性來插入一段內嵌的CSS樣式，不過需要謹慎使用，因為如果不正確地處理，可能會導致跨站腳本攻擊（XSS）的風險。下面這段定義了漢堡排中每個項目之間的分隔符號、側邊欄的轉場效果和顯示狀態、側邊欄中活躍連結的背景顏色。 
      */}
      <style
        dangerouslySetInnerHTML={{
          __html:
            '\n    ul.breadcrumb li+li::before {\n        content: "\\276F";\n        padding-left: 8px;\n        padding-right: 4px;\n        color: inherit;\n    }\n\n    ul.breadcrumb li span {\n        opacity: 60%;\n    }\n\n    #sidebar {\n        -webkit-transition: all 300ms cubic-bezier(0, 0.77, 0.58, 1);\n        transition: all 300ms cubic-bezier(0, 0.77, 0.58, 1);\n    }\n\n    #sidebar.show {\n        transform: translateX(0);\n    }\n\n    #sidebar ul li a.active {\n        background: #1f2937;\n        background-color: #1f2937;\n    }\n'
        }}
      />

      {/* Navbar start、原背景色 bg-gray-700 */}
      <nav
        id="navbar"
        className="fixed h-12 top-0 z-40 flex w-full justify-center bg-water-blue px-4 sm:justify-start"
      >
        {/* 漢堡排 */}
        <button
          id="btnSidebarToggler"
          type="button"
          className="py-2 text-2xl text-white hover:text-gray-200"
        >
          <svg
            id="navClosed"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-8 w-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
          <svg
            id="navOpen"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="hidden h-8 w-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {/* 現在頁面指引 */}
        <ul className="breadcrumb hidden flex-row items-center py-4 text-lg text-white sm:flex ml-4">
          <li className="inline">
            <span>Triviagora</span>
          </li>
          <li className="inline">
            <span className='ml-1'>{currentPage}</span>
          </li>
        </ul>
        {/* 使用者頭像 */}
        <div className='absolute top-1 right-4 object-cover h-10 w-10 rounded-full shadow-xl'>
          {userPhoto ? <img src={userPhoto} alt="user photo" className="object-cover h-full w-full rounded-full shadow-xl" /> : DEFAULT_AVATAR_SVG}
        </div>
      </nav>
      {/* Navbar end */}

      {/* 可收合側邊欄 Sidebar start*/}
      <div id="containerSidebar" className="z-40">
        <div className="relative z-40">
          <nav
            id="sidebar"
            className="fixed left-0 mt-6 min-h-fit px-2 pt-3 flex flex-col w-2/4 sm:w-44 -translate-x-full overflow-y-auto bg-water-blue rounded-r-2xl"
          >
            {/* 主要功能區 */}
            <div className="px-4 pb-1 text-white font-bold">
              <h3 className="mb-2 text-xl uppercase">
                Main
              </h3>
              <ul className="mb-8 text-sm font-medium">
                {/* 首頁 */}
                <li>
                  <a
                    className={` ${currentPage === 'HomePage' ? 'bg-gray-800/50' : ''} flex items-center rounded-2xl py-3 pl-3 pr-4 hover:bg-gray-500/50 cursor-pointer`}
                    onClick={() => navigate('/')}
                  >
                    <span className="select-none">HomePage</span>
                  </a>
                </li>
                {/* all trivia 頁面 */}
                <li>
                  <a
                    className={` ${currentPage === 'All Trivia' ? 'bg-gray-800/50' : ''} flex items-center rounded-2xl py-3 pl-3 pr-4 hover:bg-gray-500/50 cursor-pointer`}
                    onClick={() => navigate('/alltrivia')}
                  >
                    <span className="select-none">All Trivia</span>
                  </a>
                </li>
                {/* 個人頁面 */}
                <li>
                  <a
                    className={` ${currentPage === 'Profile & Settings' ? 'bg-gray-800/50' : ''} flex items-center rounded-2xl py-3 pl-3 pr-4 hover:bg-gray-500/50 cursor-pointer`}
                    // href="profile"
                    onClick={() => navigate('/profile')}
                  >
                    <span className="select-none">Profile & Settings</span>
                  </a>
                </li>
                {/* 發文頁面 */}
                <li>
                  <a
                    className={` ${currentPage === 'Post Trivia' ? 'bg-gray-800/50' : ''} flex items-center rounded-2xl py-3 pl-3 pr-4 hover:bg-gray-500/50 cursor-pointer`}
                    // href="posttrivia"
                    onClick={() => navigate('/posttrivia')}
                  >
                    <span className="select-none">Post Trivia</span>
                  </a>
                </li>
              </ul>
            </div>
            {/* 主要功能區 end*/}

            {/* 第二區 */}
            <div className="px-4 pb-1 text-white font-bold">
              <h3 className="mb-2 text-xl uppercase">
                Others
              </h3>
              <ul className="mb-8 text-sm font-medium">
                <li>
                  <a
                    className={`${currentPage === 'About' ? 'bg-gray-800/50' : ''} flex items-center rounded-2xl py-3 pl-3 pr-4 hover:bg-gray-500/50 cursor-pointer`}
                    onClick={() => navigate('/about')}
                  >
                    <span className="select-none">About</span>
                  </a>
                </li>
                <li>
                  <a
                    className={`${currentPage === 'News' ? 'bg-gray-800/50' : ''} flex items-center rounded-2xl py-3 pl-3 pr-4 hover:bg-gray-500/50 cursor-pointer`}
                    onClick={() => navigate('/news')}
                  >
                    <span className="select-none">News</span>
                  </a>
                </li>
                <li>
                  <a
                    className={`${currentPage === 'Credit' ? 'bg-gray-800/50' : ''} flex items-center rounded-2xl py-3 pl-3 pr-4 hover:bg-gray-500/50 cursor-pointer`}
                    onClick={() => navigate('/credit')}
                  >
                    <span className="select-none">Credit</span>
                  </a>
                </li>
              </ul>
            </div>
            {/* 第二區 end */}

            {/* 第三區 */}
            <div className="px-4 pb-1 text-white font-bold border-t-2">
              {/* 標題暫時不需要 */}
              {/* <h3 className="mb-2 text-xl uppercase">
                Others
              </h3> */}
              <ul className="my-2 text-sm font-medium">
                <li>
                  <div
                    className="flex items-center rounded-2xl py-3 pl-3 pr-4 hover:bg-gray-500/50 cursor-pointer"
                    onClick={handleLogoutClick}
                  >
                    <BiLogOut className='text-2xl' />
                    <span className="select-none ml-1">Log out</span>
                  </div>
                </li>
              </ul>
            </div>
            {/* 第三區 end */}
          </nav>
        </div>
      </div>
      {/* Sidebar end */}

      {/* 包含內容 */}
      <main className=''>
        {children}
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 w-full py-1 bg-water-blue text-white flex justify-center gap-10">
        <p className="hidden sm:block w-fit font-bold text-xl">
          Triviagora
        </p>
        <p className="flex w-fit items-center sm:text-lg">
          Copyright © 2023
          {/* 資安考量：noopener 會阻止新開啟的分頁存取原始頁面的 window 物件，而 noreferrer 會隱藏來源網站的信息 */}
          <a href="https://github.com/JohnnyFangFangFang" target="_blank" rel="noopener noreferrer" className="ml-3 underline hover:text-yellow-300">
            Johnny Fang
            <RiGithubFill className="ml-1 mb-0.5 inline-block text-2xl" />
          </a>
        </p>
      </footer>
    </div>
  )
}