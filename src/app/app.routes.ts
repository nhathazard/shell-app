import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { ReactWrapperComponent } from './react-wrapper/react-wrapper.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full'
  },
  {
    path: 'products',
    loadChildren: () => loadRemoteModule({
      type: 'module',
      remoteEntry: 'http://localhost:4201/remoteEntry.js',
      exposedModule: './ProductModule'
    }).then(m => m.ProductModule)
  },
  {
    path: 'users',
    loadChildren: () => loadRemoteModule({
      type: 'module',
      remoteEntry: 'http://localhost:4202/remoteEntry.js',
      exposedModule: './UserModule'
    }).then(m => m.UserModule)
  },
  {
    path: 'cart',
    loadChildren: () => loadRemoteModule({
      type: 'module',
      remoteEntry: 'http://localhost:4203/remoteEntry.js',
      exposedModule: './CartModule'
    }).then(m => m.CartModule)
  },
  {
    path: 'analytics',
    component: ReactWrapperComponent
  }
];
