import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Login from './components/Login.jsx'
import CreateUser from './components/CreateUser.jsx'
import ListAssets from './components/ListAssets.jsx'
import DeleteUser from './components/DeleteUser.jsx'
import Home from './components/Home.jsx'
import UpdateUser from './components/UpdateUser.jsx'
import UpdateAsset from './components/UpdateAsset.jsx'
import AddAsset from './components/AddAsset.jsx'
import DeleteAsset from './components/DeleteAsset.jsx'

export default function App() {

const routes = createBrowserRouter([
  {
    path: '/',
    element : <Login /> 
  },
  {
    path: '/create-user',
    element : <CreateUser />
  },
  {
    path: '/list-assets',
    element: <ListAssets /> 
  },
  {
    path: '/delete-user',
    element: <DeleteUser />
  },
  {
    path: '/home',
    element: <Home/>
  },
  {
    path: '/update-user',
    element: <UpdateUser />
  },
  {
    path: '/update-asset',
    element: <UpdateAsset />
  },
  {
    path: '/add-asset',
    element: <AddAsset />
  },
  {
    path: '/delete-asset',
    element: <DeleteAsset />
  }


  // {
  //   path: '/update-user',
  //   children: [{path: ':userId',
  //     element: <UpdateUser/>
  //   }],
    
  // }
  ]);
  
  return (
    <RouterProvider router={routes}/>
  );
}



