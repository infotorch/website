import { useRouteMatch } from "react-router-dom"

export const useTabsWithRouter = (routes, defaultRoute) => {
  const match = useRouteMatch(routes)

  return match?.path ?? defaultRoute
}

export default useTabsWithRouter
