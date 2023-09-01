import { HomePageContainer } from '@/components/other';
import { HomePageContent } from '@/components/other';

export default function HomePage() {
  console.log("畫面重新渲染")
  return (
    <HomePageContainer currentPage={'HomePage'}>
      <div className="relative pt-24 pb-12">
        <HomePageContent />
      </div>
    </HomePageContainer>
  )
}