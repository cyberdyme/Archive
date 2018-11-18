import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MonacoEditorModule, NgxMonacoEditorConfig } from 'ngx-monaco-editor';

import { AppComponent } from './app.component';

const monacoConfig: NgxMonacoEditorConfig = {
  onMonacoLoad: () => { 
    monaco.languages.register({
      id: 'mySpecialLanguage'
    });
    
    // Register a tokens provider for the language
    monaco.languages.setMonarchTokensProvider('mySpecialLanguage', <any>{
      tokenizer: {
        root: [
          [/\[error.*/, "custom-error"],
          [/\[notice.*/, "custom-notice"],
          [/\[info.*/, "custom-info"],
          [/\[[a-zA-Z 0-9:]+\]/, "custom-date"],
          [/\|/, "custom-pipe"]
        ]
      }
    });
    
    // Define a new theme that constains only rules that match this language
    monaco.editor.defineTheme('myCoolTheme', <any>{
      base: 'vs-dark',
      inherit: true,
      rules: [{
        token: 'custom-info',
        foreground: 'FFFFFF'
      }, {
        token: 'custom-error',
        foreground: 'ff0000',
        fontStyle: 'bold'
      }, {
        token: 'custom-notice',
        foreground: 'FFA500'
      }, {
        token: 'custom-date',
        foreground: '008800'
      }, {
        token: 'custom-pipe',
        foreground: '009933'
      }, ]
    });
    
    monaco.languages.registerDocumentFormattingEditProvider('mySpecialLanguage', {
      provideDocumentFormattingEdits: function(model, options, token) {
        
        const inputSource=model.getValue().toString();
        
        console.log("here"+inputSource) // which is well printed
        
        const inputLines=inputSource.split('\n');
        console.log("line count"+inputLines.length) // which is well printed
        
        let changeLocations =[];
    
        
        for(var i=0; i<inputLines.length; i++) {
            console.log("Processing:"+i+" -> "+inputLines[i]);
            let str = inputLines[i];
  
            const currentLine=i+1;
            
            const strLength=str.length - 2;
            for (var j = 0; j < strLength; j++) {
              if(str.charAt(j) === '|' && str.charAt(j+1) !== '\n'){
                console.log(`position =>${j}`);
                
                const currentPosition= j+2;
                changeLocations.push({
                  range: {
                  startLineNumber: currentLine,
                  startColumn: currentPosition,
                  endLineNumber: currentLine,
                  endColumn: currentPosition
                  },
                  text: '\n'
                })
              }
            }
        }
        
        return changeLocations;
      }
    })
    
    // Register a completion item provider for the new language
    monaco.languages.registerCompletionItemProvider('mySpecialLanguage', {
      provideCompletionItems: () => {
        return [{
          label: 'simpleText',
          kind: monaco.languages.CompletionItemKind.Text
        }, {
          label: 'testing',
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: {
            value: 'testing(${1:condition})'
          }
        }, {
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
        }]
      }
    })  
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
