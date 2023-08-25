// 使用的 UI 元件 post：https://tailwindcomponents.com/component/post-making-form
// 使用的 UI 元件 upload：https://tailwindcomponents.com/component/uploader-template

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, updateDoc, Timestamp } from "firebase/firestore";
import { db, app } from "@/utils/firebase"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function PostTrivia() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true);

  const [title, setTitle] = useState('')
  const [triviaContent, setTriviaContent] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [imageTempUrl, setImageTempUrl] = useState('');
  const [userId, setUserId] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [userPhotoUrl, setUserPhotoUrl] = useState('');


  // 暫存圖片 => 拿到暫時的 url => 立即顯示在畫面
  function handleImageFileChange(e) {
    const file = e.target.files[0];
    setImageFile(file);
    const url = URL.createObjectURL(file);
    setImageTempUrl(url); // 暫存 URL 到 state
  }

  // 指引到檔案庫，方便待會串資料
  const storage = getStorage();

  // 發文功能
  async function handlePostTriviaClick() {
    try {
      // 上傳文章但先傳入空物件，目的是先取得文章 id 當作圖片標題，後面再把文章本身內容填入
      const docRef = await addDoc(collection(db, "trivia"), {});

      // 圖片檔附加資訊，例如檔名、大小和內容類型等
      // 若 imageFile 存在則 contentType 為 imageFile.type
      const metadata = {
        contentType: imageFile?.type,
      };
      // 告訴電腦我們是要指向 storage 裡的哪個檔
      const fileRef = ref(storage, 'post-images/' + docRef.id);

      // 上傳圖片 => 拿到圖片 url => 更新文章填入內容
      if (imageFile) {
        uploadBytes(fileRef, imageFile, metadata).then(() => {
          getDownloadURL(fileRef).then(async (imageUrl) => {
            await updateDoc(docRef, {
              title,
              triviaContent,
              createdAt: Timestamp.now(),
              imageUrl,
              author: {
                userId,
                displayName,
                userPhotoUrl
              }
            });
            console.log('成功上傳檔案與文章內容，爽啦！文章 ID: ', docRef.id);
            // 成功發文後導回首頁
            navigate('/')
          })
        });
      } else {

        await updateDoc(docRef, {
          title,
          triviaContent,
          createdAt: Timestamp.now(),
          author: {
            userId,
            displayName,
            userPhotoUrl
          }
        });
        console.log('成功上傳文章內容，爽啦！文章 ID: ', docRef.id);
        // 成功發文後導回首頁
        navigate('/')
      }
    }
    catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  // 確認使用者登入狀態，以方便抓到發文者 ID
  useEffect(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      setIsLoading(true);
      if (user) {
        setUserId(user.uid)
        setDisplayName(user.displayName || "anonymous")
        setUserPhotoUrl(user.photoURL)
      } else {
        // 若使用者登出則導回登入頁面
        navigate('/login');
      }
      setIsLoading(false);
    });
  }, []);

  // 如果還在 loading 那就顯示 Loading 字樣，loading 結束再渲染真正內容
  if (isLoading) return <div className="mt-24">Loading...</div>;

  return (
    <>
      <div className="heading text-center font-bold text-2xl m-5 text-gray-800">
        New Post
      </div>

      <div className="grid grid-cols-3">
        {/* 上傳圖片鈕 */}
        <div
          className=" col-span-1 h-full flex bg-black bg-opacity-60 bg-cover bg-center"
          style={{ backgroundImage: `url(${imageTempUrl})` }}
        >
          {/* 上傳卡片樣式 */}
          <div className="p-4 bg-white w-max m-auto rounded-lg bg-opacity-70">
            <div
              className="file_upload p-5 relative border-4 border-dotted border-gray-300 rounded-lg"
            // style={{ width: 450 }}
            >
              <svg
                className="text-indigo-500 w-24 mx-auto mb-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <div className="input_field flex flex-col w-max mx-auto text-center">
                <label>
                  <input
                    className="text-sm cursor-pointer w-36 hidden"
                    type="file"
                    multiple=""
                    onChange={handleImageFileChange}
                  />
                  <div className="text bg-indigo-600 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-indigo-500">
                    Select
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* 右側發文區 */}
        <div className="editor col-span-2 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg">
          {/* 標題 */}
          <input
            className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
            spellCheck="false"
            placeholder="Title"
            type="text"
            onChange={e => setTitle(e.target.value)}
          />
          {/* 內文 */}
          <textarea
            className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none"
            spellCheck="false"
            placeholder="Describe everything about this post here"
            defaultValue={""}
            onChange={e => setTriviaContent(e.target.value)}
          />
          {/* icons */}
          <div className="icons flex text-gray-500 m-2">
            <svg
              className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <svg
              className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <svg
              className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              />
            </svg>
            <div className="count ml-auto text-gray-400 text-xs font-semibold">
              0/300
            </div>
          </div>
          {/* buttons */}
          <div className="buttons flex">
            <div className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto">
              Cancel
            </div>
            <div
              className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500"
              onClick={handlePostTriviaClick}
            >
              Post
            </div>
          </div>
        </div>

      </div>
    </>

  )
}