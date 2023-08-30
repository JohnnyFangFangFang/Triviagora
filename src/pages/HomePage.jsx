// 記得做分頁功能或無限捲軸

import { NavbarContainer } from '@/components/other';
import { TriviaCollection } from "@/components/trivia";

export default function HomePage() {
  return (
    <NavbarContainer currentPage="HomePage">
      <div className="relative pt-24 pb-12">
        <TriviaCollection page={'homepage'} />
      </div>
    </NavbarContainer>
  )
}