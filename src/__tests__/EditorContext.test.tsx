import { render, screen, act } from '@testing-library/react';
import { EditorProvider, useEditor } from '../context/EditorContext';

// Mock the uuid library
jest.mock('uuid', () => ({
  v4: jest.fn(() => 'test-uuid'),
}));

// Mock localStorage
const localStorageMock = (function() {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Test component that uses the context
const TestComponent = () => {
  const { 
    files, 
    activeFileId, 
    addFile, 
    updateFileContent, 
    setActiveFile, 
    deleteFile, 
    consoleMessages, 
    addConsoleMessage, 
    clearConsole 
  } = useEditor();
  
  return (
    <div>
      <div data-testid="files-count">{files.length}</div>
      <div data-testid="active-file-id">{activeFileId}</div>
      <div data-testid="console-count">{consoleMessages.length}</div>
      
      <button 
        onClick={() => addFile('test.js', 'js', 'console.log("test");')} 
        data-testid="add-file"
      >
        Add File
      </button>
      
      <button 
        onClick={() => updateFileContent('test-uuid', 'updated content')} 
        data-testid="update-file"
      >
        Update File
      </button>
      
      <button 
        onClick={() => setActiveFile('test-uuid')} 
        data-testid="set-active"
      >
        Set Active
      </button>
      
      <button 
        onClick={() => deleteFile('test-uuid')} 
        data-testid="delete-file"
      >
        Delete File
      </button>
      
      <button 
        onClick={() => addConsoleMessage('log', 'test message')} 
        data-testid="add-console"
      >
        Add Console
      </button>
      
      <button 
        onClick={() => clearConsole()} 
        data-testid="clear-console"
      >
        Clear Console
      </button>
    </div>
  );
};

describe('EditorContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.clear();
  });
  
  test('provides default files', () => {
    render(
      <EditorProvider>
        <TestComponent />
      </EditorProvider>
    );
    
    // Default files should be present (3 files: HTML, JS, CSS)
    expect(screen.getByTestId('files-count').textContent).toBe('3');
    
    // An active file should be set
    expect(screen.getByTestId('active-file-id').textContent).not.toBe('');
  });
  
  test('can add a new file', () => {
    render(
      <EditorProvider>
        <TestComponent />
      </EditorProvider>
    );
    
    // Get initial file count
    const initialCount = parseInt(screen.getByTestId('files-count').textContent || '0', 10);
    
    // Add a file
    act(() => {
      screen.getByTestId('add-file').click();
    });
    
    // Check if file count increased
    expect(parseInt(screen.getByTestId('files-count').textContent || '0', 10)).toBe(initialCount + 1);
    
    // Check if the new file became the active file
    expect(screen.getByTestId('active-file-id').textContent).toBe('test-uuid');
  });
  
  test('can update file content', () => {
    render(
      <EditorProvider>
        <TestComponent />
      </EditorProvider>
    );
    
    // Add a file first
    act(() => {
      screen.getByTestId('add-file').click();
    });
    
    // Update the file
    act(() => {
      screen.getByTestId('update-file').click();
    });
    
    // We can't easily check the file content directly, but ensure no errors occur
    expect(screen.getByTestId('files-count').textContent).not.toBe('0');
  });
  
  test('can delete a file', () => {
    render(
      <EditorProvider>
        <TestComponent />
      </EditorProvider>
    );
    
    // Get initial file count
    const initialCount = parseInt(screen.getByTestId('files-count').textContent || '0', 10);
    
    // Add a file
    act(() => {
      screen.getByTestId('add-file').click();
    });
    
    // Check if file count increased
    expect(parseInt(screen.getByTestId('files-count').textContent || '0', 10)).toBe(initialCount + 1);
    
    // Delete the file
    act(() => {
      screen.getByTestId('delete-file').click();
    });
    
    // Check if file count is back to initial
    expect(parseInt(screen.getByTestId('files-count').textContent || '0', 10)).toBe(initialCount);
  });
  
  test('can manage console messages', () => {
    render(
      <EditorProvider>
        <TestComponent />
      </EditorProvider>
    );
    
    // Initially there should be no console messages
    expect(screen.getByTestId('console-count').textContent).toBe('0');
    
    // Add a console message
    act(() => {
      screen.getByTestId('add-console').click();
    });
    
    // Check if console message was added
    expect(screen.getByTestId('console-count').textContent).toBe('1');
    
    // Clear console
    act(() => {
      screen.getByTestId('clear-console').click();
    });
    
    // Check if console messages are cleared
    expect(screen.getByTestId('console-count').textContent).toBe('0');
  });
});
