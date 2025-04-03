
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/nextjs'
import { Button } from './ui/button'
import { CassetteTape } from 'lucide-react'

const Header = async ({isAdminPage=false}) => {
const isAdmin = false
  return (
    <header className='fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 h-16 border-b'>
        <nav className="mx-auto px-4 py-4 flex items-center justify-between">
            <Link href={isAdminPage ? "/admin":'/'}>
                <Image src={"/projectimage.jpg"} alt="palm logo"
                width={200}
                height={60}
                className='h12 w-auto object-contain'/>
                {isAdminPage && <span className="text-xs font-extralight">admin</span>}
            </Link>


            <div className="flex items-center space-x-4">
            <SignedIn>
                <Link href="/newasset">
                    <Button>
                        <CassetteTape size={18} />
                        <span className='hidden md:inline'>New Asset</span>
                    </Button>
                </Link>
                <Link href="/assets">
                    <Button variant="outline">
                        <CassetteTape size={18}/>
                        <span className='hidden md:inline'>Assets</span>
                    </Button>
                </Link>
                <Link href="/assets">
                    <Button variant="outline">
                        <CassetteTape size={18}/>
                        <span className='hidden md:inline'>Schedules</span>
                    </Button>
                </Link>
            </SignedIn>
            <SignedOut>
                <SignInButton forceRedirectUrl="/sign-in">
                    <Button variant="outline">Login</Button>
                </SignInButton>
            </SignedOut>
            <SignedIn>
                <UserButton appearance={{
                    elements:{
                        avatarBox:"w-10 h-10"
                    }
                }}/>
            </SignedIn>
        </div>
        </nav>

        
    </header>
  )
}

export default Header
