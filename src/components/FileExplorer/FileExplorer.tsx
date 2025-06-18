import React, { useState } from 'react';
import { useEditor } from '../../context/EditorContext';
import type { FileType } from '../../types';
import './FileExplorer.css';

const FileExplorer: React.FC = () => {
  const { files, addFile, deleteFile, setActiveFile, activeFileId } = useEditor();
  const [newFileName, setNewFileName] = useState('');
  const [newFileType, setNewFileType] = useState<FileType>('js');
  const [isCreatingFile, setIsCreatingFile] = useState(false);
  
  // Get icon for file type
  const getFileIcon = (type: FileType) => {
    switch (type) {
      case 'js':
        return '📄 JS';
      case 'ts':
        return '📄 TS';
      case 'jsx':
        return '📄 JSX';
      case 'tsx':
        return '📄 TSX';
      case 'css':
        return '📄 CSS';
      case 'html':
        return '📄 HTML';
      default:
        return '📄';
    }
  };
  
  // Handle creating a new file
  const handleCreateFile = () => {
    if (newFileName.trim() === '') return;
    
    // Add extension if missing
    let fileName = newFileName;
    if (!fileName.includes('.')) {
      fileName = `${fileName}.${newFileType}`;
    }
    
    addFile(fileName, newFileType);
    setNewFileName('');
    setIsCreatingFile(false);
  };
  
  // Cancel file creation
  const handleCancelCreate = () => {
    setNewFileName('');
    setIsCreatingFile(false);
  };
  
  // Show file creation form
  const showCreateFileForm = () => {
    setIsCreatingFile(true);
  };
  
  return (
    <div className="file-explorer-container">
      <div className="file-explorer-header">
        <span>Files</span>
        <button 
          className="new-file-button" 
          onClick={showCreateFileForm}
          disabled={isCreatingFile}
        >
          + New File
        </button>
      </div>
      
      {isCreatingFile && (
        <div className="new-file-form">
          <input
            type="text"
            placeholder="File name"
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
            autoFocus
          />
          <select
            value={newFileType}
            onChange={(e) => setNewFileType(e.target.value as FileType)}
          >
            <option value="js">JavaScript</option>
            <option value="ts">TypeScript</option>
            <option value="jsx">JSX</option>
            <option value="tsx">TSX</option>
            <option value="css">CSS</option>
            <option value="html">HTML</option>
          </select>
          <div className="new-file-actions">
            <button onClick={handleCreateFile}>Create</button>
            <button onClick={handleCancelCreate}>Cancel</button>
          </div>
        </div>
      )}
      
      <div className="file-list">
        {files.map(file => (
          <div 
            key={file.id}
            className={`file-item ${file.id === activeFileId ? 'active' : ''}`}
            onClick={() => setActiveFile(file.id)}
          >
            <div className="file-icon">{getFileIcon(file.type)}</div>
            <div className="file-name">{file.name}</div>
            <button 
              className="delete-file-button"
              onClick={(e) => {
                e.stopPropagation();
                deleteFile(file.id);
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileExplorer;
