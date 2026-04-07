// taskbar.types.ts

export interface App {
  id: string;
  title: string;
  lucideIcon: string;
}

export const defaultApps: App[] = [
  { id: "portafolio",   title: "Perfil",   lucideIcon: "User" },
  { id: "app-terminal", title: "Terminal", lucideIcon: "Terminal" },
];
