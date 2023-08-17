// 記得做分頁功能或無限捲軸

import TriviaCollection from "@/components/TriviaCollection";
import LogoutBtn from "@/components/LogoutBtn";

export default function HomePage() {

  return (
    <div className="relative">
      <div className="text-2xl font-bold text-center">
        HomePage Triviagora 我在測試
      </div>

      <TriviaCollection />
      <LogoutBtn otherClass="fixed bottom-4 left-4" />
    </div>
  )
}