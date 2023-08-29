import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { db } from "@/utils/firebase"
import { doc, getDoc } from "firebase/firestore";
import { NavbarContainer } from '@/components/other';
import { ProfileOtherUser } from '@/components/profile';

export default function ProfilePageOtherUser() {
  console.log("看到這個代表畫面重新渲染一次")
  const authorUid = useParams().id; // 從 URL 中取得作者 UID

  const [isLoading, setIsLoading] = useState(true);
  const [author, setAuthor] = useState({});

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
    <NavbarContainer currentPage="Profile">
      <ProfileOtherUser {...author} />
    </NavbarContainer>
  )
}