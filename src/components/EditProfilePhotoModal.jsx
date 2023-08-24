/* eslint-disable react/prop-types */
// 使用的 UI 元件：https://tailwindcomponents.com/component/tailwind-css-modal

import { useState } from 'react';
// import { collection, addDoc, Timestamp } from "firebase/firestore";
// import { db } from "@/utils/firebase"
import { getAuth, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function EditProfilePhotoModal({ userId, isPhotoChanged, setIsPhotoChanged }) {
  const [showModal, setShowModal] = useState(false);
  const [imageFile, setImageFile] = useState(null)
  const [imageTempUrl, setImageTempUrl] = useState('');

  // 暫存圖片 => 拿到暫時的 url => 立即顯示在畫面
  function handleImageFileChange(e) {
    const file = e.target.files[0];
    setImageFile(file);
    const url = URL.createObjectURL(file);
    setImageTempUrl(url); // 暫存 URL 到 state
  }

  // 指引到檔案庫，方便待會串資料
  const storage = getStorage();

  // 大頭照編輯完成後送出
  function handleDoneClick() {
    try {
      // 圖片檔附加資訊，例如檔名、大小和內容類型等
      // 若 imageFile 存在則 contentType 為 imageFile.type
      const metadata = {
        contentType: imageFile?.type,
      };
      // 告訴電腦我們是要指向 storage 裡的哪個檔
      const fileRef = ref(storage, 'user-photos/' + userId);

      // 上傳圖片 => 拿到圖片 url => 更新文章填入內容
      if (imageFile) {
        uploadBytes(fileRef, imageFile, metadata).then(() => {
          getDownloadURL(fileRef).then((imageUrl) => {
            const auth = getAuth();

            updateProfile(auth.currentUser, {
              photoURL: imageUrl,
            }).then(() => {
              console.log("Photo updated!")
              // 更改父層元件資訊並重新渲染頁面以顯示最新資訊
              setIsPhotoChanged(!isPhotoChanged)
              toggleModal()
            }).catch((error) => {
              console.log(error)
            });
          })
        });
      } else {
        confirm('Please check if you upload the photo successfully.')
      }
    }
    catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  // 控制彈跳視窗
  const toggleModal = () => {
    setShowModal(!showModal);
  };


  return (
    <div className="max-w-2xl mx-auto">
      {/* Modal toggle */}
      <button
        className="block absolute bottom-0 right-0 rounded-lg p-2 text-xs bg-gray-200 hover:bg-gray-600 hover:text-white focus:ring-4 focus:ring-orange-300 "
        type="button"
        onClick={toggleModal}
      >
        Edit Photo
      </button>

      {/* Main modal */}
      {showModal && (
        <div aria-hidden="true" className="fixed inset-0 z-50 overflow-y-auto flex justify-center items-center">
          <div className="relative w-full max-w-xl px-4 h-full md:h-auto">
            {/* Modal content */}
            <div className="bg-gray-700 p-6 rounded-lg shadow relative">

              {/* Modal header */}
              <div className="flex items-start justify-between p-5 border-b rounded-t border-gray-600">
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
              <div className="flex my-6 p-6 bg-white rounded-lg">
                {/* 左側預覽圖 */}
                <div className="w-2/3 flex justify-center">
                  <img src={imageTempUrl || "https://picsum.photos/500"} alt="user photo" className="object-cover h-full rounded-full shadow-lg" />
                </div>
                {/* 上傳卡片樣式 */}
                <div className="p-4 w-1/3 rounded-lg">
                  <div className="flex-col justify-items-center mt-12 bg-white p-5 border-4 border-dotted border-gray-300 rounded-lg">
                    {/* 上傳圖示 */}
                    <div className='flex justify-center'>
                      <svg
                        className="text-indigo-500 w-24 mx-auto mb-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                    </div>
                    {/* select 按鈕 */}
                    <div className="input_field flex flex-col w-max mx-auto text-center">
                      <label>
                        <input
                          className="text-sm cursor-pointer w-36 hidden"
                          type="file"
                          multiple=""
                          onChange={handleImageFileChange}
                        />
                        <div className="text bg-indigo-600 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-indigo-500">
                          Select
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal footer */}
              <div className="flex space-x-2 items-center p-6 border-t border-gray-600 rounded-b">
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