// import logo from '../../assets/images/instagram-logo.png'

import { useRouter } from "next/router";

const Logo = () => {
  const router = useRouter();

  return (
    <div className='w-24 cursor-pointer' onClick={() => {
      router.push(`${`/`}`);
    }}>
      <img src={''} alt="Birevo" />
    </div>
  )
}

export default Logo
