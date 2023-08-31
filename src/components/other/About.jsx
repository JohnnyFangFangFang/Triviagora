/* eslint-disable react/no-unescaped-entities */
import triviagora_logo_blue from "@/assets/triviagora_logo_blue.png"
import login_bg from "@/assets/login_bg.jpg"
import { FcQuestions } from "react-icons/fc";

export default function About() {
  return (
    <div className="relative w-full h-full">

      {/* 背景圖 */}
      <div
        className="w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${login_bg})` }}
      ></div>

      {/* 讓背景圖有透明效果 */}
      <div className='absolute top-0 h-full w-full bg-gray-300/[0.7]'></div>

      {/* 資訊框外層 container */}
      <div className="absolute top-[16%] sm:left-[16%] h-2/3 sm:w-2/3 bg-gray-100/50 backdrop-blur-sm text-gray-500 rounded-3xl shadow-xl overflow-y-scroll overscroll-contain z-10"
      >
        {/* 資訊框 */}
        <div className="w-full py-10 px-5 md:px-10">
          {/* 放 logo 與 slogan */}
          <div className='flex justify-center items-center'>
            <img src={triviagora_logo_blue} alt="logo" className="min-w-[50px] max-w-[100px]" />
            <div className='pl-3'>
              <p className='sm:text-2xl'>Triviagora</p>
              <p className='text-sm sm:text-lg md:text-xl lg:text-2xl'>where trivia gather</p>
            </div>
          </div>
          {/* 放說明 */}
          <div className="sm:text-xl">
            {/* 標題 */}
            <div className="flex items-center mt-10">
              <FcQuestions className="text-6xl" />
              <span className="font-bold">Why is it called Triviagora?</span>
            </div>
            {/* 說明 */}
            <div className="flex flex-col gap-3 mt-3 ml-2">
              <p className="font-bold">Trivia</p>
              <p>According to Cambridge Dictionary and Oxford Dictionary, trivia (actually, this noun is plural) are details or information that are not important. Another common meaning refers to interesting facts of which probably only a few of people are aware.</p>
              <p className="font-bold">Agora</p>
              <p>Based on Wikipedia, the agora was a central public space in ancient Greek city-states. The literal meaning of the word "agora" is "gathering place" or "assembly". The agora was the center of the athletic, artistic, business, social, spiritual, and political life in the city.</p>
              <p className="font-bold">Trivia + Agora</p>
              <p>The name was thus invented by me. Triviagora is a website regarded as an agora where trivia gather. Here you can share any trivia you like and broaden horizon via others' trivia. The word can be pronounced as [trɪvɪɑ`gorɑ], I invented it as well ;) </p>
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}