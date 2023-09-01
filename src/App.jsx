import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage, RegisterPage, LoginPage, ProfilePage, PostTriviaPage, TriviaItemPage, ProfilePageOtherUser, AboutPage, NewsPage } from './pages'

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
          <Route path="posttrivia" element={<PostTriviaPage />} />
          <Route path="trivia/:id" element={<TriviaItemPage />} />
          <Route path="profile/:id" element={<ProfilePageOtherUser />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="news" element={<NewsPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
