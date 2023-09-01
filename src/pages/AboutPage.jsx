import { NavbarContainer, About } from '@/components/other';

export default function HomePage() {
  console.log("畫面重新渲染")
  return (
    <NavbarContainer currentPage="About">
      <div className="relative w-screen h-screen">
        <About />
      </div>
    </NavbarContainer>
  )
}