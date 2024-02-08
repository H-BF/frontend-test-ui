import { FC, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'

export const MainPage: FC = () => {
  const location = useLocation()
  const history = useHistory()

  useEffect(() => {
    if (location.pathname === '/') {
      history.push('/api/')
    }
  }, [location, history])

  return null
}
