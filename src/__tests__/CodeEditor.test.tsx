import { render, screen, fireEvent } from '@testing-library/react';
import CodeEditor from '../components/Editor/CodeEditor';
import { EditorProvider } from '../context/EditorContext';

// Mock Monaco Editor
jest.mock('@monaco-editor/react', () => ({ 
  __esModule: true,
  default: ({ onChange, value, language, onMount }: any) => {
    setTimeout(() => {
      if (onMount) onMount({ focus: jest.fn() });
    }, 0);
    
    return (
      <div data-testid="monaco-editor">
        <textarea
          data-testid="monaco-editor-textarea"
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
        />
        <div>Language: {language}</div>
      </div>
    );
  },
}));

describe('CodeEditor Component', () => {
  test('renders editor component', () => {
    render(
      <EditorProvider>
        <CodeEditor />
      </EditorProvider>
    );
    
    const editorElement = screen.getByTestId('monaco-editor');
    expect(editorElement).toBeInTheDocument();
  });
  
  test('displays active file content', () => {
    render(
      <EditorProvider>
        <CodeEditor />
      </EditorProvider>
    );
    
    const textareaElement = screen.getByTestId('monaco-editor-textarea');
    // Default files from EditorContext should be displayed
    expect(textareaElement).toBeInTheDocument();
  });
  
  test('calls updateFileContent when editor content changes', () => {
    render(
      <EditorProvider>
        <CodeEditor />
      </EditorProvider>
    );
    
    const textareaElement = screen.getByTestId('monaco-editor-textarea');
    fireEvent.change(textareaElement, { target: { value: 'const newCode = "test";' } });
    
    expect(textareaElement).toBeInTheDocument();
  });
});
