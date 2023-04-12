import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {
  redirectUnauthorizedTo,
  redirectLoggedInTo,
  AuthGuard,
} from '@angular/fire/auth-guard';

const redirectUnauthorizedToWelcome = () => redirectUnauthorizedTo(['welcome']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToWelcome },
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectLoggedInToHome },
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then( m => m.RegisterPageModule),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectLoggedInToHome },
  },
  {
    path: 'welcome',
    loadChildren: () => import('./auth/welcome/welcome.module').then( m => m.WelcomePageModule),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectLoggedInToHome },
  },
  {
    path: 'verify-email',
    loadChildren: () => import('./auth/verify-email/verify-email.module').then( m => m.VerifyEmailPageModule)
  },
  {
    path: 'password-reset',
    loadChildren: () => import('./auth/password-reset/password-reset.module').then( m => m.PasswordResetPageModule),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectLoggedInToHome },
  },
  {
    path: 'notes',
    loadChildren: () => import('./pages/notes-management/notes/notes.module').then( m => m.NotesPageModule),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToWelcome },
  },
  {
    path: 'finance',
    loadChildren: () => import('./pages/finance-management/finance/finance.module').then( m => m.FinancePageModule),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToWelcome },
  },
  {
    path: 'expenses',
    loadChildren: () => import('./pages/finance-management/expenses/expenses.module').then( m => m.ExpensesPageModule),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToWelcome },
  },
  {
    path: 'income',
    loadChildren: () => import('./pages/finance-management/income/income.module').then( m => m.IncomePageModule),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToWelcome },
  },
  {
    path: 'tasks',
    loadChildren: () => import('./pages/tasks-management/tasks/tasks.module').then( m => m.TasksPageModule),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToWelcome },
  },
  {
    path: 'tasks-card',
    loadChildren: () => import('./pages/tasks-management/tasks-card/tasks-card.module').then( m => m.TasksCardPageModule),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToWelcome },
  },
  {
    path: 'add-tasks',
    loadChildren: () => import('./pages/tasks-management/add-tasks/add-tasks.module').then( m => m.AddTasksPageModule),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToWelcome },
  },
  {
    path: 'update-tasks/:taskId',
    loadChildren: () => import('./pages/tasks-management/update-tasks/update-tasks.module').then( m => m.UpdateTasksPageModule),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToWelcome },
  },
  {
    path: 'config',
    loadChildren: () => import('./pages/config/config.module').then( m => m.ConfigPageModule),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToWelcome },
  },
  {
    path: 'actions-modal',
    loadChildren: () => import('./component/actions-modal/actions-modal.module').then( m => m.ActionsModalPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
