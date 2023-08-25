/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/utils/firebase"
import NavbarContainer from '@/components/NavbarContainer';
import { TriviaItemForPage } from '@/components/TriviaItemForPage';

export default function TriviaItemPage() {
  console.log("看到這個代表畫面重新渲染一次")
  const triviaId = useParams().id; // 從 URL 中取得文章 ID

  const [isLoading, setIsLoading] = useState(true);
  const [trivia, setTrivia] = useState({});

  const triviaRef = doc(db, "trivia", triviaId);

  // 從 Firebase 拿該筆 trivia 資料
  useEffect(() => {
    const getTriviaItemAsync = async () => {
      setIsLoading(true);
      // const querySnapshot = await getDocs(collection(db, "trivia"));
      const docSnap = await getDoc(triviaRef);
      // 將擷取到的資料整理好存放到 state 裡
      setTrivia(docSnap.data());
      setIsLoading(false);
    }
    // 執行函式
    getTriviaItemAsync()
  }, []); // 注意，這裡的空陣列意味著 useEffect 只在組件掛載和卸載時運行。

  if (isLoading) return <div className="mt-24">Loading...</div>;

  return (
    <NavbarContainer currentPage="TriviaItem">
      <TriviaItemForPage
        {...trivia}
        triviaId={triviaId}
      />
    </NavbarContainer>
  );
}