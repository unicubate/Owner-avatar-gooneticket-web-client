import Head from 'next/head'
import Navbar from '../navbar'
import { useAuth } from '../util/session/context-user';

const HeaderNav = () => {
  const user = useAuth() as any;

  return (
    <>
     
    <header className="bg-white border-[1px] border-gray-300 sticky top-0 z-20">
      <div className="max-w-5xl mx-auto">
        <Navbar user={user} />
      </div>
    </header>
    </>
  )
}

export default HeaderNav
