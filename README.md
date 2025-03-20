# Proyecto: Gestión del Tiempo 
Este es un sistema para gestionar usuarios, hábitos y actividades con una API REST en **Node.js, Express y MongoDB**.

##  Tecnologías Utilizadas 
- **Backend:** Node.js, Express.js, Mongoose
- **Base de Datos:** MongoDB Atlas
- **Frontend:** ( DIEGO Especificar si usaron React, Vue, Angular, etc.)
- **Herramientas:** Postman, Thunder Client, GitHub

##  Instalación y Configuración 
1. **Clonar el repositorio:**
   ```sh
   git clone https://github.com/ernestojrm08/gestion-tiempo-backend.git
   cd proyecto

### instalar dependencias
npm install

#### ejecutar servidor

node src/app.js

### Funcionalidades Implementadas en el Sistema

1. **Crear nuevo usuario en el sistema**:
   - Endpoint: `POST /api/usuarios`
   - Descripción: crea nuevo usuario en el sistema

2. **Mostrar los usuarios creados-**:
   - Endpoint: `GET /api/usuarios`
   - Descripción: Obtiene lista de todos los usuarios creados


3. **Mostrar usuario por ID**:
   - Endpoint: `GET /api/usuario/:id`
   - Descripción: Obtiene la informacion de un usuario segun su id.

4. **Actualizar informacion de usuario**:
   - Endpoint: `PUT /api/usuarios/:id`
   - Descripción: Modifica informacion de un usuario especifico.

5. **ELiminar un usuario especifico del sistema**:
   - Endpoint: `DELETE /api/usuarios/:id`
   - Descripción: Elimina informacion de un usuario especifico.

6. **Añadir un hábito**
   - Endpoint: POST /api/habitos
   - Descripción: Crea un nuevo hábito asociado a un usuario.


7. **Obtener todos los hábitos**
   - Endpoint: GET /api/habitos
   - Descripción: Obtiene una lista de todos los hábitos registrados en el sistema.

8. **Buscar un hábito por ID**
   - Endpoint: GET /api/habitos/:id
   - Descripción: Obtiene la información de un hábito específico.

9. **Actualizar un hábito**
   - Endpoint: PUT /api/habitos/:id
   - Descripción: Modifica la información de un hábito específico.

10. **Eliminar un hábito**
   - Endpoint: DELETE /api/habitos/:id
   - Descripción: Elimina un hábito del sistema.

11. **Añadir una actividad**
   - Endpoint: POST /api/actividades
   - Descripción: Crea una nueva actividad asociada a un usuario y, opcionalmente, a un hábito.

12. **Obtener todas las actividades**
   - Endpoint: GET /api/actividades
   - Descripción: Obtiene una lista de todas las actividades registradas.

13. **Buscar una actividad por ID**
   - Endpoint: GET /api/actividades/:id
   - Descripción: Obtiene la información de una actividad específica.

14. **Actualizar una actividad**
   - Endpoint: PUT /api/actividades/:id
   - Descripción: Modifica la información de una actividad específica.

15. **Eliminar una actividad**
   - Endpoint: DELETE /api/actividades/:id
   - Descripción: Elimina una actividad del sistema.

16. **Mostrar actividades de una categoría específica por usuario**:
   - Endpoint: `GET /api/actividades/usuarios/:usuarioId/categorias/:categoria`
   - Descripción: Obtiene todas las actividades de un usuario filtradas por una categoría específica.

17. **Mostrar las últimas 5 actividades realizadas por un usuario**:
   - Endpoint: `GET /api/actividades/usuarios/:usuarioId/ultimas-actividades`
   - Descripción: Obtiene las últimas 5 actividades de un usuario, ordenadas por fecha de inicio.

18. **Buscar actividades realizadas por proyecto**:
   - Endpoint: `GET /api/actividades/proyectos/:proyecto/actividades`
   - Descripción: Obtiene todas las actividades asociadas a un proyecto específico.

19. **Mostrar actividades realizadas de un hábito en un rango de fechas**:
   - Endpoint: `GET /api/actividades/habitos/:habitoId/actividades/:fechaInicio/:fechaFin`
   - Descripción: Obtiene las actividades de un hábito específico dentro de un rango de fechas.

20. **Mostrar hábitos sin actividades realizadas**:
   - Endpoint: `GET /api/habitos/sin-actividades`
   - Descripción: Obtiene los hábitos que no tienen actividades asociadas.

21. **Buscar actividades realizadas por nombre**:
   - Endpoint: `GET /api/actividades/buscar/:nombre`
   - Descripción: Busca actividades cuyo nombre coincida parcialmente con un término de búsqueda.

22. **Calcular tiempo usado en cada categoría y proyecto**:
   - Endpoint: `GET /api/actividades/tiempo/:agruparPor`
   - Descripción: Calcula el tiempo total invertido en actividades, agrupado por categoría o proyecto.

23. **Mostrar actividades abiertas (sin fecha de finalización)**:
   - Endpoint: `GET /api/actividades/sin-finalizar`
   - Descripción: Obtiene las actividades que no tienen fecha de finalización.


