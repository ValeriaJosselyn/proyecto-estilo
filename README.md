# Styletest : clasificador de estilos 

## ⚙️ Instrucciones de Instalación y Ejecución

Este proyecto puede visualizarse de dos formas: directamente en la web (recomendado) o en un entorno local de desarrollo.

###  Ejecución en la Web (Recomendado)
Para probar la aplicación funcionando, simplemente visita el siguiente enlace. No se requiere instalación:
*(https://valeriajosselyn.github.io/proyecto-estilo/)**

---

### 💻 Opción B: Ejecución Local (

Si deseas descargar y ejecutar el código en tu propia máquina, sigue estos pasos.

**Prerrequisitos:**
* Navegador web moderno (Chrome, Firefox, Edge).
* Un servidor local (debido a políticas de seguridad CORS, el modelo no cargará si abres el archivo HTML haciendo doble clic).

**Pasos:**

1.  **Clonar el repositorio:**
    Abre tu terminal y ejecuta:
    ```bash
    git clone [https://github.com/valeriajosselyn/proyecto-estilo.git](https://github.com/valeriajosselyn/proyecto-estilo.git)
    cd proyecto-estilo
    ```

2.  **Iniciar un servidor local:**
    El proyecto necesita servirse a través de HTTP/HTTPS para cargar los archivos JSON y BIN del modelo. Puedes usar cualquiera de estas opciones:

    * **Opción 1: VS Code Live Server (Más fácil)**
        Si usas Visual Studio Code, instala la extensión "Live Server", abre el archivo `index.html` y haz clic en el botón "Go Live" en la esquina inferior derecha.

    * **Opción 2: Python**
        Si tienes Python instalado, ejecuta en la terminal dentro de la carpeta del proyecto:
        ```bash
        python -m http.server 8000
        ```
        Luego abre tu navegador en: `http://localhost:8000`

3.  **Permisos:**
    Al abrir la página, el navegador te solicitará permiso para acceder a la cámara web. Debes hacer clic en "Permitir" para que el modelo funcione.
