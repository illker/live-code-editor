import React, { useEffect, useState } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { useEditor } from '../../context/EditorContext';
import './CodeEditor.css';

interface CodeEditorProps {
  onCompile?: () => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onCompile }) => {
  const { 
    activeFileId, 
    updateFileContent, 
    getActiveFile,
    compilationErrors,
    addConsoleMessage
  } = useEditor();
  
  const [editorValue, setEditorValue] = useState('');
  const activeFile = getActiveFile();
  
  // Load the active file content
  useEffect(() => {
    if (activeFile) {
      setEditorValue(activeFile.content);
    }
  }, [activeFile]);

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined && activeFileId) {
      setEditorValue(value);
      updateFileContent(activeFileId, value);
      
      // Trigger compile on change for immediate feedback
      if (onCompile) {
        onCompile();
      }
    }
  };

  // Determine language for Monaco Editor based on file type
  const getLanguage = () => {
    if (!activeFile) return 'javascript';
    
    switch (activeFile.type) {
      case 'js':
        return 'javascript';
      case 'ts':
        return 'typescript';
      case 'jsx':
      case 'tsx':
        return 'typescript';
      case 'css':
        return 'css';
      case 'html':
        return 'html';
      default:
        return 'javascript';
    }
  };

  // Handle editor mounting
  const handleEditorDidMount = (editor: any) => {
    editor.focus();
    
    // Add custom keybindings for commands
    editor.addCommand(
      // Monaco.KeyMod.CtrlCmd | Monaco.KeyCode.KeyS, 
      [2048, 83], // Ctrl/Cmd + S
      () => {
        addConsoleMessage('info', 'Changes saved automatically');
      }
    );
  };

  // No active file message
  if (!activeFile) {
    return (
      <div className="code-editor-container empty-editor">
        <p>No active file. Please select or create a file.</p>
      </div>
    );
  }

  return (
    <div className="code-editor-container">
      <div className="editor-header">
        <span className="file-info">
          {activeFile.name} ({activeFile.type})
        </span>
      </div>
      <MonacoEditor
        height="100%"
        language={getLanguage()}
        value={editorValue}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: true },
          scrollBeyondLastLine: false,
          fontSize: 14,
          wordWrap: 'on',
          automaticLayout: true,
          tabSize: 2,
          renderLineHighlight: 'all',
          colorDecorators: true,
          contextmenu: true,
          folding: true,
          showFoldingControls: 'always',
        }}
      />
      {compilationErrors.length > 0 && (
        <div className="compilation-errors">
          {compilationErrors.map((error, index) => (
            <div key={index} className="error-item">
              <span className="error-icon">⚠️</span>
              <span className="error-message">{error.message}</span>
              {error.line && error.column && (
                <span className="error-location">
                  Line {error.line}, Column {error.column}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
