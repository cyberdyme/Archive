import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MonacoEditorModule, NgxMonacoEditorConfig } from 'ngx-monaco-editor';

import { AppComponent } from './app.component';

const monacoConfig: NgxMonacoEditorConfig = {
  onMonacoLoad: () => { 
    const id = "foo.json";
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      schemas: [{
        uri: "http://myserver/foo-schema.json",
        fileMatch: [id],
        schema: {
          type: "object",
          properties: {
            p1: {
              enum: [ "v1", "v2"]
            },
            p2: {
              $ref: "http://myserver/bar-schema.json"
            }
          }
        }
      },{
        uri: "http://myserver/bar-schema.json",
        fileMatch: [id],
        schema: {
          type: "object",
          properties: {
            q1: {
              enum: [ "x1", "x2"]
            }
          }
        }
      }]
    });
  } 
};


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MonacoEditorModule.forRoot(monacoConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
