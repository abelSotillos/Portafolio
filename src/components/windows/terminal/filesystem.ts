// filesystem.ts — Simulated filesystem tree + path utilities

export type FSNode =
  | { type: "dir"; children: Record<string, FSNode> }
  | { type: "file"; content: string };

export function dir(children: Record<string, FSNode>): FSNode {
  return { type: "dir", children };
}
export function file(content: string): FSNode {
  return { type: "file", content };
}

export const fs: FSNode = dir({
  home: dir({
    abel: dir({
      "2020-2021": dir({
        "README.md": file(
          "# Técnico en Sistemas Microinformáticos y Redes\n" +
          "IES Virgen del Espino · Soria\n\n" +
          "Primer contacto con redes, hardware y administración de sistemas.\n" +
          "Aquí empezó todo."
        ),
        "notas.txt": file(
          "- Aprobé todo a la primera, menos REDES... eso me costó sudor.\n" +
          "- Descubrí que me gustaba más el software que el hardware.\n" +
          "- Mi primer 'Hola Mundo' fue en Python. Mágico."
        ),
      }),
      "2021-2022": dir({
        "README.md": file(
          "# TS Administración de Sistemas + TS Desarrollo de Aplicaciones Web\n" +
          "GSD Gredos San Diego · Buitrago de Lozoya, Madrid\n\n" +
          "Dos grados superiores en paralelo. Año intenso.\n" +
          "Aquí aprendí Java, SQL, Angular y a sobrevivir con 4h de sueño."
        ),
        "notas.txt": file(
          "- Dos ciclos a la vez fue una locura, pero mereció la pena.\n" +
          "- Primer proyecto serio con Angular. Me enamoré del framework.\n" +
          "- El café se convirtió en mi mejor amigo."
        ),
        "primer-proyecto.txt": file(
          "Mi primer proyecto 'de verdad': una app de gestión de inventario.\n" +
          "Angular + Node.js + MySQL.\n" +
          "El código era horrible pero funcionaba. Y eso es lo que importa.\n" +
          "...¿verdad?"
        ),
      }),
      "2023": dir({
        "README.md": file(
          "# Primer año en MELIT TECHNOLOGIES\n" +
          "Enero 2023 — Diciembre 2023\n\n" +
          "Mi primer trabajo como desarrollador. Nervios del primer día.\n" +
          "Proyecto: Intelit Gestor Documental."
        ),
        "intelit-gestor-documental.txt": file(
          "Plataforma de gestión documental multitenant estilo Google Drive.\n\n" +
          "Stack: Angular · Angular Material · Bootstrap · OAuth 2.0\n" +
          "Rol: Frontend Developer\n\n" +
          "Lo que aprendí:\n" +
          "- Arquitectura de permisos por tenant\n" +
          "- OAuth 2.0 de verdad (no el de los tutoriales)\n" +
          "- Que 'multitenant' suena fácil hasta que lo implementas"
        ),
        "notas.txt": file(
          "- Síndrome del impostor nivel máximo los primeros meses.\n" +
          "- Mi primer merge a producción: las manos me temblaban.\n" +
          "- Descubrí que StackOverflow no tiene TODAS las respuestas."
        ),
      }),
      "2024": dir({
        "README.md": file(
          "# Segundo año en MELIT TECHNOLOGIES\n" +
          "Enero 2024 — Diciembre 2024\n\n" +
          "Año de crecimiento brutal. Tres proyectos distintos.\n" +
          "Pasé de 'el junior' a tener voz en las decisiones técnicas."
        ),
        "canal-denuncias-saas.txt": file(
          "Canal de Denuncias SaaS — Feb 2024 a Sep 2024\n\n" +
          "Stack: Angular · Spring Boot · MySQL · GDPR\n\n" +
          "Cumplimiento EU Whistleblowing Directive.\n" +
          "Cifrado de datos sensibles, gestión de sesiones segura, Redsys.\n\n" +
          "La parte de GDPR me hizo leer más documentos legales que código."
        ),
        "el-encinar.txt": file(
          "El Encinar de Humienta — Oct 2024 a Nov 2024\n\n" +
          "Stack: Angular 18 · Spring Boot · PostgreSQL\n\n" +
          "Migración de AngularJS a Angular 18 y de microservicios a monolito.\n" +
          "Sí, has leído bien: de micro a mono. A veces menos es más."
        ),
        "saas-reservas.txt": file(
          "SaaS Gestión de Reservas White Label — Dic 2024 a Sep 2025\n\n" +
          "Stack: Angular · Angular Material · Spring Boot · CI/CD\n\n" +
          "Plataforma multitenant de reservas con Redsys y Google Calendar API.\n" +
          "Mi primer pipeline CI/CD de verdad con Bitbucket Pipelines."
        ),
        "notas.txt": file(
          "- Primer año sin sentirme junior. Gran sensación.\n" +
          "- Aprendí que migrar AngularJS es un deporte de riesgo.\n" +
          "- El café ya no era suficiente. Pasé al mate."
        ),
      }),
      "2025": dir({
        "README.md": file(
          "# Tercer año en MELIT TECHNOLOGIES\n" +
          "Enero 2025 — Actualidad\n\n" +
          "Proyecto actual: Inmobiliaria Pomora.\n" +
          "Y este portafolio, que por fin me decidí a hacer."
        ),
        "inmobiliaria-pomora.txt": file(
          "Inmobiliaria Pomora — Oct 2025 a Actualidad\n\n" +
          "Stack: Spring Boot · JSP · Java · MySQL\n\n" +
          "Plataforma de gestión inmobiliaria.\n" +
          "Integración con Mailjet y James Edition API.\n" +
          "JSP en 2025... sí, existe. Y funciona."
        ),
        "este-portafolio.txt": file(
          "Este portafolio que estás viendo ahora mismo.\n\n" +
          "Stack: Astro · TypeScript · CSS puro\n\n" +
          "Estilo escritorio Windows porque... ¿por qué no?\n" +
          "Si estás leyendo esto desde la terminal, enhorabuena.\n" +
          "Eres de los míos."
        ),
        "notas.txt": file(
          "- Por fin hice un portafolio. Solo me costó 3 años decidirme.\n" +
          "- JSP no estaba en mis planes de 2025, pero aquí estamos.\n" +
          "- Nota mental: no dejar el portafolio para 'la semana que viene'."
        ),
      }),
      "skills.txt": file(
        "=== STACK TECNOLÓGICO ===\n\n" +
        "Frontend:  Angular · TypeScript · HTML/CSS · Astro\n" +
        "Backend:   Spring Boot · Java · Node.js\n" +
        "BBDD:      MySQL · PostgreSQL · H2\n" +
        "DevOps:    Docker · CI/CD · Git\n" +
        "Cloud:     Linux · Nginx · VPS\n" +
        "Otros:     OAuth 2.0 · REST APIs · Redsys"
      ),
      "contacto.txt": file(
        "Email:    abelsotillos@gmail.com\n" +
        "GitHub:   github.com/abelsotillos\n" +
        "LinkedIn: linkedin.com/in/abelsotillos\n" +
        "Web:      abelsotillos.com"
      ),
      ".secreto": file(
        "🦊 Has encontrado el easter egg secreto.\n\n" +
        "Si has llegado hasta aquí es que sabes lo que haces.\n" +
        "O que has probado 'ls -a' por costumbre. En cualquier caso, respeto.\n\n" +
        "Fun facts:\n" +
        "- Este portafolio se hizo con mucho café y algo de caos.\n" +
        "- El zorro del fondo se llama Vulpi.\n" +
        "- Mi primer ordenador fue un Pentium 4 con 512MB de RAM.\n" +
        "- Una vez hice un rm -rf / en un servidor de prácticas. Aprendí rápido."
      ),
      ".bash_history": file(
        "git push --force  # nunca más\n" +
        "sudo rm -rf node_modules\n" +
        "npm install\n" +
        "npm install\n" +
        "npm install  # ¿por qué no funciona?\n" +
        "clear\n" +
        "git blame  # buscando al culpable (era yo)\n" +
        "man woman  # No manual entry for woman\n" +
        "exit  # a dormir que mañana hay daily"
      ),
    }),
  }),
});

export function resolve(path: string, cwd: string): string {
  let parts: string[];
  if (path.startsWith("/")) {
    parts = path.split("/").filter(Boolean);
  } else {
    parts = [...cwd.split("/").filter(Boolean), ...path.split("/").filter(Boolean)];
  }
  const resolved: string[] = [];
  for (const p of parts) {
    if (p === ".") continue;
    if (p === "..") { resolved.pop(); continue; }
    resolved.push(p);
  }
  return "/" + resolved.join("/");
}

export function getNode(path: string): FSNode | null {
  const parts = path.split("/").filter(Boolean);
  let node: FSNode = fs;
  for (const p of parts) {
    if (node.type !== "dir" || !(p in node.children)) return null;
    node = node.children[p];
  }
  return node;
}
