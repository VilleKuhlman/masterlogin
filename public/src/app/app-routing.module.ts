import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { SecretStuffComponent } from './secret-stuff/secret-stuff.component'

import { SecretResolver } from './secret-stuff/sercret.service';

const routes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'secret', redirectTo: '/secrets', pathMatch: 'full' },
  { path: 'secrets', component: SecretStuffComponent, runGuardsAndResolvers: "always", resolve: { secrets: SecretResolver } }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
