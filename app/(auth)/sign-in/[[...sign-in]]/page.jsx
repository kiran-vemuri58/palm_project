import { SignIn } from '@clerk/nextjs'
import React from 'react'
import AuthLayout from '../../layout'

const SignInPage = () => {
  return (<AuthLayout>
        <SignIn/>
  </AuthLayout> )
}

export default SignInPage
