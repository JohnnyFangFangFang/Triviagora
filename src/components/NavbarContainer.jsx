/* eslint-disable react/prop-types */
// 使用的 UI 元件：https://tailwindcomponents.com/component/sidebar-with-navbar-and-breadcrumb
// UI 元件備案：https://tailwindcomponents.com/component/sticky-navbar-component
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getAuth, signOut } from "firebase/auth";

export default function NavbarContainer({ children, currentPage }) {
  const navigate = useNavigate()

  const auth = getAuth();
  const user = auth.currentUser;

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

    <>
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

      {/* Navbar start */}
      <nav
        id="navbar"
        className="fixed top-0 z-40 flex w-full justify-center bg-gray-700 px-4 sm:justify-start"
      >
        {/* 漢堡排 */}
        <button
          id="btnSidebarToggler"
          type="button"
          className="py-4 text-2xl text-white hover:text-gray-200"
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
            <a href="#">Triviagora</a>
          </li>
          <li className="inline">
            <span>{currentPage}</span>
          </li>
        </ul>
        {/* 使用者頭像 */}
        <img
          src={user.photoURL || 'https://thumbs.dreamstime.com/z/default-avatar-profile-icon-social-media-user-vector-default-avatar-profile-icon-social-media-user-vector-portrait-176194876.jpg?w=768'}
          alt="user photo"
          className="absolute top-2 right-4 object-cover h-12 w-12 rounded-full shadow-xl"
        />
      </nav>
      {/* Navbar end */}

      {/* Sidebar start*/}
      <div id="containerSidebar" className="z-40">
        <div className="navbar-menu relative z-40">
          <nav
            id="sidebar"
            className="fixed left-0 bottom-0 flex w-3/4 -translate-x-full flex-col overflow-y-auto bg-gray-700 pt-6 pb-8 sm:max-w-xs lg:w-80"
          >
            {/* 主要功能區 */}
            <div className="px-4 pb-6">
              <h3 className="mb-2 text-xs font-medium uppercase text-gray-300">
                Main
              </h3>
              <ul className="mb-8 text-sm font-medium">
                {/* 首頁 */}
                <li>
                  <a
                    className={` ${currentPage === 'HomePage' ? 'active' : ''} flex items-center rounded py-3 pl-3 pr-4 text-white hover:bg-gray-600 cursor-pointer`}
                    // href="/"
                    onClick={() => navigate('/')}
                  >
                    <span className="select-none">HomePage</span>
                  </a>
                </li>
                {/* 個人頁面 */}
                <li>
                  <a
                    className={` ${currentPage === 'Profile' ? 'active' : ''} flex items-center rounded py-3 pl-3 pr-4 text-white hover:bg-gray-600 cursor-pointer`}
                    // href="profile"
                    onClick={() => navigate('/profile')}
                  >
                    <span className="select-none">Profile & Settings</span>
                  </a>
                </li>
                {/* 發文頁面 */}
                <li>
                  <a
                    className={` ${currentPage === 'PostTrivia' ? 'active' : ''} flex items-center rounded py-3 pl-3 pr-4 text-white hover:bg-gray-600 cursor-pointer`}
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
            <div className="px-4 pb-6">
              <h3 className="mb-2 text-xs font-medium uppercase text-gray-300">
                Others
              </h3>
              <ul className="mb-8 text-sm font-medium">
                <li>
                  <a
                    className="flex items-center rounded py-3 pl-3 pr-4 text-gray-50 hover:bg-gray-600"
                    href="#tc"
                  >
                    <span className="select-none">About</span>
                  </a>
                </li>
                <li>
                  <a
                    className="flex items-center rounded py-3 pl-3 pr-4 text-gray-50 hover:bg-gray-600"
                    href="#privacy"
                  >
                    <span className="select-none">to be done</span>
                  </a>
                </li>
                <li>
                  <a
                    className="flex items-center rounded py-3 pl-3 pr-4 text-gray-50 hover:bg-gray-600"
                    href="#imprint"
                  >
                    <span className="select-none">to be done</span>
                  </a>
                </li>
              </ul>
            </div>
            {/* 第二區 end */}

            {/* 第三區 */}
            <div className="px-4 pb-6">
              <h3 className="mb-2 text-xs font-medium uppercase text-gray-300">
                Others
              </h3>
              <ul className="mb-8 text-sm font-medium">
                <li>
                  <div
                    className="flex items-center rounded py-3 pl-3 pr-4 text-gray-50 hover:bg-gray-600 cursor-pointer"
                    onClick={handleLogoutClick}
                  >
                    <span className="select-none">Log out</span>
                  </div>
                </li>
              </ul>
            </div>
            {/* 第三區 end */}
          </nav>
        </div>
        <div className="mx-auto lg:ml-80" />
      </div>
      {/* Sidebar end */}

      {/* 包含內容 */}
      <main>
        {children}
      </main>
    </>
  )
}