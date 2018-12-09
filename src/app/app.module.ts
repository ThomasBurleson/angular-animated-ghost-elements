import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CustomMaterialModule } from './custom-material.module';

import { AppComponent } from './app-shell/app.component';
import { SvgIconComponent } from './utils/svg-icon/svg-icon.component';

import { UsersService } from './users/users.service';
import { UserListComponent } from './user-list/user-list.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CustomMaterialModule,
    FlexLayoutModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  declarations: [
    AppComponent, 
    UserListComponent, 
    SvgIconComponent
  ],
  providers: [ UsersService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
