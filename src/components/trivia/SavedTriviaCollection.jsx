/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { collection, query, orderBy, onSnapshot, doc, getDoc } from "firebase/firestore";
import { db } from "@/utils/firebase"
import TriviaItemForProfile from './TriviaItemForProfile';

export default function SavedTriviaCollection({ userId }) {
  const [isLoading, setIsLoading] = useState(true);
  const [savedTriviaId, setSavedTriviaId] = useState([]);
  const [allTrivia, setAllTrivia] = useState([]);

  // 另外從資料庫拿使用者儲存的文章 ID
  async function getUserSavedTriviaId() {
    if (userId !== '') {
      const docRef = doc(db, "users", userId); // 創建一個文件參考
      const docSnapshot = await getDoc(docRef); // 獲取文件快照

      if (docSnapshot.exists()) { // 檢查文件是否存在
        const data = docSnapshot.data(); // 獲取文件的全部資料
        const savedTriviaId = data?.savedTriviaId; // 獲取 savedTriviaId 陣列
        if (savedTriviaId) {
          setSavedTriviaId(savedTriviaId); // 更新 state
        } else {
          setSavedTriviaId(null)
        }
      } else {
        console.log("No such document!"); // 如果文件不存在，則輸出錯誤訊息
      }
    }
  }

  // 先拿使用者儲存的文章 ID，才不會因為 savedTriviaId 而產生無窮迴圈
  useEffect(() => {
    getUserSavedTriviaId();
  }, []); // 僅在組件掛載時運行

  // 將符合條件的文章存到 state
  useEffect(() => {
    // 取得 trivia 集合參考，讓電腦知道位置在哪
    const triviaCollectionRef = collection(db, "trivia");
    // 建立查詢條件，意思是查詢該集合所有項目，並按照創建時間降冪排列
    const triviaQuery = query(triviaCollectionRef, orderBy("createdAt", "desc"));
    // 若有收藏文章
    if (savedTriviaId) {
      // 使用 onSnapshot 監聽資料變化
      const unsubscribe = onSnapshot(triviaQuery, (querySnapshot) => {
        setIsLoading(true);
        // 使用 filter 和 map 來清除 undefined 值
        const allTrivia = querySnapshot.docs
          .filter((doc) => savedTriviaId.includes(doc.id))
          .map((doc) => {
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
    }
  }, [savedTriviaId]);


  // 如果還在 loading 那就顯示 Loading 字樣，loading 結束再渲染真正內容
  if (isLoading) return <div className="mt-24">Loading...</div>;

  return (
    <div className="">
      <div className="">
        {allTrivia.length !== 0 ?
          (allTrivia.map((trivia) => {
            return (
              <TriviaItemForProfile key={trivia.id} {...trivia} />
            )
          })) : <div className='text-center'>Have not saved any trivia.</div>
        }
      </div>
    </div>
  )
}