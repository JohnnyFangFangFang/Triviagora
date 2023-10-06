/* eslint-disable react/no-unescaped-entities */
// 使用的 UI 元件：https://tailwindcomponents.com/component/profile-bio

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

      {/* 第三段，推薦卡片 */}
      <div className='relative font-mono mt-32 text-center p-6'>
        <div className='font-mono mb-32 text-lg sm:text-3xl text-center'>Let's see what users are saying!</div>

        {/* 卡片區 */}
        <div className='lg:flex justify-around'>
          {/* 卡片 1 */}
          <div className="flex lg:w-[30%] items-center justify-center">
            <div className="relative w-full group max-w-md min-w-0 mx-auto mt-6 mb-6 break-words bg-amber-100 border shadow-2xl md:max-w-sm rounded-xl">
              <div className="pb-6">
                {/* 頭像 */}
                <div className="flex flex-wrap justify-center">
                  <div className="flex justify-center w-full">
                    <div className="relative flex justify-center">
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/triviagora.appspot.com/o/user-photos%2F99F0TJi9lVY9n0mclLdsXCJURwC2?alt=media&token=06c7f4d1-8e45-444f-8995-fd48cb484c0d"
                        className="shadow-xl border-gray-800 rounded-full align-middle border-4 absolute -m-16 max-w-[150px]" />
                    </div>
                  </div>
                </div>
                <div className="mt-28 text-center">
                  <h3 className="mb-1 text-2xl font-bold leading-normal text-gray-700">Richie</h3>
                </div>
                <div className="pt-6 mx-6 mt-6 text-center border-t border-gray-200 dark:border-gray-700/50">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full">
                      <p className="mb-4 font-light leading-relaxed text-gray-600">
                        "So much fun to share my trivia online and to interact with people who have similar interests! I can't find any other place where I can do the same thing!"
                      </p>
                    </div>
                  </div>
                </div>
                <div className="relative h-6 overflow-hidden translate-y-6 rounded-b-xl">
                  <div className="absolute flex -space-x-12 rounded-b-2xl">
                    <div className="w-36 h-8 transition-colors duration-200 delay-75 transform skew-x-[35deg] bg-amber-400/90 group-hover:bg-amber-600/90 z-10" />
                    <div className="w-28 h-8 transition-colors duration-200 delay-100 transform skew-x-[35deg] bg-amber-300/90 group-hover:bg-amber-500/90 z-20" />
                    <div className="w-28 h-8 transition-colors duration-200 delay-150 transform skew-x-[35deg] bg-amber-200/90 group-hover:bg-amber-400/90 z-30" />
                    <div className="w-28 h-8 transition-colors duration-200 delay-200 transform skew-x-[35deg] bg-amber-100/90 group-hover:bg-amber-300/90 z-40" />
                    <div className="w-28 h-8 transition-colors duration-200 delay-300 transform skew-x-[35deg] bg-amber-50/90 group-hover:bg-amber-200/90 z-50" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 卡片 2 */}
          <div className="flex mt-16 lg:mt-0 lg:w-[30%] items-center justify-center">
            <div className="relative w-full group max-w-md min-w-0 mx-auto mt-6 mb-6 break-words bg-amber-100 border shadow-2xl md:max-w-sm rounded-xl">
              <div className="pb-6">
                {/* 頭像 */}
                <div className="flex flex-wrap justify-center">
                  <div className="flex justify-center w-full">
                    <div className="relative flex justify-center">
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/triviagora.appspot.com/o/user-photos%2Fx52Emlg5u0aZ4QcYbQmPY1rJ9s33?alt=media&token=35eacecd-64f7-4182-8def-847b14d8e3d3"
                        className="shadow-xl border-gray-800 rounded-full align-middle border-4 absolute -m-16 max-w-[150px]" />
                    </div>
                  </div>
                </div>
                <div className="mt-28 text-center">
                  <h3 className="mb-1 text-2xl font-bold leading-normal text-gray-700">Johnny</h3>
                </div>
                <div className="pt-6 mx-6 mt-6 text-center border-t border-gray-200 dark:border-gray-700/50">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full">
                      <p className="mb-4 font-light leading-relaxed text-gray-600">
                        "This is certainly the best trivia-sharing website on this planet, even the entire galaxy. Why? Because I made it, ROFL. Just give it a try and tell me what you think :)"
                      </p>
                    </div>
                  </div>
                </div>
                <div className="relative h-6 overflow-hidden translate-y-6 rounded-b-xl">
                  <div className="absolute flex -space-x-12 rounded-b-2xl">
                    <div className="w-36 h-8 transition-colors duration-200 delay-75 transform skew-x-[35deg] bg-amber-400/90 group-hover:bg-amber-600/90 z-10" />
                    <div className="w-28 h-8 transition-colors duration-200 delay-100 transform skew-x-[35deg] bg-amber-300/90 group-hover:bg-amber-500/90 z-20" />
                    <div className="w-28 h-8 transition-colors duration-200 delay-150 transform skew-x-[35deg] bg-amber-200/90 group-hover:bg-amber-400/90 z-30" />
                    <div className="w-28 h-8 transition-colors duration-200 delay-200 transform skew-x-[35deg] bg-amber-100/90 group-hover:bg-amber-300/90 z-40" />
                    <div className="w-28 h-8 transition-colors duration-200 delay-300 transform skew-x-[35deg] bg-amber-50/90 group-hover:bg-amber-200/90 z-50" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 卡片 3 */}
          <div className="flex mt-16 lg:mt-0 lg:w-[30%] items-center justify-center">
            <div className="relative w-full group max-w-md min-w-0 mx-auto mt-6 mb-6 break-words bg-amber-100 border shadow-2xl md:max-w-sm rounded-xl">
              <div className="pb-6">
                {/* 頭像 */}
                <div className="flex flex-wrap justify-center">
                  <div className="flex justify-center w-full">
                    <div className="relative flex justify-center">
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/triviagora.appspot.com/o/user-photos%2F0mZZIiJjK8M3M5YcEbLJgelM65Z2?alt=media&token=b1465755-2367-49be-a3f5-8379aeb391d2"
                        className="shadow-xl border-gray-800 rounded-full align-middle border-4 absolute -m-16 max-w-[150px]" />
                    </div>
                  </div>
                </div>
                <div className="mt-28 text-center">
                  <h3 className="mb-1 text-2xl font-bold leading-normal text-gray-700">Adelina</h3>
                </div>
                <div className="pt-6 mx-6 mt-6 text-center border-t border-gray-200 dark:border-gray-700/50">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full">
                      <p className="mb-4 font-light leading-relaxed text-gray-600">
                        "It's quite fascinating to discover a wealth of trivia shared by others on this platform. I've gained tremendous inspiration from the diverse perspectives of people."
                      </p>
                    </div>
                  </div>
                </div>
                <div className="relative h-6 overflow-hidden translate-y-6 rounded-b-xl">
                  <div className="absolute flex -space-x-12 rounded-b-2xl">
                    <div className="w-36 h-8 transition-colors duration-200 delay-75 transform skew-x-[35deg] bg-amber-400/90 group-hover:bg-amber-600/90 z-10" />
                    <div className="w-28 h-8 transition-colors duration-200 delay-100 transform skew-x-[35deg] bg-amber-300/90 group-hover:bg-amber-500/90 z-20" />
                    <div className="w-28 h-8 transition-colors duration-200 delay-150 transform skew-x-[35deg] bg-amber-200/90 group-hover:bg-amber-400/90 z-30" />
                    <div className="w-28 h-8 transition-colors duration-200 delay-200 transform skew-x-[35deg] bg-amber-100/90 group-hover:bg-amber-300/90 z-40" />
                    <div className="w-28 h-8 transition-colors duration-200 delay-300 transform skew-x-[35deg] bg-amber-50/90 group-hover:bg-amber-200/90 z-50" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 第四段，註冊或登入 */}
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