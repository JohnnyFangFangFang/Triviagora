import { NavbarContainer } from '@/components/other';
import { Profile } from '@/components/profile'

export default function ProfilePage() {
  return (
    <NavbarContainer currentPage="Profile & Settings">
      <Profile />
    </NavbarContainer>
  )
}