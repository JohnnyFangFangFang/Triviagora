/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/utils/firebase"
import TriviaItem from "./TriviaItem";
import TriviaItemForProfile from './TriviaItemForProfile';

export default function TriviaCollection({ page, userId }) {
  const [isLoading, setIsLoading] = useState(true);
  const [allTrivia, setAllTrivia] = useState([]);

  useEffect(() => {
    // 取得 trivia 集合參考，讓電腦知道位置在哪
    const triviaCollectionRef = collection(db, "trivia");
    // 建立查詢條件，意思是查詢該集合所有項目，並按照創建時間降冪排列
    let triviaQuery = query(triviaCollectionRef, orderBy("createdAt", "desc"));

    // 如果是 profile 頁面則用 Uid 篩選出使用者發的文
    // 因為是複合查詢所以當時已在 FireStore 的索引頁面建立索引
    if (page === 'profile') {
      triviaQuery = query(triviaCollectionRef, where("authorUid", "==", userId), orderBy("createdAt", "desc"));
    }

    // 使用 onSnapshot 監聽資料變化
    const unsubscribe = onSnapshot(triviaQuery, (querySnapshot) => {
      setIsLoading(true);
      // 把回傳結果變成可以用的陣列並稍作整理
      const allTrivia = querySnapshot.docs.map((doc) => {
        // 回傳原本資料，再加上文章 id
        return { id: doc.id, ...doc.data() };
      });
      // 將擷取到的資料整理好存放到 state 裡
      setAllTrivia(allTrivia);
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
    <div className="">
      <div className="">
        {allTrivia.length !== 0 ?
          (allTrivia.map((trivia) => {
            // 首頁跟 profile 頁面渲染的元件不同
            if (page === 'homepage') {
              return (
                <TriviaItem key={trivia.id} {...trivia} />
              )
            } else if (page === 'profile') {
              return (
                <TriviaItemForProfile key={trivia.id} {...trivia} />
              )
            }
          })) : <div className='text-center'>You have not posted any trivia.</div>
        }
      </div>
    </div>
  )
}