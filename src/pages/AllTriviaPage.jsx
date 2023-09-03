/* eslint-disable react/no-unescaped-entities */
// 記得做分頁功能或無限捲軸

import { NavbarContainer } from '@/components/other';
import { TriviaCollection } from "@/components/trivia";
import alltriviapage_connected_world from '@/assets/alltriviapage_connected_world.svg'
import { TbArrowBigDownLinesFilled } from "react-icons/tb";


export default function AllTriviaPage() {
  console.log("畫面重新渲染")
  return (
    <NavbarContainer currentPage="All Trivia">
      <div className="relative pt-24 pb-12">
        {/* 上標題 */}
        <p className='text-center font-bold text-lg sm:text-2xl'>Here's where trivia gather.</p>
        {/* 插圖 */}
        <img src={alltriviapage_connected_world} alt="alltrivia page illustration image" className='hidden md:block h-screen max-w-[90%] opacity-25 mx-auto mt-[-8rem] mb-[-8rem] px-10 z-[-1]' />
        {/* 下標題 */}
        <div className='flex justify-center items-center'>
          <p className='text-center font-bold text-lg sm:text-2xl'>Let's check what we have here!</p>
        <TbArrowBigDownLinesFilled className='ml-3 text-3xl text-water-blue animate-bounce' />
        </div>
        {/* 渲染所有 trivia */}
        <TriviaCollection page={'alltriviapage'} />
      </div>
    </NavbarContainer>
  )
}