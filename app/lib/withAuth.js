'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Spinner from '../ui/Spinner'
import { validateToken } from './jwt'

const withAuth = (WrappedComponent, tokenName, loginPage) => {
  return (props) => {
    const router = useRouter()
    const path = usePathname()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      const checkToken = async () => {
        const token = localStorage.getItem(tokenName)
        const { valid } = await validateToken(token)

        if (!valid) {
          localStorage.removeItem(tokenName)
          router.replace(loginPage)
        } else {
          setLoading(false)
        }
      }

      checkToken()

      const interval = setInterval(checkToken, 10000)
      return () => clearInterval(interval)
    }, [path])

    if (loading) {
      return <Spinner />
    }

    return <WrappedComponent {...props} />
  }
}

export default withAuth
