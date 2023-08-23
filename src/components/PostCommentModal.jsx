/* eslint-disable react/prop-types */
// 使用的 UI 元件：https://tailwindcomponents.com/component/tailwind-css-modal

import { useState } from 'react';
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "@/utils/firebase"

export default function PostCommentModal({ triviaId }) {
  console.log("PostCommentModal 裡的 triviaId:", triviaId)
  const [showModal, setShowModal] = useState(false);
  const [comment, setComment] = useState('');

  // 控制彈跳視窗
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // 將留言送出到 Firebase
  async function handlePostClick() {
    // 到 db => trivia => 這篇 trivia => comments 子集合，再新增這筆 comment
    const commentRef = await addDoc(collection(db, "trivia", triviaId, "comments"), {
      comment,
      createdAt: Timestamp.now(),
    });
    console.log('成功留言，爽啦！該則留言 ID: ', commentRef.id);
    // 留言完把 modal 關掉
    toggleModal()
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Modal toggle */}
      <button
        className="block rounded-full p-2 bg-blue-200 hover:bg-slate-600 hover:text-white focus:ring-4 focus:ring-orange-300 "
        type="button"
        onClick={toggleModal}
      >
        Leave a comment
      </button>

      {/* Main modal */}
      {showModal && (
        <div aria-hidden="true" className="fixed inset-0 z-50 overflow-y-auto flex justify-center items-center">
          <div className="relative w-full max-w-2xl px-4 h-full md:h-auto">
            {/* Modal content */}
            <div className="bg-white rounded-lg shadow relative dark:bg-gray-700">

              {/* Modal header */}
              <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-gray-900 text-xl lg:text-2xl font-semibold dark:text-white">
                  Post a comment!
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
                  className="description w-full rounded-lg bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none"
                  spellCheck="false"
                  placeholder="Share your comment here!"
                  defaultValue={""}
                  onChange={e => setComment(e.target.value)}
                />
              </div>

              {/* Modal footer */}
              <div className="flex space-x-2 items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-600">
                {/* 送出鈕 */}
                <button
                  onClick={handlePostClick}
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Post
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