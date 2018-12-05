import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CustomMaterialModule } from './custom-material.module';

import { AppComponent } from './app-shell/app.component';
import { SvgIconComponent } from './utils/svg-icon/svg-icon.component';

import { UserListComponent } from './user-list/user-list.component';
import { GhostListComponent } from './user-list/ghost/ghost-list.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CustomMaterialModule,
    FlexLayoutModule
  ],
  declarations: [
    AppComponent, 
    UserListComponent, 
    GhostListComponent, 
    SvgIconComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
