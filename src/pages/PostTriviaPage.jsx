import { PostTrivia } from "@/components/trivia";
import { NavbarContainer } from '@/components/other';

export default function PostTriviaPage() {

  return (
    <NavbarContainer currentPage="PostTrivia">
      <PostTrivia />
    </NavbarContainer>
  )
}