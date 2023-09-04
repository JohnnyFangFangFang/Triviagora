import { PostTrivia } from "@/components/trivia";
import { NavbarContainer } from '@/components/other';

export default function PostTriviaPage() {
  console.log("畫面重新渲染")
  return (
    <NavbarContainer currentPage="Post Trivia">
      <PostTrivia />
    </NavbarContainer>
  )
}