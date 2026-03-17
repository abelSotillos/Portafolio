// taskbar.types.ts

export interface App {
  id: string;
  title: string;
  lucideIcon: string;
}

export const defaultApps: App[] = [
  { id: "portafolio",    title: "Perfil",     lucideIcon: "User" },
  { id: "app-explorer", title: "Explorador",  lucideIcon: "FolderOpen" },
  { id: "app-terminal", title: "Terminal",    lucideIcon: "Terminal" },
  { id: "app-browser",  title: "Navegador",   lucideIcon: "Globe" },
  { id: "app-notes",    title: "Notas",       lucideIcon: "FileText"},
  { id: "app-calc",     title: "Calculadora", lucideIcon: "Calculator" },
  { id: "app-music",    title: "Música",      lucideIcon: "Music" },
];
