// 後來把登出鈕做在 NavbarContainer，似乎不會再需要獨立元件，先留著
/* eslint-disable react/prop-types */
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

export default function LogoutBtn({ otherClass }) {
  const navigate = useNavigate()
  // 內部固定樣式
  const baseClass = "w-20 h-10 rounded-full bg-red-400";
  // 合併外部傳入的 className
  const combinedClass = `${baseClass} ${otherClass}`;

  function handleLogoutClick() {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
      // 若使用者登出則導回登入頁面
      console.log("成功登出")
      navigate('/login');
    }).catch((error) => {
      // An error happened.
      console.log("error: ", error)
    });
  }

  return (
    <button
      className={combinedClass}
      onClick={handleLogoutClick}
    >Log Out</button>
  )
}