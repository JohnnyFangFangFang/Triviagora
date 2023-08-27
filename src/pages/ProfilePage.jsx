import NavbarContainer from '@/components/NavbarContainer';
import Profile from '@/components/Profile.jsx'

export default function ProfilePage() {

  return (
    <NavbarContainer currentPage="Profile & Settings">
      <Profile />
    </NavbarContainer>
  )
}