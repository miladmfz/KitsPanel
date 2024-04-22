import { NgModule } from '@angular/core';
import {
  CommonModule,
  PathLocationStrategy,
  LocationStrategy,
} from '@angular/common';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RightSliderComponent } from './right-slider/right-slider.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { RouterModule, Routes } from '@angular/router';
import { Routing } from '../../app/routing';
import { LocalStorageService } from '../framework-services/local.storage.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PhoenixFrameworkModule } from '../framework-components/framework.module';
import { IdentityService } from '../framework-services/identity.service';
import { NotificationService } from '../framework-services/notification.service';
import { SettingService } from '../framework-services/setting.service';
import { SwalService } from '../framework-services/swal.service';
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: Routing,
  },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PhoenixFrameworkModule,
  ],
  declarations: [
    LayoutComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    RightSliderComponent,
    ToolbarComponent,
  ],
  providers: [
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    LocalStorageService,
    IdentityService,
    SettingService,
    NotificationService,
    SwalService,
  ],
  exports: [RouterModule],
})
export class LayoutModule {}
