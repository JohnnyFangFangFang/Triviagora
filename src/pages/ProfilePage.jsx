import { NavbarContainer } from '@/components/other';
import { Profile } from '@/components/profile'

export default function ProfilePage() {
  console.log("畫面重新渲染")
  return (
    <NavbarContainer currentPage="Profile & Settings">
      <div className='relative'>
        <Profile />
      </div>
    </NavbarContainer>
  )
}