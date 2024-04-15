import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Flight from './components/pages/Flight/Flight'
import Home from './components/pages/home/Home'
import './index.scss'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
	},
	{
		path: 'flight/:id',
		element: <Flight />,
	},
])

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)
