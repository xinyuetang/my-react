import { ThemeProvider} from '@material-ui/core'
import {Switch, BrowserRouter}  from 'react-router-dom';


import GlobalStyles from './components/GlobalStyles';
import theme  from 'src/theme';
import routes from 'src/routes';

import { RouteWithSubRoutes } from "src/routerGuard"
export default function App() {
  return (
    <BrowserRouter>
    <ThemeProvider theme={theme}>
      <GlobalStyles/>
     
     
      {/* <RenderRoutes routes={routes} /> */}
       <Switch>
       {routes.map((route, i) => (
         <RouteWithSubRoutes key={i} {...route} />
       ))}
     </Switch>
     
    </ThemeProvider>
    </BrowserRouter>
  );
}


