

export default function Credit() {
  return (

    <div>

      {/* 本頁面大標題 */}
      <div className="text-3xl font-bold text-center">Credit</div>
      <div className="mt-6 text-xl font-bold text-center">Here are some resources I used in this website, recommend!</div>

      {/* credit 區 */}
      <div className="flex flex-col gap-10 min-h-max mt-16">
        <div className="sm:flex items-center">
          <a href="https://tailwindcomponents.com/" target="_blank" rel="noopener noreferrer" className="underline bg-slate-300 hover:bg-water-blue hover:text-yellow-300 rounded-xl p-3 font-bold">
            Tailwind CSS Components
          </a>
          <p className="mt-6 sm:mt-0">=> Here are well-designed Tailwind components, check it out.</p>
        </div>
        <div className="sm:flex items-center">
          <a href="https://undraw.co/" target="_blank" rel="noopener noreferrer" className="underline bg-slate-300 hover:bg-water-blue hover:text-yellow-300 rounded-xl p-3 font-bold">
            unDraw
          </a>
          <p className="mt-6 sm:mt-0">=> A lot of beautiful illustrations, very useful.</p>
        </div>
        <div className="sm:flex items-center">
          <a href="https://react-icons.github.io/react-icons/" target="_blank" rel="noopener noreferrer" className="underline bg-slate-300 hover:bg-water-blue hover:text-yellow-300 rounded-xl p-3 font-bold">
            React Icons
          </a>
          <p className="mt-6 sm:mt-0">=> Componentized icons, ready to use.</p>
        </div>
        <div className="sm:flex items-center">
          <a href="https://fineartamerica.com/" target="_blank" rel="noopener noreferrer" className="underline bg-slate-300 hover:bg-water-blue hover:text-yellow-300 rounded-xl p-3 font-bold">
            Fine Art America
          </a>
          <p className="mt-6 sm:mt-0">=> This is where I found the background image of login page and about page :)</p>
        </div>
      </div>

    </div >
  )
}