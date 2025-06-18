import React, { useEffect, useRef } from 'react';
import { useEditor } from '../../context/EditorContext';
import './ConsoleOutput.css';

const ConsoleOutput: React.FC = () => {
  const { consoleMessages, clearConsole } = useEditor();
  const consoleRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when new messages appear
  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [consoleMessages]);
  
  // Format timestamp
  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  };
  
  // Get message class based on type
  const getMessageClass = (type: string) => {
    switch (type) {
      case 'error':
        return 'console-error';
      case 'warn':
        return 'console-warn';
      case 'info':
        return 'console-info';
      default:
        return 'console-log';
    }
  };
  
  return (
    <div className="console-container">
      <div className="console-header">
        <span>Console</span>
        <button className="clear-console-button" onClick={clearConsole}>
          Clear
        </button>
      </div>
      <div className="console-output" ref={consoleRef}>
        {consoleMessages.length === 0 ? (
          <div className="console-empty-message">
            No console output. Run your code to see output here.
          </div>
        ) : (
          consoleMessages.map(message => (
            <div
              key={message.id}
              className={`console-message ${getMessageClass(message.type)}`}
            >
              <span className="console-timestamp">[{formatTimestamp(message.timestamp)}]</span>
              <span className="console-type">[{message.type}]</span>
              <span className="console-content">{message.content}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ConsoleOutput;
