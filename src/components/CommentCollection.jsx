/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import CommentItem from './CommentItem';
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/utils/firebase"

export default function CommentCollection({ triviaId }) {
  const [isLoading, setIsLoading] = useState(true);
  const [allComments, setAllComment] = useState([]);

  // 從 Firebase 拿該篇 trivia 所有 comments 資料
  useEffect(() => {
    // 取得 comments 子集合參考，讓電腦知道位置在哪
    const commentsCollectionRef = collection(db, "trivia", triviaId, "comments");
    // 建立查詢條件，意思是查詢該集合所有項目，並按照創建時間降冪排列
    const commentsQuery = query(commentsCollectionRef, orderBy("createdAt", "desc"));

    // 使用 onSnapshot 監聽資料變化
    const unsubscribe = onSnapshot(commentsQuery, (querySnapshot) => {
      setIsLoading(true);
      // 把回傳結果變成可以用的陣列並稍作整理
      const allComments = querySnapshot.docs.map((doc) => {
        // 回傳原本資料，再加上文章 id
        return { id: doc.id, ...doc.data() };
      });
      // 將擷取到的資料整理好存放到 state 裡
      setAllComment(allComments);
      setIsLoading(false);
    });

    // 返回一個清理函式，在組件卸載時停止監聽，即 onSnapshot() 給你用的監聽停止器
    return () => {
      unsubscribe();
    };
  }, []); // 注意，這裡的空陣列意味著 useEffect 只在組件掛載和卸載時運行。


  // 如果還在 loading 那就顯示 Loading 字樣，loading 結束再渲染真正內容
  if (isLoading) return <div className="mt-24">Loading...</div>;

  return (
    <div className="mt-2">

      {/* 測試用 */}
      <div className="border-t-r">
        {allComments.length !== 0 ?
          (allComments.map((comment) => {
            return (
              // 使用 Spread Attributes 寫法較簡潔
              <CommentItem key={comment.id} {...comment} />
            );
          })) : <></>
        }
      </div>

    </div>
  )
}