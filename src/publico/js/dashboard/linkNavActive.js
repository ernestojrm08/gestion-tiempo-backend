document.addEventListener('DOMContentLoaded', function() {
    const path = window.location.pathname;
    const parts = path.split('/api/');

    if (parts.length > 1) {
      const segment = parts[1].split('/')[0];
      let activeId = '';

      switch (segment) {
        case 'usuarios':
          activeId = 'crud_user';
          break;
        case 'tareas':
          activeId = 'crud_tareas';
          break;
        case 'objetivos':
          activeId = 'crud_objetivos';
          break;
        case 'recordatorios':
          activeId = 'crud_recordatorio';
          break;
        case 'habitos':
          activeId = 'crud_habitos';
          break;
        case 'actividades':
          activeId = 'crud_actividades';
          break;
        default:
          break;
      }

      if (activeId) {
        const activeLink = document.getElementById(activeId);

      if (activeLink) {
        const parentLi = activeLink.parentNode; // Obtiene el elemento padre <li>
        if (parentLi && parentLi.tagName === 'LI') {

          parentLi .classList.add('active'); // Agrega una clase 'active' para resaltar el link
          // O puedes manipular el estilo directamente:
          // activeLink.style.fontWeight = 'bold';
          parentLi.style.color = 'white';
          parentLi.style.backgroundColor='#0056b3';
        }
      }
     }
    }
  });