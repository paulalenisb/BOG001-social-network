import './estilos-header-footer.scss';

export const headerTemplate = () => {
  const view = `
      <a href="#/home">
        <img src="./src/images/LogoLeratto_Hor_Blanco.png" class="logo-views" alt="Logo Leratto"/>
      </a>
      <nav id="nav-desktop">
      <!-- Intento hiperfallido
      <button class="btn active"><svg id="icon-home-desk" class="" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><style>.cls-1{stroke-miterlimit:10;}</style></defs><path id="HOME" class="cls-1" d="M96.14,43.66h0L56.35,3.86a9,9,0,0,0-12.7,0L3.89,43.63l0,0a9,9,0,0,0,6,15.3h1.86V88.26A10.53,10.53,0,0,0,22.19,98.77H37.76a2.86,2.86,0,0,0,2.86-2.86V73a4.8,4.8,0,0,1,4.79-4.79h9.18A4.81,4.81,0,0,1,59.39,73v23a2.85,2.85,0,0,0,2.85,2.86H77.81A10.53,10.53,0,0,0,88.32,88.26V59h1.47a9,9,0,0,0,6.35-15.32Z"/></svg></button>
      <button class="btn"><svg id="icon-filter-desk" class="" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><style>.cls-1{stroke-miterlimit:10;}</style></defs><g id="FILTROS"><path class="cls-1" d="M94.8,13.62H36.89a11.94,11.94,0,0,0-22.65,0h-9a3.8,3.8,0,0,0,0,7.6h9a11.94,11.94,0,0,0,22.65,0H94.8a3.8,3.8,0,0,0,0-7.6Z"/><path class="cls-1" d="M94.8,46.2h-9a11.94,11.94,0,0,0-22.65,0H5.2a3.8,3.8,0,0,0,0,7.6H63.11a11.94,11.94,0,0,0,22.65,0h9a3.8,3.8,0,0,0,0-7.6Z"/><path class="cls-1" d="M94.8,78.78H53.18a11.94,11.94,0,0,0-22.65,0H5.2a3.8,3.8,0,1,0,0,7.6H30.53a11.94,11.94,0,0,0,22.65,0H94.8a3.8,3.8,0,0,0,0-7.6Z"/></g></svg></button>
      <button class="btn"><svg id="icon-post-desk" class="" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><style>.cls-1{stroke-miterlimit:10;}</style></defs><g id="FORK"><polygon class="cls-1" points="53.78 98.19 53.78 98.19 53.78 98.17 53.78 98.17 53.78 98.19"/><path class="cls-1" d="M98.29,50.07A48.29,48.29,0,1,0,47,98.21l0-26a2.12,2.12,0,0,0-1.5-2A16.84,16.84,0,0,1,33.62,54.11V27.22c0-2.68,3.15-4.64,6-2.34a2.09,2.09,0,0,1,.76,1.63V48.62a2.13,2.13,0,0,0,2.13,2.13h2.45a2.13,2.13,0,0,0,2.14-2.13V27.22c0-2.68,3.16-4.64,6-2.34a2.12,2.12,0,0,1,.75,1.64v22.1a2.13,2.13,0,0,0,2.14,2.13h2.45a2.13,2.13,0,0,0,2.13-2.13V26.51a2.09,2.09,0,0,1,.76-1.63c2.81-2.3,6-.34,6,2.34V54.11a16.84,16.84,0,0,1-12,16.09,2.12,2.12,0,0,0-1.5,2V98.17A48.33,48.33,0,0,0,98.29,50.07Z"/></g></svg></button>
      <button class="btn"><svg id="icon-user-desk" class="" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><style>.cls-1{stroke-miterlimit:10;}</style></defs><g id="PERFIL"><path class="cls-1" d="M98.6,98.6A48.65,48.65,0,0,0,65.9,52.65a28.1,28.1,0,1,0-31.8,0A48.65,48.65,0,0,0,1.4,98.6Z"/></g></svg></button> -->

      <ul>
          <li class="nav-item-mobile">
            <a href="#/home">
              <svg id="icon-home-desk" class="btn" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><style>.cls-1{stroke-miterlimit:10;}</style></defs><path id="HOME" class="cls-1" d="M96.14,43.66h0L56.35,3.86a9,9,0,0,0-12.7,0L3.89,43.63l0,0a9,9,0,0,0,6,15.3h1.86V88.26A10.53,10.53,0,0,0,22.19,98.77H37.76a2.86,2.86,0,0,0,2.86-2.86V73a4.8,4.8,0,0,1,4.79-4.79h9.18A4.81,4.81,0,0,1,59.39,73v23a2.85,2.85,0,0,0,2.85,2.86H77.81A10.53,10.53,0,0,0,88.32,88.26V59h1.47a9,9,0,0,0,6.35-15.32Z"/></svg>
            </a>
            <p>Home</p>
          </li>
          <li class="nav-item-mobile">
            <a href="#/filtro">
            <svg id="icon-filter-desk" class="btn" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><style>.cls-1{stroke-miterlimit:10;}</style></defs><g id="FILTROS"><path class="cls-1" d="M94.8,13.62H36.89a11.94,11.94,0,0,0-22.65,0h-9a3.8,3.8,0,0,0,0,7.6h9a11.94,11.94,0,0,0,22.65,0H94.8a3.8,3.8,0,0,0,0-7.6Z"/><path class="cls-1" d="M94.8,46.2h-9a11.94,11.94,0,0,0-22.65,0H5.2a3.8,3.8,0,0,0,0,7.6H63.11a11.94,11.94,0,0,0,22.65,0h9a3.8,3.8,0,0,0,0-7.6Z"/><path class="cls-1" d="M94.8,78.78H53.18a11.94,11.94,0,0,0-22.65,0H5.2a3.8,3.8,0,1,0,0,7.6H30.53a11.94,11.94,0,0,0,22.65,0H94.8a3.8,3.8,0,0,0,0-7.6Z"/></g></svg>
            </a>
            <p>Filtro</p>
          </li>
          <li class="nav-item-mobile">
            <a href="#/post">
            <svg id="icon-post-desk" class="btn" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><style>.cls-1{stroke-miterlimit:10;}</style></defs><g id="FORK"><polygon class="cls-1" points="53.78 98.19 53.78 98.19 53.78 98.17 53.78 98.17 53.78 98.19"/><path class="cls-1" d="M98.29,50.07A48.29,48.29,0,1,0,47,98.21l0-26a2.12,2.12,0,0,0-1.5-2A16.84,16.84,0,0,1,33.62,54.11V27.22c0-2.68,3.15-4.64,6-2.34a2.09,2.09,0,0,1,.76,1.63V48.62a2.13,2.13,0,0,0,2.13,2.13h2.45a2.13,2.13,0,0,0,2.14-2.13V27.22c0-2.68,3.16-4.64,6-2.34a2.12,2.12,0,0,1,.75,1.64v22.1a2.13,2.13,0,0,0,2.14,2.13h2.45a2.13,2.13,0,0,0,2.13-2.13V26.51a2.09,2.09,0,0,1,.76-1.63c2.81-2.3,6-.34,6,2.34V54.11a16.84,16.84,0,0,1-12,16.09,2.12,2.12,0,0,0-1.5,2V98.17A48.33,48.33,0,0,0,98.29,50.07Z"/></g></svg>
            </a>
            <p>Reseña</p>
          </li>
          <li class="nav-item-mobile">
            <a href="#/profile">
            <svg id="icon-user-desk" class="btn" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><style>.cls-1{stroke-miterlimit:10;}</style></defs><g id="PERFIL"><path class="cls-1" d="M98.6,98.6A48.65,48.65,0,0,0,65.9,52.65a28.1,28.1,0,1,0-31.8,0A48.65,48.65,0,0,0,1.4,98.6Z"/></g></svg>
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
