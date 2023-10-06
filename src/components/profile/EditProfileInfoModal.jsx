/* eslint-disable react/prop-types */
// 使用的 UI 元件：https://tailwindcomponents.com/component/tailwind-css-modal

import { useState } from 'react';
import { getAuth, updateProfile, updateEmail, updatePassword } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/utils/firebase"

export default function EditProfileInfoModal({ userId, editContent, setDisplayName, setEmail, setIntroduction }) {
  const [showModal, setShowModal] = useState(false);
  const [profileInfo, setProfileInfo] = useState('');

  // 控制彈跳視窗
  function toggleModal() {
    setShowModal(!showModal);
  }

  async function updateIntroduction() {
    // 更新資料庫裡的自介
    // 先提供使用者資料指引，方便後面資料操作
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      introduction: profileInfo
    });
    setIntroduction(profileInfo)
    alert('Introduction updated!')
    toggleModal()
  }

  // 資料編輯完成後送出
  function handleDoneClick() {
    const auth = getAuth();
    // 先提供使用者資料指引，方便後面資料操作
    const userRef = doc(db, "users", userId);


    // 先加個條件式判斷使用者是否輸入東西，若沒輸入就想送出則跳提醒
    if (profileInfo === '') {
      alert('You did not edit anything, please check again.')
    } else {
      // 若確定有輸入資料則馬上進行至尊對決，啊不是，是根據情境進行不同動作
      switch (editContent) {
        // 更改使用者名稱
        case 'displayName':
          updateProfile(auth.currentUser, {
            displayName: profileInfo,
          }).then(async () => {
            // 更新資料庫裡的 displayName
            await updateDoc(userRef, {
              displayName: profileInfo
            });
            // 更改父層元件資訊並重新渲染頁面以顯示最新資訊
            setDisplayName(profileInfo)
            alert("displayName updated!")
            toggleModal()
          }).catch((error) => {
            console.log(error)
          });
          break;
        // 更改 email
        case 'email':
          updateEmail(auth.currentUser, profileInfo).then(() => {
            // 更改父層元件資訊並重新渲染頁面以顯示最新資訊
            alert("email updated!")
            setEmail(profileInfo)
            toggleModal()
          }).catch((error) => {
            console.log(error)
          });
          break;
        // 更改密碼
        case 'password':
          updatePassword(auth.currentUser, profileInfo).then(() => {
            alert("password updated!")
            // 不用更改父層元件因為密碼不會顯示
            toggleModal()
          }).catch((error) => {
            alert(error.message)
          });
          break;
        // 更改自介
        case 'introduction':
          updateIntroduction()
          break;
        default:
          console.log(`Sorry, we are out of ${editContent}.`);
      }
    }
  }

  return (
    <div className="max-w-2xl ml-4">
      {/* Modal toggle */}
      <button
        className="block rounded-lg p-2 bg-gray-200 hover:bg-gray-600 hover:text-white focus:ring-4 focus:ring-orange-300"
        type="button"
        onClick={toggleModal}
      >
        Edit
      </button>

      {/* Main modal */}
      {showModal && (
        <div aria-hidden="true" className="fixed inset-0 z-50 overflow-y-auto flex justify-center items-center">
          <div className="relative w-full max-w-xl px-4 h-full md:h-auto">
            {/* Modal content */}
            <div className="bg-white rounded-lg shadow relative dark:bg-gray-700">

              {/* Modal header */}
              <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-gray-900 text-xl lg:text-2xl font-semibold dark:text-white">
                  Edit
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={toggleModal}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              {/* Modal body */}
              <div className="p-6 space-y-6">
                {/* 內文 */}
                <textarea
                  className="description w-full rounded-lg bg-gray-100 p-3 h-12 border border-gray-300 outline-none"
                  spellCheck="false"
                  placeholder="Edit here!"
                  defaultValue={""}
                  onChange={e => setProfileInfo(e.target.value)}
                />
              </div>

              {/* Modal footer */}
              <div className="flex space-x-2 items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-600">
                {/* 送出鈕 */}
                <button
                  onClick={handleDoneClick}
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Done
                </button>
                {/* 取消鈕 */}
                <button
                  onClick={toggleModal}
                  type="button"
                  className="text-gray-300 bg-gray-700 hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-500 text-sm font-medium px-5 py-2.5 hover:text-white focus:z-10"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}