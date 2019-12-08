import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NbThemeModule, NbLayoutModule, NbCardModule, NbIconModule, NbButtonModule, NbStepperModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { CreateOrderComponent } from './create-order/create-order.component';
import { ManageOrderComponent } from './manage-order/manage-order.component';
import { FollowOrderComponent } from './follow-order/follow-order.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatFormFieldModule } from '@angular/material/form-field';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { MatInputModule } from '@angular/material/input';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ShareButtonsConfig } from '@ngx-share/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const customConfig: ShareButtonsConfig = {
  include: ['whatsapp', 'telegram', 'messenger', 'line', 'copy'],
  theme: 'material-dark',
  gaTracking: true,
};

@NgModule({
  declarations: [
    AppComponent,
    CreateOrderComponent,
    ManageOrderComponent,
    FollowOrderComponent,
    MainMenuComponent
  ],
  imports: [
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFirestoreModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbCardModule,
    NbEvaIconsModule,
    NbIconModule,
    NbStepperModule,
    NbButtonModule,
    MatFormFieldModule,
    MatMomentDateModule,
    MatInputModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ShareButtonsModule.withConfig(customConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
