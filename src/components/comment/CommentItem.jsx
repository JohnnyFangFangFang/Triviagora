/* eslint-disable react/prop-types */
// 使用的 UI 元件：https://tailwindcomponents.com/component/user-post-card
// UI 元件備案：https://tailwindcomponents.com/component/maede
import { useState, useEffect, Fragment } from 'react'
import { useNavigate } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago'
import { db } from "@/utils/firebase"
import { doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { DEFAULT_AVATAR_SVG } from '@/constants';
import DeleteComment from './DeleteComment';

export default function CommentItem({ comment, createdAt, authorUid, triviaId, commentId }) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true);
  const [author, setAuthor] = useState({});

  // 為了讓換行符能夠實際變成 JSX 這樣畫面才會實際換行，所以要做一下轉換
  // 因為是用換行符切陣列元素，所以只要不是陣列最後一個元素，都要加個空白行
  const formattedComment = comment.split('\n').map((str, index, array) =>
    index === array.length - 1 ? str : (
      <Fragment key={index}>
        {str}
        <br />
      </Fragment>
    )
  );

  // 先拿使用者資料
  const auth = getAuth();
  const user = auth.currentUser;

  // 看留言者細節
  function handleAvatarClick() {
    // 如果作者是自己，那就回到自己的 profile 頁面
    if (user.uid === authorUid) {
      navigate(`/profile`)
    } else {
      // 若為別人則點擊後導向該作者 profile 頁面
      navigate(`/profile/${authorUid}`)
    }
  }

  // 從 Firebase 拿作者資料
  useEffect(() => {
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
    // 執行函式
    getAuthorAsync()
  }, []); // 注意，這裡的空陣列意味著 useEffect 只在組件掛載和卸載時運行。

  // 如果還在 loading 那就顯示 Loading 字樣，loading 結束再渲染真正內容
  if (isLoading) return <div className="mt-24">Loading...</div>;

  return (
    <div className="flex items-center justify-center min-h-max my-4">
      {/* comment 卡片 */}
      <div className="relative w-full rounded-xl border p-5 shadow-md bg-slate-50">
        <div className="flex w-full items-center justify-between border-b pb-3">
          {/* 頭像與名稱 */}
          <div
            className="flex items-center space-x-3 p-1 rounded-lg border-2 border-slate-200 cursor-pointer hover:bg-slate-300"
            onClick={handleAvatarClick}
          >
            <div className='h-8 w-8 rounded-full bg-slate-400'>
              {author.photoURL ? <img src={author.photoURL} alt="user photo" className="object-cover h-full w-full rounded-full shadow-xl" /> : DEFAULT_AVATAR_SVG}
            </div>
            <div className="text-lg font-bold text-slate-700">{author.displayName || 'author'}</div>
          </div>
          {/* 時間戳記 */}
          <div className="flex items-center space-x-8">
            <div className="text-xs text-neutral-500">
              <ReactTimeAgo date={createdAt?.toDate()} locale="en-US" timeStyle="twitter" />
            </div>
          </div>

        </div>
        <div className="mt-4">
          {/* 內文 */}
          <div className="text-sm text-neutral-600">{formattedComment}</div>
        </div>
        {/* 如果是自己的貼文才會出現刪除鈕 */}
        {user.uid === authorUid && <DeleteComment triviaId={triviaId} commentId={commentId} />}
      </div>
    </div>
  )
}