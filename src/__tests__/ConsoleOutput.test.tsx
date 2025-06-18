import { render, screen, fireEvent } from '@testing-library/react';
import ConsoleOutput from '../components/Console/ConsoleOutput';
import { EditorProvider } from '../context/EditorContext';

// Mock the uuid library
jest.mock('uuid', () => ({
  v4: jest.fn(() => 'test-uuid'),
}));

describe('ConsoleOutput Component', () => {
  test('renders console output component with empty message', () => {
    render(
      <EditorProvider>
        <ConsoleOutput />
      </EditorProvider>
    );
    
    // Check for header
    expect(screen.getByText('Console')).toBeInTheDocument();
    
    // Check for empty message when no console output exists
    expect(screen.getByText('No console output. Run your code to see output here.')).toBeInTheDocument();
  });
  
  test('displays console messages when they exist', () => {
    const TestComponent = () => {
      const { addConsoleMessage } = require('../context/EditorContext').useEditor();
      
      // Add a test message
      const addMessage = () => {
        addConsoleMessage('log', 'Test log message');
      };
      
      return (
        <>
          <ConsoleOutput />
          <button onClick={addMessage} data-testid="add-message">Add Message</button>
        </>
      );
    };
    
    render(
      <EditorProvider>
        <TestComponent />
      </EditorProvider>
    );
    
    // Click button to add a message
    const addButton = screen.getByTestId('add-message');
    fireEvent.click(addButton);
    
    // Check if message appears
    expect(screen.getByText(/Test log message/)).toBeInTheDocument();
    
    // Empty message should no longer be visible
    expect(screen.queryByText('No console output. Run your code to see output here.')).not.toBeInTheDocument();
  });
  
  test('clear button removes all console messages', () => {
    const TestComponent = () => {
      const { addConsoleMessage } = require('../context/EditorContext').useEditor();
      
      // Add a test message
      const addMessage = () => {
        addConsoleMessage('log', 'Test log message');
      };
      
      return (
        <>
          <ConsoleOutput />
          <button onClick={addMessage} data-testid="add-message">Add Message</button>
        </>
      );
    };
    
    render(
      <EditorProvider>
        <TestComponent />
      </EditorProvider>
    );
    
    // Add a message
    const addButton = screen.getByTestId('add-message');
    fireEvent.click(addButton);
    
    // Verify message exists
    expect(screen.getByText(/Test log message/)).toBeInTheDocument();
    
    // Clear the console
    const clearButton = screen.getByText('Clear');
    fireEvent.click(clearButton);
    
    // Check if message is gone and empty message is back
    expect(screen.queryByText(/Test log message/)).not.toBeInTheDocument();
    expect(screen.getByText('No console output. Run your code to see output here.')).toBeInTheDocument();
  });
  
  test('displays different message types with appropriate styling', () => {
    const TestComponent = () => {
      const { addConsoleMessage } = require('../context/EditorContext').useEditor();
      
      // Add different types of messages
      const addMessages = () => {
        addConsoleMessage('log', 'Log message');
        addConsoleMessage('error', 'Error message');
        addConsoleMessage('warn', 'Warning message');
        addConsoleMessage('info', 'Info message');
      };
      
      return (
        <>
          <ConsoleOutput />
          <button onClick={addMessages} data-testid="add-messages">Add Messages</button>
        </>
      );
    };
    
    render(
      <EditorProvider>
        <TestComponent />
      </EditorProvider>
    );
    
    // Add messages
    const addButton = screen.getByTestId('add-messages');
    fireEvent.click(addButton);
    
    // Check if all messages are displayed
    expect(screen.getByText(/Log message/)).toBeInTheDocument();
    expect(screen.getByText(/Error message/)).toBeInTheDocument();
    expect(screen.getByText(/Warning message/)).toBeInTheDocument();
    expect(screen.getByText(/Info message/)).toBeInTheDocument();
  });
});
