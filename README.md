# Live Code Editor

A feature-rich, web-based code editor built with React 19, TypeScript, and Vite. This application allows you to write, preview, and debug code in real-time, all within your browser.

![Live Code Editor Screenshot](screenshot.png)

## Features

- **Split-pane Layout**: Editor, preview, and console panels in a customizable layout
- **Monaco Editor Integration**: Powerful code editing with syntax highlighting for multiple languages
- **Real-time Compilation**: Instant preview of your code changes
- **Code Execution**: Run your code in an isolated sandbox environment
- **Console Output**: View console logs, errors, and warnings
- **File System**: Create, edit, and manage multiple files
- **Auto-save**: Never lose your work with automatic saving
- **Error Handling**: Clear error reporting with line and column information
- **Support for Multiple Languages**: JavaScript, TypeScript, JSX, CSS, and HTML

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/live-code-editor.git
   cd live-code-editor
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

### Creating Files

Click on the "+ New File" button in the file explorer panel and enter a name and select a file type.

### Editing Code

Select a file from the explorer to open it in the editor. The Monaco Editor provides features like:

- Syntax highlighting
- Auto-completion
- Error highlighting
- Code folding

### Previewing Code

Your code is automatically compiled and previewed in the preview panel. Click the "Refresh" button to manually refresh the preview.

### Console Output

The console panel shows logs, errors, and warnings from your code. Use standard `console.log()`, `console.error()`, etc. in your code to see output here.

## Development

### Project Structure

```
/src
  /components        # UI components
    /Editor          # Code editor components
    /Preview         # Preview panel components
    /Console         # Console output components
    /FileExplorer    # File explorer components
  /context           # React context for state management
  /utils             # Utility functions
  /hooks             # Custom React hooks
  /types             # TypeScript type definitions
  /tests             # Test files
```

### Testing

The project uses Jest and React Testing Library for testing. Run tests with:

```bash
npm test
# or
yarn test
```

For test coverage:

```bash
npm test:coverage
# or
yarn test:coverage
```

## Technologies

- **React 19**: Latest version of React with improved performance
- **TypeScript**: For type safety and better developer experience
- **Vite**: Fast development and build tool
- **Monaco Editor**: The code editor that powers VS Code
- **Babel**: For JavaScript transpilation
- **Jest**: For testing
- **React Testing Library**: For UI component testing

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
