import { useContext, useEffect } from 'react'
import useRouteElement from './useRouteElements'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { LocalStorageEventTarget } from './utils/auth'
import { AppContext } from './contexts/app.context'
function App() {
  const routeElements = useRouteElement()
  const { reset } = useContext(AppContext)
  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearFormLS', reset)
    return () => {
      LocalStorageEventTarget.removeEventListener('clearFormLS', reset)
    }
  }, [reset])
  return (
    <div>
      {routeElements}
      <ToastContainer />
    </div>
  )
}

export default App
