/* eslint-disable react/prop-types */
// 使用的 UI 元件：https://tailwindcomponents.com/component/user-post-card
// UI 元件備案：https://tailwindcomponents.com/component/maede
// import ReactTimeAgo from 'react-time-ago'

export default function TriviaCommentItem() {
  // { title, triviaContent, createdAt }

  return (
    <div className="flex items-center justify-center min-h-max my-4">
      {/* comment 卡片 */}
      <div
        className="w-full rounded-xl border p-5 shadow-md bg-slate-50"
      >
        <div className="flex w-full items-center justify-between border-b pb-3">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-full bg-slate-400 bg-[url('https://i.pravatar.cc/32')]" />
            <div className="text-lg font-bold text-slate-700">Joe Smith</div>
          </div>
          <div className="flex items-center space-x-8">
            <div className="text-xs text-neutral-500">
              {/* <ReactTimeAgo date={createdAt?.toDate()} locale="en-US" timeStyle="twitter" /> */}
            </div>
          </div>
        </div>
        <div className="mt-4">
          {/* 內文 */}
          <div className="text-sm text-neutral-600">內容</div>
        </div>
      </div>
    </div>
  )
}