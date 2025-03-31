
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = async ({isAdminPage=false}) => {
const isAdmin = false
  return (
    <header className='fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b'>
        <nav className="mx-auto px-4 py-4 flex items-center justify-between">
            <Link href={isAdminPage ? "/admin":'/'}>
                <Image src={"/projectimage.jpg"} alt="palm logo"
                width={200}
                height={60}
                className='h12 w-auto object-contain'/>
                {isAdminPage && <span className="text-xs font-extralight">admin</span>}
            </Link>
        </nav>

        <div>
            {/* <Link>
                New Assets
            </Link>
            <Link>
                Assets
            </Link> */}
        </div>
    </header>
  )
}

export default Header
