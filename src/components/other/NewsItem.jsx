/* eslint-disable react/prop-types */
import { useState } from 'react';
import { GiNewShoot } from "react-icons/gi";

export default function NewsItem({ title, tag, date, content }) {
  const [showModal, setShowModal] = useState(false);

  // 控制彈跳視窗
  function toggleModal() {
    setShowModal(!showModal);
  }

  return (
    <div className='flex justify-center my-4'>

      {/* 卡片 */}
      <div
        className="flex rounded-xl border p-5 shadow-md w-9/12 bg-white cursor-pointer hover:bg-slate-100"
        onClick={toggleModal}
      >
        {/* 左側 news 圖片區，高度為寬度 40% */}
        <div className="w-1/6 hidden sm:flex justify-center">
          <GiNewShoot className='text-8xl text-green-500' />
        </div>

        {/* 間隔區塊 */}
        <div className="w-[3%] lg:w-[6%]"></div>

        {/* 右側卡片資訊 */}
        <div className='w-full sm:w-3/4'>
          {/* 類別與發文時間 */}
          <div className="flex w-full items-center justify-between border-b pb-3">
            {/* 標題 */}
            <div className="text-xl font-bold">{title}</div>
            {/* 類別標籤與發文時間 */}
            <div className="flex items-center space-x-8">
              {/* 標籤 */}
              <button className="rounded-2xl border bg-neutral-100 px-3 py-1 text-xs font-semibold">
                {tag}
              </button>
              {/* 時間 */}
              <div className="text-xs text-neutral-500">
                <span className='hidden sm:inline'>released at </span>
                {date}
              </div>
            </div>
          </div>
          {/* 內文，將字數限制在最多 2 行 */}
          <div className="mt-4 mb-6">
            <div className="text-sm text-neutral-600 line-clamp-[1] sm:line-clamp-[2]">{content}</div>
          </div>
        </div>
      </div>

      {/* 卡片細節 Modal */}
      {showModal && (
        <div className="fixed left-[8%] sm:left-1/4 top-[8%] w-5/6 sm:w-1/2 h-5/6 inset-0 z-50 outline-none focus:outline-none">
          {/* 透明效果層 */}
          <div className="absolute bg-gray-500 opacity-80 inset-0 z-0 rounded-xl" />

          {/* 主要內容 */}
          <div className="w-11/12 sm:w-5/6 h-5/6 p-0 relative mx-auto my-3 rounded-xl shadow-lg bg-white z-10">
            {/*body*/}
            <div className="w-full h-full text-center justify-center">
              <h2 className="text-3xl text-black font-bold py-4 ">{title}</h2>
              <p className="h-[75%] text-sm sm:text-lg text-black px-8 overflow-y-auto">{content}</p>
            </div>
          </div>

          {/*footer*/}
          <div className="relative flex justify-center z-10">
            <button
              className="absolute my-3 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
              onClick={toggleModal}
            >
              Got it!
            </button>
          </div>

        </div>
      )}

    </div >
  )
}