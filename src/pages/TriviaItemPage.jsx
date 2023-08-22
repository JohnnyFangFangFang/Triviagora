/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/utils/firebase"
import NavbarContainer from '@/components/NavbarContainer';
import ReactTimeAgo from 'react-time-ago'

export default function TriviaItemPage() {
  const { id } = useParams(); // 從 URL 中取得文章 ID

  const [trivia, setTrivia] = useState({});

  const docRef = doc(db, "trivia", id);

  // 從 Firebase 拿該筆 trivia 資料
  useEffect(() => {
    const getTriviaItemAsync = async () => {
      // const querySnapshot = await getDocs(collection(db, "trivia"));
      const docSnap = await getDoc(docRef);
      console.log("docSnap.data() 是什麼：", docSnap.data())
      // 將擷取到的資料整理好存放到 state 裡
      setTrivia(docSnap.data());
    }
    // 執行函式
    getTriviaItemAsync()
  }, []); // 注意，這裡的空陣列意味著 useEffect 只在組件掛載和卸載時運行。

  return (
    <NavbarContainer currentPage="TriviaItem">
      <TriviaItemForPage {...trivia} />
    </NavbarContainer>
  );
}

export function TriviaItemForPage({ title, triviaContent, createdAt }) {
  return (
    <div className="flex items-center justify-center min-h-max mt-20 border-t-r">
      {/* trivia 卡片 */}
      <div className="rounded-xl border p-5 shadow-md w-10/12 bg-white">
        <div className="flex w-full items-center justify-between border-b pb-3">
          {/* 標題 */}
          <div className="flex items-center space-x-3">
            <div className="text-3xl font-bold">{title}</div>
          </div>
          <div className="flex items-center space-x-8">
            <button className="rounded-2xl border bg-neutral-100 px-3 py-1 text-xs font-semibold">
              Category
            </button>
            <div className="text-lg text-neutral-500">
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
          {/* 頭像與使用者名稱 */}
          <div className="flex items-center space-x-3">
            <div className="h-16 w-16 rounded-full bg-slate-400 bg-[url('https://i.pravatar.cc/32')]" />
            <div className="text-lg font-bold text-slate-700">Joe Smith</div>
          </div>
          {/* 內文 */}
          <div className="mt-4 text-xl text-neutral-600">{triviaContent}</div>
        </div>

        <div>
          {/* 留言、按讚 icon 區 */}
          <div className="flex items-center justify-between text-slate-500 border-b pb-3">
            <div className="flex space-x-4 md:space-x-8">
              {/* 留言 */}
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
                <span>125</span>
              </div>
              {/* 按讚 */}
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
                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                  />
                </svg>
                <span>4</span>
              </div>
            </div>
          </div>
        </div>
        {/* 留言區 */}
        <div className='mt-3 text-3xl font-bold text-slate-400'>測試留言區</div>
      </div>
    </div>
  )
}