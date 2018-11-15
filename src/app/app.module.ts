import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MonacoEditorModule, NgxMonacoEditorConfig } from 'ngx-monaco-editor';

import { AppComponent } from './app.component';



const monacoConfig: NgxMonacoEditorConfig = {
  onMonacoLoad: () => { 
    const id = "foo.json";
    monaco.languages.register({ id: 'mySpecialLanguage' });
  
    monaco.languages.setMonarchTokensProvider('mySpecialLanguage', <any>{
      tokenizer: {
        root: [
          [/\[error.*/, "custom-error"],
          [/\[notice.*/, "custom-notice"],
          [/\[info.*/, "custom-info"],
          [/\[[a-zA-Z 0-9:]+\]/, "custom-date"],
        ]
      }    
    });

    // Define a new theme that contains only rules that match this language
    monaco.editor.defineTheme('myCoolTheme', <any>{
      base: 'vs',
	    inherit: false,
	    rules: [
		    { token: 'custom-info', foreground: '808080' },
		    { token: 'custom-error', foreground: 'ff0000', fontStyle: 'bold' },
		    { token: 'custom-notice', foreground: 'FFA500' },
		    { token: 'custom-date', foreground: '008800' },
	    ]
    });

    // Register a completion item provider for the new language
    monaco.languages.registerCompletionItemProvider('mySpecialLanguage', {
      provideCompletionItems: () => {
        return [
          {
            label: 'simpleText',
            kind: monaco.languages.CompletionItemKind.Text
          }, {
            label: 'testing',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: {
              value: 'testing(${1:condition})'
            }
          },
          {
            label: 'ifelse',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: {
              value: [
                'if (${1:condition}) {',
                '\t$0',
                '} else {',
                '\t',
                '}'
              ].join('\n')
            },
            documentation: 'If-Else Statement'
          }
        ]
      }
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
