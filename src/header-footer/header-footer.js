import './estilos-header-footer.scss';

export const headerTemplate = () => {
  const view = `
      <a href="#/home">
        <img src="./src/images/LogoLeratto_Hor_Blanco.png" class="logo-views" alt="Leratto"/>
      </a>

      <nav id="nav-desktop">
        <ul>
          <li class="nav-item-mobile">
            <a href="#/home">
              <img src="./src/images/icons/Icono_Casa_bln.png" alt="Ícono Home">
            </a>
            <p>Home</p>
          </li>
          <li class="nav-item-mobile">
            <a href="#/filtro">
              <img src="./src/images/icons/Icono_Filtro_bln.png" alt="Ícono Filtro">
            </a>
            <p>Filtro</p>
          </li>
          <li class="nav-item-mobile">
            <a href="#/post">
              <img src="./src/images/icons/Icono_Tenedor_Amr.png" alt="Ícono Reseña">
            </a>
            <p>Reseña</p>
          </li>
          <li class="nav-item-mobile">
            <a href="#/profile">
              <img src="./src/images/icons/Icono_User_bln.png" alt="Ícono Perfil">
            </a>
            <p>Perfil</p>
          </li>
        </ul>
      </nav>
      <!-- Button dark mode -->
      <div class="btn-dark-mode">
        <button class="switch" id="switch">
          <span><i class="fas fa-sun"></i></span>
          <span><i class="fas fa-moon"></i></span>
        </button>
      </div>
    
    `;

  const container = document.createElement('header');
  container.innerHTML = view;

  return container;
};

export const footerTemplate = () => {
  const view = `
  <div class ="total-footer-container">
    <nav id="nav-mobile-tablet">
      <ul>
        <li class="nav-item-mobile">
          <a href="#/home">
            <img src="./src/images/icons/Icono_Casa_bln.png" alt="Ícono Home">
          </a>
          <p>Home</p>
        </li>
        <li class="nav-item-mobile">
          <a href="#/filtro">
            <img src="./src/images/icons/Icono_Filtro_bln.png" alt="Ícono Filtro">
          </a>
          <p>Filtro</p>
        </li>
        <li class="nav-item-mobile">
          <a href="#/post">
            <img src="./src/images/icons/Icono_Tenedor_Amr.png" alt="Ícono Reseña">
          </a>
          <p>Reseña</p>
        </li>
        <li class="nav-item-mobile">
          <a href="#/profile">
            <img src="./src/images/icons/Icono_User_bln.png" alt="Ícono Perfil">
          </a>
          <p>Perfil</p>
        </li>
      </ul>
    </nav>
  <div class="footer-container">
    <p>Hecho con mucha hambre ♡ por Pau, Tati y Ana</p>
  </div>
</div>
    `;

  const container = document.createElement('footer');
  container.innerHTML = view;

  return container;
};