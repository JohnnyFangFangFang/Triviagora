// 記得做分頁功能或無限捲軸

import { NavbarContainer } from '@/components/other';
import { TriviaCollection } from "@/components/trivia";

export default function AllTriviaPage() {
  console.log("畫面重新渲染")
  return (
    <NavbarContainer currentPage="All Trivia">
      <div className="relative pt-24 pb-12">
        <TriviaCollection page={'alltriviapage'} />
      </div>
    </NavbarContainer>
  )
}