import { Component } from '@angular/core';
import { NgxEditorModel } from 'ngx-monaco-editor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  options = {
    theme: 'vs-dark',
    formatOnPaste: true,
    contextmenu: true
  };
  
  jsonCode = [
    '{"p1": "v3","p2": false, "p3": true}'
  ].join('\n');
 
  model: NgxEditorModel = {
    value: this.jsonCode,
    language: 'json',
    uri: 'foo.json'
  };
}
