import { HomePageContainer } from '@/components/other';

export default function HomePage() {
  console.log("畫面重新渲染")
  return (
    <HomePageContainer currentPage={'HomePage'}>
      <div className="relative pt-24 pb-12">
        <p>This is Homepage</p>
      </div>
    </HomePageContainer>
  )
}