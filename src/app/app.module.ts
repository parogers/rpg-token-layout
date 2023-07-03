import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PieceListComponent } from './piece-list/piece-list.component';
import { PieceLayoutComponent } from './piece-layout/piece-layout.component';
import { PieceComponent } from './piece/piece.component';

@NgModule({
    declarations: [
        AppComponent,
        PieceListComponent,
        PieceLayoutComponent,
        PieceComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
