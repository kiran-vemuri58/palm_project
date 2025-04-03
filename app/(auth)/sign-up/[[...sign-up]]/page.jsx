import { SignUp } from '@clerk/nextjs'
import React from 'react'
import AuthLayout from '../../layout'

const SignUpPage = () => {
  return (
    <AuthLayout>
      <SignUp/>
    </AuthLayout>
  )
}

export default SignUpPage
