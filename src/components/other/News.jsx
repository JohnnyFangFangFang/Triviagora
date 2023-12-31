import NewsItem from './NewsItem'

export default function News() {


  return (

    <div>

      {/* 本頁面大標題 */}
      <div className="text-3xl font-bold text-center">News</div>

      {/* 卡片區 */}
      <div className="min-h-max">
        <NewsItem
          title={'Thanks for recommendation!'}
          tag={'News'}
          date={'07 Oct 2023'}
          content={'We got recommendation from our dear users, Richie and Adelina. We really appreciate those inspiring thoughts on this platform and thus put them on the homepage for more people to know this incredible trivia-sharing website. Can\'t wait to see more feedbacks!'}
        />
        <NewsItem
          title={'Debut!'}
          tag={'Update'}
          date={'31 Aug 2023'}
          content={'This is the first release of Triviagora! As we can see, it is a beta version. In the future, more features will be added. Tons of ideas have been put in the "bucket list" of this project, and I\'ll try my best to work on it :)'}
        />
      </div>

    </div >
  )
}