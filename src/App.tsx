// React is imported implicitly with JSX
import { EditorProvider } from './context/EditorContext';
import { ThemeProvider } from './context/ThemeContext';
import CodeEditor from './components/Editor/CodeEditor';
import CodePreview from './components/Preview/CodePreview';
import ConsoleOutput from './components/Console/ConsoleOutput';
import FileExplorer from './components/FileExplorer/FileExplorer';
import ThemeSwitcher from './components/common/ThemeSwitcher';
import Split from '@uiw/react-split';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <EditorProvider>
      <div className="app-container">
        <header className="app-header">
          <h1>Live Code Editor</h1>
          <div className="app-controls">
            <ThemeSwitcher />
            <a href="https://github.com/illker/live-code-editor" target="_blank" rel="noopener noreferrer" className="github-link">
              GitHub
            </a>
          </div>
        </header>
        
        <main className="app-content">
          <Split mode="horizontal" className="split-container">
            <div className="file-explorer-panel">
              <FileExplorer />
            </div>
            
            <div className="editor-preview-panel">
              <Split mode="vertical" className="split-container">
                <div className="editor-panel">
                  <CodeEditor />
                </div>
                
                <Split mode="vertical" className="split-container">
                  <div className="preview-panel">
                    <CodePreview />
                  </div>
                  
                  <div className="console-panel">
                    <ConsoleOutput />
                  </div>
                </Split>
              </Split>
            </div>
          </Split>
        </main>
        
        <footer className="app-footer">
          <div>Live Code Editor - Built with React + TypeScript + Vite</div>
        </footer>
      </div>
      </EditorProvider>
    </ThemeProvider>
  );
}

export default App
