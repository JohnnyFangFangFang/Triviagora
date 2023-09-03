import { NavbarContainer, Credit } from '@/components/other';

export default function CreditPage() {
  console.log("畫面重新渲染")
  return (
    <NavbarContainer currentPage="Credit">
      <div className="py-16 px-12">
        <Credit />
      </div>
    </NavbarContainer>
  )
}