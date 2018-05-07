import { environment } from './../environments/environment';

// modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule } from './share/modules/core.module';

// components
import { AppComponent } from './app.component';

// routing
import { APP_ROUTING } from './app.routing';

// ngrx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducersMap } from './share/store';
import { AuthEffects } from './share/store/effects/auth.effects';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(APP_ROUTING),
    StoreModule.forRoot(reducersMap),
    EffectsModule.forRoot([AuthEffects]),
    StoreDevtoolsModule.instrument({
      name: 'Ngrx Photos',
      logOnly: environment.production
    }),
    CoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
