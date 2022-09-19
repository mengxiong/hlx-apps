import { RouteObject, useRoutes } from 'react-router-dom';

export function Routes({ routes }: { routes: RouteObject[] }) {
  return useRoutes(routes);
}
