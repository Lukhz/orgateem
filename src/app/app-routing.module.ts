import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {
  redirectUnauthorizedTo,
  redirectLoggedInTo,
  canActivate,
} from '@angular/fire/auth-guard';

//const variable to redirect authoriezd and unauthorized users - with "Guards"
//authorized
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
//redirect logged in users to home
const redirectLoggedInToHome = () => redirectLoggedInTo(['']);

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
    //spread opreator
    ...canActivate(redirectLoggedInToHome),
  },
  {
    path: '',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },

  //redirect to initial loginPAge
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },  {
    path: 'modal',
    loadChildren: () => import('./modal/modal.module').then( m => m.ModalPageModule)
  },
  {
    path: 'event-details',
    loadChildren: () => import('./event-details/event-details.module').then( m => m.EventDetailsPageModule)
  },
  {
    path: 'update-event',
    loadChildren: () => import('./update-event/update-event.module').then( m => m.UpdateEventPageModule)
  },
  {
    path: 'new-event',
    loadChildren: () => import('./new-event/new-event.module').then( m => m.NewEventPageModule)
  },
  {
    path: 'new-event',
    loadChildren: () => import('./new-event/new-event.module').then( m => m.NewEventPageModule)
  },
  {
    path: 'new-event',
    loadChildren: () => import('./new-event/new-event.module').then( m => m.NewEventPageModule)
  },

  /* {
    path: 'tab4',
    loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule)
  },*/
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
