import NavbarContainer from '@/components/NavbarContainer';
import Profile from '@/components/Profile.jsx'

const ProfilePage = () => {

  return (
    <NavbarContainer currentPage="Profile">
      <Profile />
    </NavbarContainer>
  )
};

export default ProfilePage;