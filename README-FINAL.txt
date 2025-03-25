#  Proyecto Gestión del Tiempo  

Este sistema permite la gestión de usuarios, hábitos y actividades con autenticación mediante JWT y permisos por roles.

---

## ** 1. Requisitos Previos**
Antes de comenzar, asegúrate de tener instalado lo siguiente:

- **Node.js** (versión recomendada 16 o superior)
- **MongoDB Atlas** (se necesita una URI de conexión)
- **Git** (opcional, si quieres clonar el repositorio)

---

## ** 2. Clonar el Proyecto e Instalar Dependencias**
Ejecuta los siguientes comandos en la terminal:

```sh
# Clonar el repositorio
git clone https://github.com/ernestojrm08/gestion-tiempo-backend.git

# Acceder al proyecto
cd gestion-tiempo

# Instalar dependencias
npm install


//// CONFIGURAR ARCHIVO .ENV ////

El archivo .env NO está en el repositorio por seguridad. Debes crearlo manualmente en la raíz del proyecto.
Crea un archivo .env y pega este contenido:
PORT=5000
MONGO_URI=mongodb+srv://admin:admin1234@appgestion-tiempo.hfdni.mongodb.net/?retryWrites=true&w=majority&appName=appGestion-tiempo
JWT_SECRET=gestion-tiempo
JWT_EXPIRES_IN=1h

-  Una vez configurado, ejecuta:
 *  Npm run dev 

- Si todo funciona correctamente, se mostrará en consola:  
 * Servidor corriendo en http://localhost:5000

 - Si deseas inicializar la base de datos con usuarios base, ejecuta:
  * node src/migraciones.js

7. Endpoints Principales

            Usuarios
Método	     Endpoint	              ##  Descripción
POST	    /api/usuarios	          ## Crear usuario
GET	       /api/usuarios	         ## Obtener todos los usuarios
GET	     /api/usuarios/:id	          ## Obtener usuario por ID
PUT	      /api/usuarios/:id	        ## Actualizar usuario
DELETE	  /api/usuarios/:id	       ## Eliminar usuario

Autenticación
Método	    Endpoint	                   ## Descripción
POST	 /api/auth/login	        ## Iniciar sesión y obtener JWT
POST	 /api/auth/register	       ## Registrar usuario



