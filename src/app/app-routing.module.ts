import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoriasComponent } from './categorias/categorias.component';
import { CategoriasDetalheComponent } from './categorias-detalhe/categorias-detalhe.component';
import { CategoriasEditarComponent } from './categorias-editar/categorias-editar.component';
import { CategoriasNovaComponent } from './categorias-nova/categorias-nova.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' }
  },
  {
    path: 'logout',
    component: LogoutComponent,
    data: { title: 'Logout' }
  },
  {
    path: 'categorias',
    component: CategoriasComponent,
    data: { title: 'Categorias' }
  },
  {
    path: 'categoria-detalhe/:id',
    component: CategoriasDetalheComponent,
    data: { title: 'Detalhe da Categoria' }
  },
  {
    path: 'categorias-nova',
    component: CategoriasNovaComponent,
    data: { title: 'Adicionar Categoria' }
  },
  {
    path: 'categoria-editar/:id',
    component: CategoriasEditarComponent,
    data: { title: 'Editar a Categoria' }
  },
  {
    path: '',
    redirectTo: '/categorias',
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
