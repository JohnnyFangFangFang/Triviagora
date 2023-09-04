/* eslint-disable react/no-unescaped-entities */
import { useNavigate } from 'react-router-dom'
import homepage_thoughts from '@/assets/homepage_thoughts.svg'
import homepage_teamup from '@/assets/homepage_teamup.svg'
import homepage_register from '@/assets/homepage_register.svg'
import homepage_login from '@/assets/homepage_login.svg'
import { TfiWrite } from "react-icons/tfi";
import { BiLogIn } from "react-icons/bi";

export default function HomePageContent() {
  const navigate = useNavigate()

  return (
    <div className='relative'>

      {/* 第一段，問句開頭 */}
      <div className='relative font-mono text-xl sm:text-3xl'>
        <img src={homepage_thoughts} alt="thoughts" />
        <p className='absolute top-0 sm:top-[5rem] sm:right-[5rem] drop-shadow-md'>A fan of trivia?</p>
        <p className='absolute top-10 sm:top-[13rem] sm:right-[15rem] drop-shadow-md'>Wanna know some fun facts?</p>
        <p className='absolute top-28 sm:top-[21rem] sm:right-[5rem] drop-shadow-md animate-bounce'>Have tons of trivia to share?</p>
      </div>

      {/* 第二段，分享 */}
      <div className='relative font-mono mt-32 text-lg md:text-2xl lg:text-3xl'>
        <img src={homepage_teamup} alt="teamup" className='relative left-[10%]' />
        <div className='absolute top-16 sm:left-[30%] sm:w-1/2 h-2/3 bg-slate-600 bg-opacity-50 rounded-2xl text-white font-bold p-3 sm:p-20 transition duration-700 ease-in-out hover:scale-110'>
          Here, you can find trivia and post yours as well. To be connected with the world via trivia!
        </div>
      </div>

      {/* 第三段，註冊或登入 */}
      <div className='relative font-mono mt-32 text-lg sm:text-3xl text-center'>

        {/* 標題與插圖 */}
        <div className=''>Have an account? Login and enjoy!</div>
        <div className='pt-3 pb-20'>No account? Let's get one!</div>
        <div className='flex px-10'>
          <img src={homepage_register} alt="teamup" className='w-1/2' />
          <img src={homepage_login} alt="teamup" className='w-1/2 mt-[73px]' />
        </div>

        {/* 連結們 */}
        <div className='flex items-center justify-evenly absolute top-0 w-full pt-[8rem]'>
          {/* 註冊連結 */}
          <div
            className='flex items-center gap-2 text-water-blue hover:text-yellow-300 border-4 rounded-3xl p-2 cursor-pointer hover:bg-slate-400 animate-bounce'
            onClick={() => navigate('/register')}
          >
            <span>Register</span>
            <TfiWrite className='text-5xl' />
          </div>
          {/* 登入連結 */}
          <div
            className='flex items-center gap-2 text-water-blue hover:text-yellow-300 border-4 rounded-3xl px-2 cursor-pointer hover:bg-slate-400 animate-bounce'
            onClick={() => navigate('/login')}
          >
            <BiLogIn className='text-7xl' />
            <span>Login</span>
          </div>
        </div>

      </div>

    </div>
  )
}