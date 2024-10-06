import useRouteElement from './useRouteElements'

function App() {
  const routeElements = useRouteElement()
  return <div>{routeElements}</div>
}

export default App
