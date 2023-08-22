import { useState, useEffect } from 'react'
import TriviaItem from "./TriviaItem";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/utils/firebase"

export default function TriviaCollection() {
  const [allTrivia, setAllTrivia] = useState([]);



  // 從 Firebase 拿所有 trivia 資料
  useEffect(() => {
    const getAllTriviaAsync = async () => {
      const querySnapshot = await getDocs(collection(db, "trivia"));
      const allTrivia = querySnapshot.docs.map((doc) => {
        // 回傳原本資料，再加上文章 id
        return { id: doc.id, ...doc.data() };
      });
      // 將擷取到的資料整理好存放到 state 裡
      setAllTrivia(allTrivia);
    }
    // 執行函式
    getAllTriviaAsync()
  }, []); // 注意，這裡的空陣列意味著 useEffect 只在組件掛載和卸載時運行。



  return (
    <div className="mt-24">

      {/* 測試用 */}
      <div className="border-t-r">
        {allTrivia &&
          allTrivia.map((trivia) => {
            const { id, title, triviaContent } = trivia
            return (
              <TriviaItem
                key={id}
                title={title}
                triviaContent={triviaContent}
              />
            );
          })
        }

      </div>

      <TriviaItem />
      <TriviaItem />
      <TriviaItem />
    </div>
  )
}