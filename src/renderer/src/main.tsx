import './assets/main.css';

import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';

import { LoadingProvider } from './hooks/useLoading';
import { routeTree } from './routes/config';

const router = createHashRouter([routeTree]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<LoadingProvider>
		<RouterProvider router={router} />
	</LoadingProvider>
);
