/* eslint-disable react/prop-types */
import { useState, useEffect, Fragment } from 'react'
import { useNavigate } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago'
import { db } from "@/utils/firebase"
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { CommentCollection, PostCommentModal } from '@/components/comment';
import { DEFAULT_AVATAR_SVG } from '@/constants';
import earth_light_blue from "@/assets/earth_light_blue.png"
import DeleteTrivia from "./DeleteTrivia"


export default function TriviaItemForPage({ title, triviaContent, createdAt, imageUrl, authorUid, triviaId }) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true);
  const [author, setAuthor] = useState({});
  const [isTriviaSaved, setIsTriviaSaved] = useState(false);
  const [commentsQuantity, setCommentsQuantity] = useState(0);

  // 這段是要先拿取使用者資料
  const auth = getAuth();
  const user = auth.currentUser;
  // 先提供使用者資料指引，方便後面資料操作
  const userRef = doc(db, "users", user.uid);

  // 為了讓換行符能夠實際變成 JSX 這樣畫面才會實際換行，所以要做一下轉換
  // 因為是用換行符切陣列元素，所以只要不是陣列最後一個元素，都要加個空白行
  const formattedTriviaContent = triviaContent.split('\n').map((str, index, array) =>
    index === array.length - 1 ? str : (
      <Fragment key={index}>
        {str}
        <br />
      </Fragment>
    )
  );

  // 看作者細節
  function handleAvatarClick() {
    // 如果作者是自己，那就回到自己的 profile 頁面
    if (user.uid === authorUid) {
      navigate(`/profile`)
    } else {
      // 若為別人則點擊後導向該作者 profile 頁面
      navigate(`/profile/${authorUid}`)
    }
  }


  // 文章收藏功能
  async function handleSaveClick() {
    // 依 isTriviaSaved 判斷是否已收藏文章
    // 沒收藏任何文章 => 代表 savedTriviaId 陣列不存在 => 創建它並加入該文 ID
    if (isTriviaSaved === 'no bookmarks') {
      await updateDoc(userRef, {
        savedTriviaId: [triviaId]
      });
      setIsTriviaSaved(true)
      // 判斷是否已收藏本文
    } else if (isTriviaSaved) {
      // 已收藏則取消收藏
      await updateDoc(userRef, {
        savedTriviaId: arrayRemove(triviaId)
      });
      setIsTriviaSaved(false)
    } else {
      // 若未收藏則收藏
      await updateDoc(userRef, {
        savedTriviaId: arrayUnion(triviaId)
      });
      setIsTriviaSaved(true)
      console.log('Save the trivia successfully!');
    }
  }


  // 從 Firebase 拿作者資料
  useEffect(() => {
    // 拿文章作者最新資料
    const getAuthorAsync = async () => {
      setIsLoading(true);
      if (authorUid !== '') {
        const docRef = doc(db, "users", authorUid); // 創建一個文件參考
        const docSnapshot = await getDoc(docRef); // 獲取文件快照
        if (docSnapshot.exists()) { // 檢查文件是否存在
          const data = docSnapshot.data(); // 獲取文件的全部資料
          setAuthor(data); // 更新 state
        } else {
          console.log("No such user!"); // 如果 user 不存在，則輸出錯誤訊息
        }
      }
      setIsLoading(false);
    }
    // 判斷使用者是否已收藏本文
    const getIsTriviaSavedAsync = async () => {
      // 讀取使用者資料
      const userDoc = await getDoc(userRef);
      const userData = userDoc.data();
      // 若有 savedTriviaId 則取屬性
      let savedTriviaId = userData?.savedTriviaId
      // 有資料則判斷是否已收藏本文
      if (savedTriviaId) {
        if (savedTriviaId.includes(triviaId)) {
          setIsTriviaSaved(true)
        } else {
          setIsTriviaSaved(false)
        }
        // 沒資料代表還沒收藏任何文章
      } else {
        setIsTriviaSaved('no bookmarks')
      }
    }
    // 執行函式
    getAuthorAsync()
    getIsTriviaSavedAsync()
  }, []); // 注意，這裡的空陣列意味著 useEffect 只在組件掛載和卸載時運行。

  // 如果還在 loading 那就顯示 Loading 字樣，loading 結束再渲染真正內容
  if (isLoading) return <div className="mt-24">Loading...</div>;

  return (
    <div className="flex items-center justify-center min-h-max pt-28 pb-24">
      {/* trivia 卡片 */}
      <div className="relative rounded-xl border p-5 shadow-md w-10/12 max-w-4xl bg-white">

        {/* 文章表頭區 */}
        <div className="md:flex w-full items-center justify-between border-b pb-3">
          {/* 標題 */}
          <div className="flex w-full md:w-[65%] items-center space-x-3">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold">{title}</div>
          </div>
          {/* 頭像、名稱、時間 */}
          <div className="flex w-full md:w-[35%] md:justify-end items-center md:space-x-4">
            {/* 頭像與使用者名稱 */}
            <div
              className="flex items-center space-x-3 p-2 rounded-lg cursor-pointer hover:bg-slate-300"
              onClick={handleAvatarClick}
            >
              <div className='h-16 w-16 rounded-full bg-slate-400 flex-shrink-0'>
                {author.photoURL ? <img src={author.photoURL} alt="user photo" className="object-cover h-full w-full rounded-full shadow-xl" /> : DEFAULT_AVATAR_SVG}
              </div>
              <div className="text-lg font-bold text-slate-700">{author.displayName || 'author'}</div>
            </div>
            {/* 類別標籤，暫時省略 */}
            {/* <button className="rounded-2xl border bg-neutral-100 px-3 py-1 text-xs font-semibold">
              Category
            </button> */}
            {/* 時間戳記 */}
            <div className="text-lg text-neutral-500">
              <ReactTimeAgo date={createdAt?.toDate()} locale="en-US" timeStyle="twitter" />
            </div>
            {/* 如果是自己的貼文才會出現刪除鈕 */}
            {user.uid === authorUid && <DeleteTrivia triviaId={triviaId} />}
          </div>
        </div>

        {/* 文章內容區 */}
        <div className="mt-4 mb-6">
          {/* 該篇 trivia 圖片，高度為寬度 40% */}
          <div className="heightToWidth-40 flex justify-center my-8">
            {/* 若沒圖則使用預設圖片 */}
            <img src={imageUrl ? imageUrl : earth_light_blue} alt="trivia image" className="object-cover h-full rounded-xl shadow-xl" />
          </div>
          {/* 內文 */}
          <div className="mt-4 sm:text-xl text-neutral-600">{formattedTriviaContent}</div>
        </div>

        {/* 留言、收藏 icon 區 */}
        <div>
          <div className="flex items-center justify-between text-slate-500 border-b pb-3">
            <div className="flex space-x-4 md:space-x-8">
              {/* 留言數 */}
              <div className="flex items-center transition hover:text-slate-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-1.5 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>
                <span>{commentsQuantity || ''}</span>
              </div>
              {/* 按讚與收藏 */}
              <div
                className="flex cursor-pointer items-center transition hover:text-slate-600"
                onClick={handleSaveClick}
              >
                {/* 按讚，先不用 */}
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-1.5 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                  />
                </svg> */}
                {/* 收藏 */}
                <svg xmlns="http://www.w3.org/2000/svg"
                  // 若 isTriviaSaved 有東西要檢查一下是有收藏還是字串 no bookmarks
                  fill={isTriviaSaved ? isTriviaSaved === "no bookmarks" ? 'gray' : 'orange' : 'gray'}
                  className="mr-1.5 h-5 w-5"
                  viewBox="0 0 16 16"> <path d="M2 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L7 13.101l-4.223 2.815A.5.5 0 0 1 2 15.5V4z" /> <path d="M4.268 1A2 2 0 0 1 6 0h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L13 13.768V2a1 1 0 0 0-1-1H4.268z" />
                </svg>
                <span>Save</span>
              </div>
              {/* 留言功能 */}
              <PostCommentModal triviaId={triviaId} />
            </div>
          </div>
        </div>

        {/* 留言區 */}
        <div className='mt-3 text-3xl font-bold text-slate-400'>留言區</div>
        <CommentCollection
          triviaId={triviaId}
          setCommentsQuantity={setCommentsQuantity}
        />

      </div>
    </div>
  )
}