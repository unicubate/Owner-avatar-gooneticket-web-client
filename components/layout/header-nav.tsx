import Head from 'next/head'
import Navbar from '../navbar'

const HeaderNav = () => {
  return (
    <>
     

    <header className="bg-white border-[1px] border-gray-300 sticky top-0 z-20">
      <div className="max-w-5xl mx-auto">
        <Navbar />
      </div>
    </header>
    </>
  )
}

export default HeaderNav
