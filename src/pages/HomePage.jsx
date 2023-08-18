
// 記得做分頁功能或無限捲軸

import NavbarContainer from '@/components/NavbarContainer';
import TriviaCollection from "@/components/TriviaCollection";
import LogoutBtn from "@/components/LogoutBtn";

export default function HomePage() {
  return (
    <NavbarContainer currentPage="HomePage">
      <div className="relative">
        <TriviaCollection />
        <LogoutBtn otherClass="fixed bottom-4 left-4" />
      </div>
    </NavbarContainer>

  )
}