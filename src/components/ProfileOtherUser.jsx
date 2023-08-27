/* eslint-disable react/prop-types */
// 使用的 UI 元件：https://tailwindcomponents.com/component/profile-page
import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { app, db } from "@/utils/firebase"
// import { doc, getDoc } from "firebase/firestore";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
import LogoutBtn from './LogoutBtn';

export default function ProfileOtherUser({ displayName, photoURL, introduction, userCreationTime, userLastSignInTime }) {
  // const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true);

  const [formattedCreationTime, setUserCreationTime] = useState('no record');
  const [formattedLastSignInTime, setUserLastSignInTime] = useState('no record');

  // 轉換 userCreationTime 與 userLastSignInTime 時間格式
  useEffect(() => {
    setIsLoading(true);
    // 轉換帳號註冊、上次上線時間的資料格式
    const creationTime = new Date(userCreationTime);
    const lastSignInTime = new Date(userLastSignInTime);
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    const tempCreationTime = creationTime.toLocaleDateString('en-GB', options);
    const tempLastSignInTime = lastSignInTime.toLocaleDateString('en-GB', options);
    setUserCreationTime(tempCreationTime) // 輸出應為 "26 Aug 2023"
    setUserLastSignInTime(tempLastSignInTime)
    setIsLoading(false);
  }, []);

  // 如果還在 loading 那就顯示 Loading 字樣，loading 結束再渲染真正內容
  if (isLoading) return <div className="mt-24">Loading...</div>;

  return (
    <>
      <div className="bg-gray-100 mt-16">
        {/* 主體 */}
        <div className="container mx-auto my-5 p-5">
          <div className="md:flex no-wrap md:-mx-2 ">
            {/* Left Side */}
            <div className="w-full mx-2 md:w-3/12">
              {/* Profile Card */}
              <div className="bg-white p-3 border-t-4 border-green-400">
                {/* 大頭照 */}
                <div className='relative'>
                  <div className="image w-40 h-40 mx-auto rounded-full overflow-hidden border-2 border-solid">
                    <img className="h-auto w-full mx-auto" src={photoURL} alt="" />
                  </div>
                </div>
                <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{displayName}</h1>
                {/* 自介 */}
                <div className='flex items-center'>
                  <div className="text-gray-600 text-lg font-semibold">Introduction</div>
                </div>
                <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">{introduction}</p>

                <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                  <li className="flex items-center py-3">
                    <span>Member since</span>
                    <span className="ml-auto">{formattedCreationTime}</span>
                  </li>
                  <li className="flex items-center py-3">
                    <span>Last sign in</span>
                    <span className="ml-auto">{formattedLastSignInTime}</span>
                  </li>
                </ul>
              </div>
              {/* End of profile card */}

              {/* Friends card，暫時不會用到 */}
              {/* <div className="my-4">
                <div className="bg-white p-3 hover:shadow">
                  <div className="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
                    <span className="text-green-500">
                      <svg className="h-5 fill-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </span>
                    <span>Similar Profiles</span>
                  </div>
                  <div className="grid grid-cols-3">
                    <div className="text-center my-2">
                      <img className="h-16 w-16 rounded-full mx-auto" src="https://cdn.australianageingagenda.com.au/wp-content/uploads/2015/06/28085920/Phil-Beckett-2-e1435107243361.jpg" alt="" />
                      <a href="#" className="text-main-color">Kojstantin</a>
                    </div>
                    <div className="text-center my-2">
                      <img className="h-16 w-16 rounded-full mx-auto" src="https://avatars2.githubusercontent.com/u/24622175?s=60&v=4" alt="" />
                      <a href="#" className="text-main-color">James</a>
                    </div>
                    <div className="text-center my-2">
                      <img className="h-16 w-16 rounded-full mx-auto" src="https://picsum.photos/500" alt="" />
                      <a href="#" className="text-main-color">Natie</a>
                    </div>
                  </div>
                </div>
              </div> */}
              {/* End of friends card */}
            </div>

            {/* Right Side */}
            <div className="w-full mx-2 h-64 md:w-9/12">
              {/* Profile tab */}
              {/* About Section */}
              <div className="bg-white p-3 shadow-sm rounded-sm">
                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                  <span className="text-green-500">
                    <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </span>
                  <span className="tracking-wide">About</span>
                </div>
                <div className="text-gray-700">
                  <div className="text-sm">
                    {/* 使用者名稱 */}
                    <div className="grid grid-cols-3 my-1">
                      <div className="px-4 py-2 font-semibold">Display Name</div>
                      <div className="px-4 py-2">{displayName}</div>
                    </div>
                    {/* 使用者 email，暫時不顯示其他人的 email */}
                    {/* <div className="grid grid-cols-3 my-1">
                      <div className="px-4 py-2 font-semibold">Email.</div>
                      <div className="px-4 py-2">
                        <a className="text-blue-800" href="mailto:jane@example.com">{email}</a>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
              {/* End of about section */}
              <div className="my-4" />
              {/* Experience and education */}
              <div className="bg-white p-3 shadow-sm rounded-sm">
                <div className="grid grid-cols-2">
                  <div>
                    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                      <span className="text-green-500">
                        <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </span>
                      <span className="tracking-wide">Experience</span>
                    </div>
                    <ul className="list-inside space-y-2">
                      <li>
                        <div className="text-teal-600">Owner at Her Company Inc.</div>
                        <div className="text-gray-500 text-xs">March 2020 - Now</div>
                      </li>
                      <li>
                        <div className="text-teal-600">Owner at Her Company Inc.</div>
                        <div className="text-gray-500 text-xs">March 2020 - Now</div>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                      <span className="text-green-500">
                        <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                          <path fill="#fff" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                        </svg>
                      </span>
                      <span className="tracking-wide">Education</span>
                    </div>
                    <ul className="list-inside space-y-2">
                      <li>
                        <div className="text-teal-600">Masters Degree in Oxford</div>
                        <div className="text-gray-500 text-xs">March 2020 - Now</div>
                      </li>
                      <li>
                        <div className="text-teal-600">Bachelors Degree in LPU</div>
                        <div className="text-gray-500 text-xs">March 2020 - Now</div>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* End of Experience and education grid */}
              </div>
              {/* End of profile tab */}
            </div>
          </div>

          {/* 登出鈕 */}
          <LogoutBtn otherClass="mt-4" />
        </div>
      </div>
    </>
  )
}