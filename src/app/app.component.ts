import { Component, ViewChild } from '@angular/core';
import { NgxEditorModel } from 'ngx-monaco-editor';


// from https://microsoft.github.io/monaco-editor/playground.html#extending-language-services-custom-languages
// https://plnkr.co/edit/PY2ZjvyR0IViqLg33NY3?p=preview
// Register a new language
    
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  options = {
    theme: 'myCoolTheme',
    formatOnPaste: true,
    contextmenu: true,
    language: 'mySpecialLanguage'
  };
  
  jsonCode = this.getCode();

  model: NgxEditorModel = {
    value: this.getCode(), 
    language: 'mySpecialLanguage',   
  };

  getCode() {
    return [
      'A=B|C=D|E=F|A=B|frank=D|E=F|A=B|C=D|E=F|',
    ].join('\n');
  }  
}
