// taskbar.types.ts

export interface App {
  id: string;
  title: string;
  lucideIcon: string;
}

export const defaultApps: App[] = [
  { id: "portafolio",   title: "Perfil",   lucideIcon: "User" },
  { id: "app-terminal", title: "Terminal", lucideIcon: "Terminal" },
  { id: "app-docker",   title: "Docker",   lucideIcon: "Sailboat" },
  { id: "app-angular",  title: "Angular",  lucideIcon: "FileCode" },
];
