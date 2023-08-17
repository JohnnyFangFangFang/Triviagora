import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage, RegisterPage, LoginPage, ProfilePage } from './pages'

function App() {
  const basename = import.meta.env.PUBLIC_URL
  return (
    <>
      <BrowserRouter basename={basename}>
        <Routes>
          <Route path="*" element={<HomePage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
