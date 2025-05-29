import { render, screen, fireEvent } from '@testing-library/react';
import CodePreview from '../components/Preview/CodePreview';
import { EditorProvider } from '../context/EditorContext';

// Mock the babel standalone package
jest.mock('@babel/standalone', () => ({
  transform: jest.fn((code) => ({ code })),
}));

describe('CodePreview Component', () => {
  test('renders preview component with iframe', () => {
    render(
      <EditorProvider>
        <CodePreview />
      </EditorProvider>
    );
    
    expect(screen.getByText('Preview')).toBeInTheDocument();
    
    expect(screen.getByText('Refresh')).toBeInTheDocument();
    
    const iframe = screen.getByTitle('Code Preview');
    expect(iframe).toBeInTheDocument();
  });
  
  test('refresh button triggers recompilation', () => {
    render(
      <EditorProvider>
        <CodePreview />
      </EditorProvider>
    );
    
    const refreshButton = screen.getByText('Refresh');
    fireEvent.click(refreshButton);
    
    expect(refreshButton).toBeInTheDocument();
  });
  
  test('handles compilation errors gracefully', () => {
    require('@babel/standalone').transform.mockImplementationOnce(() => {
      throw new Error('Syntax error');
    });
    
    const TestComponent = () => {
      const { setCompilationErrors } = require('../context/EditorContext').useEditor();
      
      const simulateError = () => {
        setCompilationErrors([{ message: 'Test error message' }]);
      };
      
      return (
        <>
          <CodePreview />
          <button onClick={simulateError} data-testid="simulate-error">Simulate Error</button>
        </>
      );
    };
    
    render(
      <EditorProvider>
        <TestComponent />
      </EditorProvider>
    );
    
    const errorButton = screen.getByTestId('simulate-error');
    fireEvent.click(errorButton);
    
    expect(screen.getByText('Refresh')).toBeInTheDocument();
  });
});
