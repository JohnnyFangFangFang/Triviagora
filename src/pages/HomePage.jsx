
// 記得做分頁功能或無限捲軸

import NavbarContainer from '@/components/NavbarContainer';
import TriviaCollection from "@/components/TriviaCollection";

export default function HomePage() {
  return (
    <NavbarContainer currentPage="HomePage">
      <div className="relative">
        <TriviaCollection />
      </div>
    </NavbarContainer>

  )
}