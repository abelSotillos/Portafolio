// commands.ts — Builtin terminal commands

import { resolve, getNode, type FSNode } from "./filesystem";

export interface TerminalState {
  cwd: string;
  setCwd: (path: string) => void;
  updatePrompt: () => void;
  cmdHistory: string[];
  sessionStart: number;
}

export function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// ── Individual commands ──

function cmdLs(state: TerminalState, args: string[]): string {
  const showHidden = args.includes("-a") || args.includes("-la") || args.includes("-al");
  const pathArg = args.find(a => !a.startsWith("-"));
  const target = pathArg ? resolve(pathArg, state.cwd) : state.cwd;
  const node = getNode(target);
  if (!node) return `<span class="term-error">ls: no se puede acceder a '${esc(pathArg || "")}': No existe el archivo o el directorio</span>`;
  if (node.type === "file") return pathArg || state.cwd.split("/").pop() || "";
  const keys = Object.keys(node.children)
    .filter(k => showHidden || !k.startsWith("."))
    .sort();
  if (keys.length === 0) return '<span class="term-dim">(directorio vacío)</span>';
  return keys.map(k => {
    const child = node.children[k];
    return child.type === "dir"
      ? `<span class="term-label">${esc(k)}/</span>`
      : `<span class="term-dim">${esc(k)}</span>`;
  }).join("  ");
}

function cmdCd(state: TerminalState, args: string[]): string {
  const target = args[0];
  if (!target || target === "~") { state.setCwd("/home/abel"); state.updatePrompt(); return ""; }
  const resolved = resolve(target, state.cwd);
  const node = getNode(resolved);
  if (!node) return `<span class="term-error">cd: ${esc(target)}: No existe el archivo o el directorio</span>`;
  if (node.type !== "dir") return `<span class="term-error">cd: ${esc(target)}: No es un directorio</span>`;
  state.setCwd(resolved);
  state.updatePrompt();
  return "";
}

function cmdCat(state: TerminalState, args: string[]): string {
  if (args.length === 0) return '<span class="term-error">cat: falta el operando</span>';
  const target = resolve(args[0], state.cwd);
  const node = getNode(target);
  if (!node) return `<span class="term-error">cat: ${esc(args[0])}: No existe el archivo o el directorio</span>`;
  if (node.type === "dir") return `<span class="term-error">cat: ${esc(args[0])}: Es un directorio</span>`;
  return esc(node.content);
}

function cmdPwd(state: TerminalState): string { return state.cwd; }

function cmdWhoami(): string { return "abel"; }

function cmdDate(): string {
  return new Date().toLocaleString("es-ES", { dateStyle: "full", timeStyle: "medium" });
}

function cmdUname(_state: TerminalState, args: string[]): string {
  if (args.includes("-a")) return "AbelOS 1.0.0 portfolio x86_64 GNU/Linux";
  return "AbelOS";
}

function cmdTree(state: TerminalState, args: string[]): string {
  const pathArg = args.find(a => !a.startsWith("-"));
  const target = pathArg ? resolve(pathArg, state.cwd) : state.cwd;
  const node = getNode(target);
  if (!node) return `<span class="term-error">tree: '${esc(pathArg || "")}': No existe</span>`;
  if (node.type === "file") return esc(pathArg || "");
  const lines: string[] = [];
  function walk(n: FSNode, prefix: string, isLast: boolean, name: string) {
    const connector = isLast ? "└── " : "├── ";
    if (n.type === "dir") {
      lines.push(`${prefix}${connector}<span class="term-label">${esc(name)}/</span>`);
      const entries = Object.keys(n.children).filter(k => !k.startsWith(".")).sort();
      entries.forEach((k, i) => {
        walk(n.children[k], prefix + (isLast ? "    " : "│   "), i === entries.length - 1, k);
      });
    } else {
      lines.push(`${prefix}${connector}<span class="term-dim">${esc(name)}</span>`);
    }
  }
  const entries = Object.keys(node.children).filter(k => !k.startsWith(".")).sort();
  lines.push('<span class="term-label">.</span>');
  entries.forEach((k, i) => {
    walk(node.children[k], "", i === entries.length - 1, k);
  });
  return lines.join("\n");
}

function cmdEcho(_state: TerminalState, args: string[]): string {
  return esc(args.join(" "));
}

function cmdHistory(state: TerminalState): string {
  if (state.cmdHistory.length === 0) return '<span class="term-dim">(historial vacío)</span>';
  return state.cmdHistory
    .slice(0, 30)
    .map((cmd, i) => `<span class="term-dim">${String(i + 1).padStart(4)}</span>  ${esc(cmd)}`)
    .join("\n");
}

