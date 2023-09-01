import { NavbarContainer, News } from '@/components/other';

export default function NewsPage() {
  console.log("畫面重新渲染")
  return (
    <NavbarContainer currentPage="News">
      <div className="py-16 px-12">
        <News />
      </div>
    </NavbarContainer>
  )
}