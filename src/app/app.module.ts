import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { MyApp } from './app.component';
//import { FIREBASE_CONFIG } from './firebase.credentials';
import { NoteListService } from '../services/note-list.service';
//import 'rxjs/add/operator/map';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';

export const firebaseConfig = {
    apiKey: "AIzaSyAmanoLkXSzLlWA_bhWFjwcu5_OcfvsAOM",
    authDomain: "imex-9c86c.firebaseapp.com",
    databaseURL: "https://imex-9c86c.firebaseio.com",
    projectId: "imex-9c86c",
    storageBucket: "imex-9c86c.appspot.com",
    messagingSenderId: "160138178595"
};

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    NoteListService,
    ImagePicker,
    Base64
  ]
})
export class AppModule { }