function cmdUptime(state: TerminalState): string {
  const elapsed = Math.floor((Date.now() - state.sessionStart) / 1000);
  const h = Math.floor(elapsed / 3600);
  const m = Math.floor((elapsed % 3600) / 60);
  const s = elapsed % 60;
  const parts: string[] = [];
  if (h > 0) parts.push(`${h}h`);
  if (m > 0) parts.push(`${m}m`);
  parts.push(`${s}s`);
  return `up ${parts.join(" ")}`;
}

function cmdHead(state: TerminalState, args: string[]): string {
  let n = 5;
  const filtered: string[] = [];
  for (const a of args) {
    if (a.startsWith("-") && !isNaN(Number(a.slice(1)))) n = Number(a.slice(1));
    else filtered.push(a);
  }
  if (filtered.length === 0) return '<span class="term-error">head: falta el operando</span>';
  const target = resolve(filtered[0], state.cwd);
  const node = getNode(target);
  if (!node) return `<span class="term-error">head: ${esc(filtered[0])}: No existe</span>`;
  if (node.type === "dir") return `<span class="term-error">head: ${esc(filtered[0])}: Es un directorio</span>`;
  return esc(node.content.split("\n").slice(0, n).join("\n"));
}

function cmdTail(state: TerminalState, args: string[]): string {
  let n = 5;
  const filtered: string[] = [];
  for (const a of args) {
    if (a.startsWith("-") && !isNaN(Number(a.slice(1)))) n = Number(a.slice(1));
    else filtered.push(a);
  }
  if (filtered.length === 0) return '<span class="term-error">tail: falta el operando</span>';
  const target = resolve(filtered[0], state.cwd);
  const node = getNode(target);
  if (!node) return `<span class="term-error">tail: ${esc(filtered[0])}: No existe</span>`;
  if (node.type === "dir") return `<span class="term-error">tail: ${esc(filtered[0])}: Es un directorio</span>`;
  return esc(node.content.split("\n").slice(-n).join("\n"));
}

