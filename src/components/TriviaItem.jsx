/* eslint-disable react/prop-types */
// 使用的 UI 元件：https://tailwindcomponents.com/component/user-post-card
// UI 元件備案：https://tailwindcomponents.com/component/maede
import { useState, useEffect } from 'react'
import ReactTimeAgo from 'react-time-ago'
import { useNavigate } from 'react-router-dom';
import { db } from "@/utils/firebase"
import { doc, getDoc, collection, query, orderBy, onSnapshot } from "firebase/firestore";

export default function TriviaItem({ id, title, triviaContent, createdAt, imageUrl, authorUid }) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true);
  const [author, setAuthor] = useState({});
  const [commentsQuantity, setCommentsQuantity] = useState(0);

  // 看單則 trivia 細節
  function handleTriviaDetailClick() {
    // 點擊後導向該 trivia 詳細頁面
    navigate(`/trivia/${id}`)
  }

  // 從 Firebase 拿作者資料與留言數量
  useEffect(() => {
    // 拿作者資料
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
    // 拿留言數量
    const getCommentsQuantity = () => {
      // 取得 comments 子集合參考，讓電腦知道位置在哪
      const commentsCollectionRef = collection(db, "trivia", id, "comments");
      // 建立查詢條件，意思是查詢該集合所有項目，並按照創建時間降冪排列
      const commentsQuery = query(commentsCollectionRef, orderBy("createdAt", "desc"));

      // 使用 onSnapshot 監聽資料變化
      const unsubscribe = onSnapshot(commentsQuery, (querySnapshot) => {
        // 把回傳結果變成可以用的陣列並稍作整理
        const allComments = querySnapshot.docs.map((doc) => {
          // 回傳原本資料，再加上文章 id
          return { id: doc.id, ...doc.data() };
        });
        // 儲存 comments 數量
        setCommentsQuantity(allComments.length)
        setIsLoading(false);
      });

      // 返回一個清理函式，在組件卸載時停止監聽，即 onSnapshot() 給你用的監聽停止器
      return () => {
        unsubscribe();
      };
    }
    // 執行函式
    getAuthorAsync()
    getCommentsQuantity()
  }, []); // 注意，這裡的空陣列意味著 useEffect 只在組件掛載和卸載時運行。

  // 如果還在 loading 那就顯示 Loading 字樣，loading 結束再渲染真正內容
  if (isLoading) return <div className="mt-24">Loading...</div>;

  return (
    <div className="flex items-center justify-center min-h-max my-4">
      {/* trivia 卡片 */}
      <div
        className="flex rounded-xl border p-5 shadow-md w-9/12 bg-white cursor-pointer hover:bg-slate-100"
        onClick={handleTriviaDetailClick}
      >
        {/* 左側圖片區，該篇 trivia 圖片，高度為寬度 40% */}
        <div className="w-1/4 hidden sm:flex justify-center">
          <img src={imageUrl} alt="trivia image" className="object-cover h-full rounded-xl shadow-xl" />
        </div>

        {/* 間隔區塊 */}
        <div className="w-[3%] lg:w-[6%]"></div>

        {/* 右側卡片資訊 */}
        <div className='w-full sm:w-3/4'>
          <div className="flex w-full items-center justify-between border-b pb-3">
            {/* 頭像與名稱 */}
            <div className="flex items-center space-x-3">
              <div className='h-8 w-8 rounded-full bg-slate-400'>
                <img src={author.photoURL || 'https://thumbs.dreamstime.com/z/default-avatar-profile-icon-social-media-user-vector-default-avatar-profile-icon-social-media-user-vector-portrait-176194876.jpg?w=768'} alt="user photo" className="object-cover h-8 w-8 rounded-full shadow-xl" />
              </div>
              <div className="text-lg font-bold text-slate-700">{author.displayName || 'author'}</div>
            </div>
            {/* 類別與發文時間 */}
            <div className="flex items-center space-x-8">
              {/* 類別標籤，先不用 */}
              {/* <button className="rounded-2xl border bg-neutral-100 px-3 py-1 text-xs font-semibold">
                Category
              </button> */}
              {/* 發文時間 */}
              <div className="text-xs text-neutral-500">
                <span className='hidden sm:inline'>created at </span>
                {/* 下個條件式，不然一開始資料還沒來，日期是 undefined */}
                {createdAt ? (
                  <ReactTimeAgo date={createdAt?.toDate()} locale="en-US" timeStyle="twitter" />
                ) : (
                  'No date available'
                )}
              </div>
            </div>
          </div>
          <div className="mt-4 mb-6">
            {/* 標題 */}
            <div className="mb-3 text-xl font-bold">{title}</div>
            {/* 內文，將字數限制在最多 3 行 */}
            <div className="text-sm text-neutral-600 line-clamp-[1] sm:line-clamp-[3]">{triviaContent}</div>
          </div>
          <div>
            {/* 留言數與按讚數 */}
            <div className="flex items-center justify-between text-slate-500">
              <div className="flex space-x-4 md:space-x-8">
                <div className="flex cursor-pointer items-center transition hover:text-slate-600">
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
                  <span>{commentsQuantity}</span>
                </div>
                {/* 按讚數，先不用 */}
                {/* <div className="flex cursor-pointer items-center transition hover:text-slate-600">
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
                      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                    />
                  </svg>
                  <span>4</span>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}