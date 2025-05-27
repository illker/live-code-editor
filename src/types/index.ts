export type FileType = 'js' | 'ts' | 'jsx' | 'tsx' | 'css' | 'html';

export interface FileItem {
  id: string;
  name: string;
  content: string;
  type: FileType;
  path: string;
  lastModified: Date;
}

export interface ConsoleMessage {
  id: string;
  type: 'log' | 'error' | 'warn' | 'info';
  content: string;
  timestamp: Date;
}

export interface EditorTheme {
  name: string;
  value: string;
}

export interface CompilationError {
  message: string;
  line?: number;
  column?: number;
  sourceFile?: string;
}
