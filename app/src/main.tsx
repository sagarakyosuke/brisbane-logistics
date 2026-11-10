import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { RouterProvider } from 'react-router/dom';
import { Provider } from 'react-redux';

import { store } from '@/utilities/store';
import { theme } from '@/utilities/themes';
import { router } from '@/routes/routes';
import { ApiProvider } from '@/routes/api-routing/useApiRouting';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ApiProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RouterProvider router={router} />
        </ThemeProvider>
      </ApiProvider>
    </Provider>
  </StrictMode>,
);
