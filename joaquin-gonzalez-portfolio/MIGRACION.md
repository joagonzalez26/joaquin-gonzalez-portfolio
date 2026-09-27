# Portfolio — export para Vercel

Copia del commit aprobado `96b68c6c962d5a7569b1e177b5fcd6f614e37086`.

`app/page.tsx`, `app/globals.css` y todos los archivos de `public/` se conservan byte por byte. No se modificaron textos, imágenes, secciones, animaciones ni responsive.

Los únicos ajustes de ejecución son scripts de Next.js para Vercel, configuración de TypeScript, vercel.json y URLs canónicas/sociales derivadas del dominio del despliegue. No se requieren variables secretas. Los archivos de infraestructura originales de Sites se preservan como referencia, sin ejecutarse en Vercel.

## Despliegue
1. Crear el repositorio `joaquin-gonzalez-portfolio` y subir esta carpeta (sin node_modules ni .next).
2. Importarlo en Vercel, usando Next.js y el nombre `joaquin-gonzalez`.
3. Vercel ejecutará `npm ci` y `npm run build:vercel`.
4. Si el subdominio está ocupado, usar `joaquingonzalez` o `joaquin-gonzalez-portfolio`.

Para ejecutar localmente: `npm ci` y `npm run dev:vercel`.