function cmdGrep(state: TerminalState, args: string[]): string {
  if (args.length < 2) return '<span class="term-error">grep: uso: grep [patrón] [archivo]</span>';
  const pattern = args[0];
  const target = resolve(args[1], state.cwd);
  const node = getNode(target);
  if (!node) return `<span class="term-error">grep: ${esc(args[1])}: No existe</span>`;
  if (node.type === "dir") return `<span class="term-error">grep: ${esc(args[1])}: Es un directorio</span>`;
  const lines = node.content.split("\n");
  const matches = lines.filter(l => l.toLowerCase().includes(pattern.toLowerCase()));
  if (matches.length === 0) return `<span class="term-dim">(sin coincidencias)</span>`;
  return matches.map(l => {
    const escaped = esc(l);
    const re = new RegExp(`(${esc(pattern).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    return escaped.replace(re, '<span class="term-cmd">$1</span>');
  }).join("\n");
}

function cmdWc(state: TerminalState, args: string[]): string {
  if (args.length === 0) return '<span class="term-error">wc: falta el operando</span>';
  const target = resolve(args[0], state.cwd);
  const node = getNode(target);
  if (!node) return `<span class="term-error">wc: ${esc(args[0])}: No existe</span>`;
  if (node.type === "dir") return `<span class="term-error">wc: ${esc(args[0])}: Es un directorio</span>`;
  const lines = node.content.split("\n").length;
  const words = node.content.split(/\s+/).filter(Boolean).length;
  const chars = node.content.length;
  return `  ${lines}  ${words} ${chars} ${esc(args[0])}`;
}

function cmdFind(state: TerminalState, args: string[]): string {
  const pattern = args[0]?.toLowerCase();
  if (!pattern) return '<span class="term-error">find: falta el nombre a buscar</span>';
  const results: string[] = [];
  function walk(node: FSNode, path: string) {
    if (node.type === "dir") {
      for (const [name, child] of Object.entries(node.children)) {
        const fullPath = `${path}/${name}`;
        if (name.toLowerCase().includes(pattern)) {
          results.push(child.type === "dir"
            ? `<span class="term-label">${esc(fullPath)}/</span>`
            : `<span class="term-dim">${esc(fullPath)}</span>`);
        }
        walk(child, fullPath);
      }
    }
  }
  const startPath = resolve(args[1] || ".", state.cwd);
  const startNode = getNode(startPath);
  if (!startNode) return `<span class="term-error">find: '${esc(args[1] || ".")}': No existe</span>`;
  walk(startNode, startPath);
  if (results.length === 0) return `<span class="term-dim">(sin resultados)</span>`;
  return results.join("\n");
}

function cmdReadonly(): string {
  return '<span class="term-error">Permiso denegado: sistema de archivos de solo lectura</span>';
}

function cmdGit(_state: TerminalState, args: string[]): string {
  const sub = args[0];
  if (sub === "status") {
    return '<span class="term-accent">On branch main\nYour branch is up to date with \'origin/main\'.\n\nnothing to commit, portfolio is clean</span>';
  }
  if (sub === "log") {
    const log = [
      { hash: "040ebda", date: "2025-04-11", msg: "feat: add Angular & Spring Boot windows" },
      { hash: "7240015", date: "2025-04-10", msg: "feat: add Docker window with docs & compose generator" },
      { hash: "c60db2d", date: "2025-04-09", msg: "feat: interactive terminal with filesystem & easter eggs" },
      { hash: "738e12e", date: "2025-04-08", msg: "style: real avatar photo & background" },
      { hash: "e2d22db", date: "2025-04-07", msg: "refactor: window system with lucide icons" },
      { hash: "3c1b0e9", date: "2025-04-06", msg: "feat: navbar v2" },
    ];
    return log.map(e =>
      `<span class="term-cmd">${e.hash}</span> <span class="term-dim">${e.date}</span> ${esc(e.msg)}`
    ).join("\n");
  }
  if (sub === "blame") {
    return '<span class="term-dim">Siempre es culpa del que hizo el último commit.\n(...y suelo ser yo)</span>';
  }
  return `<span class="term-error">git: '${esc(sub || "")}' no es un comando de git.</span> Prueba <span class="term-cmd">git log</span> o <span class="term-cmd">git status</span>`;
}

function cmdAlias(): string {
  return [
    `<span class="term-cmd">alias</span> yolo=<span class="term-dim">'git push --force'</span>`,
    `<span class="term-cmd">alias</span> please=<span class="term-dim">'sudo'</span>`,
    `<span class="term-cmd">alias</span> fml=<span class="term-dim">'rm -rf node_modules && npm install'</span>`,
    `<span class="term-cmd">alias</span> works=<span class="term-dim">'echo "funciona en mi máquina"'</span>`,
    `<span class="term-cmd">alias</span> deploy=<span class="term-dim">'echo "rezando..." && git push'</span>`,
    `<span class="term-cmd">alias</span> cafe=<span class="term-dim">'echo "☕ Cargando cafeína..."'</span>`,
  ].join("\n");
}

function cmdCurl(_state: TerminalState, args: string[]): string {
  const url = args[0]?.toLowerCase() || "";
  if (url.includes("abelsotillos") || url.includes("localhost")) {
    return `<span class="term-accent">&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;&lt;title&gt;Abel Sotillos&lt;/title&gt;&lt;/head&gt;
&lt;body&gt;
  &lt;h1&gt;Abel Sotillos Cuenca&lt;/h1&gt;
  &lt;p&gt;Full Stack Developer&lt;/p&gt;
  &lt;p&gt;Angular · Spring Boot · Docker · Astro&lt;/p&gt;
  &lt;a href="mailto:abelsotillos@gmail.com"&gt;Contacto&lt;/a&gt;
&lt;/body&gt;
&lt;/html&gt;</span>`;
  }
  return '<span class="term-error">curl: (6) Could not resolve host</span>';
}

function cmdMan(_state: TerminalState, args: string[]): string {
  const cmd = args[0]?.toLowerCase();
  const manPages: Record<string, string> = {
    ls:      "ls [-a] [ruta]      — Lista el contenido de un directorio.\n  -a  Muestra archivos ocultos (empiezan por .)",
    cd:      "cd [ruta]           — Cambia el directorio de trabajo.\n  cd ..  Subir un nivel\n  cd ~   Ir al home",
    cat:     "cat [archivo]       — Muestra el contenido de un archivo.",
    pwd:     "pwd                 — Muestra la ruta del directorio actual.",
    tree:    "tree [ruta]         — Muestra el árbol de directorios.",
    whoami:  "whoami              — Muestra el nombre de usuario actual.",
    date:    "date                — Muestra la fecha y hora del sistema.",
    uname:   "uname [-a]          — Información del sistema operativo.\n  -a  Muestra toda la información.",
    echo:    "echo [texto]        — Repite el texto proporcionado.",
    history: "history             — Muestra el historial de comandos.",
    uptime:  "uptime              — Muestra el tiempo de sesión.",
    head:    "head [-N] [archivo] — Muestra las primeras N líneas (por defecto 5).",
    tail:    "tail [-N] [archivo] — Muestra las últimas N líneas (por defecto 5).",
    grep:    "grep [patrón] [archivo] — Busca un patrón en un archivo y resalta coincidencias.",
    wc:      "wc [archivo]        — Cuenta líneas, palabras y caracteres.",
    find:    "find [nombre] [ruta] — Busca archivos por nombre en el árbol.",
    git:     "git [log|status|blame] — Comandos de git simulados.",
    alias:   "alias               — Muestra los alias configurados.",
    curl:    "curl [url]          — Hace una petición HTTP simulada.",
    clear:   "clear               — Limpia la terminal.",
    help:    "help                — Muestra todos los comandos disponibles.",
  };
  if (!cmd) return '<span class="term-error">man: ¿qué página de manual quieres?</span>';
  const page = manPages[cmd];
  if (!page) return `<span class="term-error">No hay entrada de manual para '${esc(cmd)}'</span>`;
  return `<span class="term-label">MANUAL: ${esc(cmd.toUpperCase())}</span>\n\n${page}`;
}

// ── Help (generated from all commands) ──

function cmdHelp(): string {
  return `
Comandos disponibles:

  <span class="term-cmd">ls</span> [-a]              Listar archivos
  <span class="term-cmd">cd</span> [dir]             Cambiar de directorio
  <span class="term-cmd">cat</span> [archivo]        Ver contenido de un archivo
  <span class="term-cmd">pwd</span>                  Directorio actual
  <span class="term-cmd">tree</span>                 Árbol de directorios
  <span class="term-cmd">whoami</span>               Usuario actual
  <span class="term-cmd">date</span>                 Fecha y hora
  <span class="term-cmd">uname</span> [-a]           Info del sistema
  <span class="term-cmd">echo</span> [texto]         Repetir texto
  <span class="term-cmd">history</span>              Historial de comandos
  <span class="term-cmd">uptime</span>               Tiempo de sesión
  <span class="term-cmd">head</span> [-N] [archivo]  Primeras N líneas
  <span class="term-cmd">tail</span> [-N] [archivo]  Últimas N líneas
  <span class="term-cmd">grep</span> [patrón] [arch] Buscar en archivo
  <span class="term-cmd">wc</span> [archivo]         Contar líneas/palabras
  <span class="term-cmd">find</span> [nombre]        Buscar archivos por nombre
  <span class="term-cmd">git</span> [log|status]     Comandos git simulados
  <span class="term-cmd">alias</span>                Ver alias configurados
  <span class="term-cmd">curl</span> [url]           Petición HTTP simulada
  <span class="term-cmd">man</span> [comando]        Manual de un comando
  <span class="term-cmd">clear</span>                Limpiar terminal
  <span class="term-cmd">help</span>                 Mostrar esta ayuda

<span class="term-dim">También hay easter eggs ocultos... ¿los encontrarás todos?</span>
`;
}

// ── Builtins registry ──

export function createBuiltins(state: TerminalState): Record<string, (args: string[]) => string> {
  return {
    ls:      (args) => cmdLs(state, args),
    cd:      (args) => cmdCd(state, args),
    cat:     (args) => cmdCat(state, args),
    pwd:     ()     => cmdPwd(state),
    whoami:  ()     => cmdWhoami(),
    date:    ()     => cmdDate(),
    uname:   (args) => cmdUname(state, args),
    tree:    (args) => cmdTree(state, args),
    echo:    (args) => cmdEcho(state, args),
    history: ()     => cmdHistory(state),
    uptime:  ()     => cmdUptime(state),
    head:    (args) => cmdHead(state, args),
    tail:    (args) => cmdTail(state, args),
    grep:    (args) => cmdGrep(state, args),
    wc:      (args) => cmdWc(state, args),
    find:    (args) => cmdFind(state, args),
    git:     (args) => cmdGit(state, args),
    alias:   ()     => cmdAlias(),
    curl:    (args) => cmdCurl(state, args),
    man:     (args) => cmdMan(state, args),
    touch:   ()     => cmdReadonly(),
    mkdir:   ()     => cmdReadonly(),
    rm:      ()     => cmdReadonly(),
    mv:      ()     => cmdReadonly(),
    cp:      ()     => cmdReadonly(),
    chmod:   ()     => cmdReadonly(),
    chown:   ()     => cmdReadonly(),
    help:    ()     => cmdHelp(),
    clear:   ()     => "__CLEAR__",
  };
}
