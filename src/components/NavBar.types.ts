// taskbar.types.ts
// Tipos compartidos entre Taskbar y StartMenu

export interface App {
    id: string;
    title: string;
    /** Nombre del icono de Lucide, ej: "Folder", "Terminal", "Globe" */
    lucideIcon: string;
    /** Emoji de respaldo para botones de taskbar y titlebar de ventana */
    emoji: string;
    content?: string;
    width?: number;
    height?: number;
  }
  
  export const defaultApps: App[] = [
    {
      id: "app-explorer",
      title: "Explorador",
      lucideIcon: "FolderOpen",
      emoji: "📁",
      content: "<p>📂 Carpeta vacía</p>",
      width: 480,
      height: 320,
    },
    {
      id: "app-terminal",
      title: "Terminal",
      lucideIcon: "Terminal",
      emoji: "💻",
      content: "<pre style='color:hsl(215 20% 75%);margin:0'>$ _</pre>",
      width: 560,
      height: 360,
    },
    {
      id: "app-browser",
      title: "Navegador",
      lucideIcon: "Globe",
      emoji: "🌐",
      content: "<p>🔍 Escribe una URL...</p>",
      width: 640,
      height: 420,
    },
    {
      id: "app-notes",
      title: "Notas",
      lucideIcon: "FileText",
      emoji: "📝",
      content:
        "<textarea style='width:100%;height:100%;border:none;resize:none;font-size:14px;outline:none;background:transparent;color:hsl(215 20% 75%)' placeholder='Empieza a escribir...'></textarea>",
      width: 400,
      height: 300,
    },
    {
      id: "app-calc",
      title: "Calculadora",
      lucideIcon: "Calculator",
      emoji: "🧮",
      content: "<p>0 + 0 = 0</p>",
      width: 300,
      height: 380,
    },
    {
      id: "app-music",
      title: "Música",
      lucideIcon: "Music",
      emoji: "🎵",
      content: "<p>♪ Sin reproducción</p>",
      width: 360,
      height: 260,
    },
  ];