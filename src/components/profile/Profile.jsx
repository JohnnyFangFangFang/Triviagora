// 使用的 UI 元件：https://tailwindcomponents.com/component/profile-page
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { app, db } from "@/utils/firebase"
import { doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import EditProfileInfoModal from './EditProfileInfoModal';
import EditProfilePhotoModal from './EditProfilePhotoModal';
import { TriviaCollection, SavedTriviaCollection } from '@/components/trivia';
import { DEFAULT_AVATAR_SVG } from '@/constants';
import profilepage from '@/assets/profilepage.svg'

export default function Profile() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [userId, setUserId] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [isPhotoChanged, setIsPhotoChanged] = useState(false);
  const [userCreationTime, setUserCreationTime] = useState('no record');
  const [userLastSignInTime, setUserLastSignInTime] = useState('no record');
  const [isEditAvailable, setIsEditAvailable] = useState(true)

  const testAccounts = ['user1@example.com', 'user2@example.com', 'user3@example.com', 'user4@example.com', 'user5@example.com', 'user6@example.com', 'test@example.com']

  // 另外從資料庫拿 introduction
  async function getUserIntroduction() {
    if (userId !== '') {
      const docRef = doc(db, "users", userId); // 創建一個文件參考
      const docSnapshot = await getDoc(docRef); // 獲取文件快照

      if (docSnapshot.exists()) { // 檢查文件是否存在
        const data = docSnapshot.data(); // 獲取文件的全部資料
        const introduction = data.introduction; // 獲取 introduction 字段
        setIntroduction(introduction); // 更新 state
      } else {
        console.log("No such document!"); // 如果文件不存在，則輸出錯誤訊息
      }
    }
  }

  // 確認使用者登入狀態並從一般資料庫撈取資料
  useEffect(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      setIsLoading(true);
      if (user) {
        setUserId(user.uid)
        setEmail(user.email);
        setDisplayName(user.displayName || "Please edit your display name")
        setPhotoURL(user.photoURL)

        // 若為測試帳號則不得改帳密
        if (testAccounts.includes(user.email)) {
          setIsEditAvailable(false)
        }

        // 轉換帳號註冊、上次上線時間的資料格式
        const creationTime = new Date(user.metadata.creationTime);
        const lastSignInTime = new Date(user.metadata.lastSignInTime);
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        const formattedCreationTime = creationTime.toLocaleDateString('en-GB', options);
        const formattedLastSignInTime = lastSignInTime.toLocaleDateString('en-GB', options);
        setUserCreationTime(formattedCreationTime) // 輸出應為 "26 Aug 2023"
        setUserLastSignInTime(formattedLastSignInTime)

        getUserIntroduction()
      } else {
        // 若使用者登出則導回登入頁面
        navigate('/login');
      }
      setIsLoading(false);
    });
  }, [displayName, email, isPhotoChanged, introduction]);


  // 如果還在 loading 那就顯示 Loading 字樣，loading 結束再渲染真正內容
  if (isLoading) return <div className="mt-24">Loading...</div>;

  return (
    <div className="bg-gray-100">
      {/* 主體 */}
      <div className="container mx-auto pt-28 pb-24 px-5">
        <div className="md:flex no-wrap md:-mx-2 ">
          {/* Left Side */}
          <div className="w-full mx-2 md:w-3/12">
            {/* Profile Card */}
            <div className="bg-white p-3 rounded-xl border-t-4 border-green-400">
              {/* 大頭照 */}
              <div className='relative'>
                <div className="image w-40 h-40 mx-auto rounded-full overflow-hidden border-2 border-solid">
                  {/* 若還沒設定則使用預設頭像 */}
                  {photoURL ? <img src={photoURL} alt="user photo" className="h-auto w-full mx-auto" /> : DEFAULT_AVATAR_SVG}
                </div>
                <EditProfilePhotoModal
                  userId={userId}
                  isPhotoChanged={isPhotoChanged}
                  setIsPhotoChanged={setIsPhotoChanged}
                />
              </div>
              <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{displayName}</h1>
              {/* 自介 */}
              <div className='flex items-center'>
                <div className="text-gray-600 text-lg font-semibold">Introduction</div>
                <EditProfileInfoModal
                  userId={userId}
                  setIntroduction={setIntroduction}
                  editContent="introduction"
                />
              </div>
              <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">{introduction}</p>

              <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                <li className="flex md:block lg:flex items-center py-3">
                  <p>Registered</p>
                  <p className="ml-auto">{userCreationTime}</p>
                </li>
                {/* 如果註冊後就沒再登入，那要換成註冊時間，不然會沒資料 */}
                <li className="flex md:block lg:flex items-center py-3">
                  <p>Last sign in</p>
                  <p className="ml-auto">{userLastSignInTime === "Invalid Date" ? userCreationTime : userLastSignInTime}</p>
                </li>
              </ul>
            </div>
            {/* End of profile card */}

            <img src={profilepage} alt="profilepage illustration image" className='hidden md:block mt-8' />

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
          <div className="w-full mx-2 md:w-9/12">
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
                    <EditProfileInfoModal
                      userId={userId}
                      setDisplayName={setDisplayName}
                      editContent="displayName"
                    />
                  </div>
                  {/* 使用者 email */}
                  <div className="grid grid-cols-3 my-1">
                    <div className="px-4 py-2 font-semibold">Email</div>
                    <div className="px-4 py-2">
                      <a className="text-blue-800">{email}</a>
                    </div>
                    {isEditAvailable && <EditProfileInfoModal
                      userId={userId}
                      setEmail={setEmail}
                      editContent="email"
                    />}
                  </div>
                  {/* 使用者密碼 */}
                  <div className="grid grid-cols-3 my-1">
                    <div className="px-4 py-2 font-semibold">Password</div>
                    <div className="px-4 py-2">********</div>
                    {isEditAvailable && <EditProfileInfoModal
                      userId={userId}
                      editContent="password"
                    />}
                  </div>
                </div>
              </div>
            </div>
            {/* End of about section */}

            <div className="my-4" />
            {/* 發文與收藏文章 */}
            <div className="bg-white p-3 shadow-sm rounded-sm">
              <div className="grid grid-cols-2">
                {/* 發文列表 */}
                <div>
                  <div className="flex items-center ml-3 mb-3 space-x-2 font-semibold text-gray-900 leading-8 border-b-2">
                    <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="blue">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="tracking-wide">Trivia Posted</span>
                  </div>
                  <TriviaCollection page={'profile'} userId={userId} />
                </div>
                {/* 收藏文章列表 */}
                <div>
                  <div className="flex ml-3 mb-3 items-center space-x-2 font-semibold text-gray-900 leading-8 border-b-2">
                    <svg xmlns="http://www.w3.org/2000/svg"
                      fill='orange'
                      className="h-5 w-5"
                      viewBox="0 0 16 16"> <path d="M2 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L7 13.101l-4.223 2.815A.5.5 0 0 1 2 15.5V4z" /> <path d="M4.268 1A2 2 0 0 1 6 0h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L13 13.768V2a1 1 0 0 0-1-1H4.268z" />
                    </svg>
                    <span className="tracking-wide">Trivia Saved</span>
                  </div>
                  <SavedTriviaCollection userId={userId} />
                </div>
              </div>
              {/* End of Experience and education grid */}
            </div>
            {/* End of profile tab */}
          </div>
        </div>
      </div>
    </div>
  )
}