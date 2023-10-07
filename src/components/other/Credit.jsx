

export default function Credit() {
  return (

    <div>

      {/* 本頁面大標題 */}
      <div className="text-3xl font-bold text-center">Credit</div>
      <div className="mt-6 text-xl font-bold text-center">Here are some resources I used in this website, recommend!</div>

      {/* credit 區 */}
      <div className="flex flex-col items-center gap-10 min-h-max mt-16">
        {/* Tailwind CSS Components */}
        <div className="flex items-center w-4/5 max-w-[900px]">
          <a href="https://tailwindcomponents.com/" target="_blank" rel="noopener noreferrer" className="w-full bg-slate-300 hover:bg-water-blue hover:text-white rounded-xl p-3">
            <span className="text-lg font-bold">Tailwind CSS Components</span>
            <p>Here are well-designed Tailwind components, check it out.</p>
          </a>
        </div>
        {/* unDraw */}
        <div className="flex items-center w-4/5 max-w-[900px]">
          <a href="https://undraw.co/" target="_blank" rel="noopener noreferrer" className="w-full bg-slate-300 hover:bg-water-blue hover:text-white rounded-xl p-3">
            <span className="text-lg font-bold">unDraw</span>
            <p>A lot of beautiful illustrations, very useful.</p>
          </a>
        </div>
        {/* React Icons */}
        <div className="flex items-center w-4/5 max-w-[900px]">
          <a href="https://react-icons.github.io/react-icons/" target="_blank" rel="noopener noreferrer" className="w-full bg-slate-300 hover:bg-water-blue hover:text-white rounded-xl p-3">
            <span className="text-lg font-bold">React Icons</span>
            <p>Componentized icons, ready to use.</p>
          </a>
        </div>
        {/* Fine Art America */}
        <div className="flex items-center w-4/5 max-w-[900px]">
          <a href="https://fineartamerica.com/" target="_blank" rel="noopener noreferrer" className="w-full bg-slate-300 hover:bg-water-blue hover:text-white rounded-xl p-3">
            <span className="text-lg font-bold">Fine Art America</span>
            <p>This is where I found the background image of login page and about page :)</p>
          </a>
        </div>
      </div>

    </div >
  )
}