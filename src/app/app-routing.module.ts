import { ClienteComponent } from './components/cliente/cliente.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './security/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { VentaComponent } from './components/venta/venta.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  // { path: '**', redirectTo: '', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'clientes', component: ClienteComponent, canActivate: [AuthGuard] },
  { path: 'ventas', component: VentaComponent, canActivate: [AuthGuard] },
  { path: 'iniciarsesion', component: LoginComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
