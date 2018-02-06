import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { GamePageComponent } from './game-page/game-page.component';
import { GameBlockComponent } from './game-block/game-block.component';
import { GameScoreComponent } from './game-score/game-score.component';


@NgModule({
  declarations: [
    AppComponent,
    GamePageComponent,
    GameBlockComponent,
    GameScoreComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
