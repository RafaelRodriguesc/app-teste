import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlteraCadastroComponent } from './pages/cadastro/altera-cadastro/altera-cadastro.component';
import { CadastroUsuarioComponent } from './pages/cadastro/cadastro-usuario/cadastro-usuario.component';
import { ContentComponent } from './pages/home/content/content.component';
import { FooterComponent } from './pages/home/footer/footer.component';
import { HeaderComponent } from './pages/home/header/header.component';
import { HomeComponent } from './pages/home/home/home.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {path:'', redirectTo: 'login', pathMatch: 'full'},
  {path:'home', component: HomeComponent},
  {path:'login', component: LoginComponent},
  {path:'header', component: HeaderComponent},
  {path:'content', component: ContentComponent},
  {path:'footer', component: FooterComponent},
  {path:'cadastro-usuario', component: CadastroUsuarioComponent},
  {path:'altera-cadastro/:id', component: AlteraCadastroComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
