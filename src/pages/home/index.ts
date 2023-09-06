import { state } from "../../state";
//La funcion initHomePage se exporta y recibe como parametro un elemento HTML
export function initHomePage(rootEl: HTMLElement) {
  //Crea un div
  const homePageEl = document.createElement("div");
  //Le agrega contenido al div
  /*
  -Todo el contenido dentro una section 
  -div con h1: Mis pendientes
  -Form:
  Con un div contenedor para la leyenda del input y el input
  -Un button
  -Fin del form
  -Fin de la section
  -Inicio de otra section que contendra a las cards
  
  */
  homePageEl.innerHTML = `
  <section class="content-section">
        <div class="title-container">
          <h1 class="title">Lista de pendientes</h1>
        </div>
        <form class="form">
          <div class="form__input-container">
            <legend class="form__legend">Agregar tarea</legend>
            <input name="task-text" type="text" class="form__input" />
          </div>
          <button class="form__button">Agregar</button>
        </form>
      </section>
    <section class="cards-section"></section>
    `;

  //Selecciona el sector donde iran las cartas y lo guarda en una constante

  const cardsSection = homePageEl.querySelector(".cards-section");

  //FUNCION QUE RENDERIZARA LAS TAREAS, recibe como parametro las tasks
  function renderTasks(tasks) {
    //Escribe sobre la section de cartas
    //recorro con un for las tasks
    //Crea un div y le asigna estilos
    //crea un todo-card
    //Le agrega los atributos

    cardsSection!["innerHTML"] = "";
    for (const cardItem of tasks) {
      const cardContainer = document.createElement("div");
      cardContainer.style.maxWidth = "316px";
      cardContainer.style.minWidth = "290px";
      cardContainer.style.width = "100%";
      cardContainer.style.flexGrow = "1";
      const card = document.createElement("todo-card");
      card.textContent = cardItem.text;
      card.setAttribute("checked", `${cardItem.checked}`);
      card.setAttribute("id", cardItem.id);
      card.addEventListener("change", (e: any) => {
        state.changeItemState(e.detail.id, JSON.parse(e.detail.value), "check");
      });
      card.addEventListener("delete", (e: any) => {
        state.changeItemState(e.detail.id, e.detail.value, "delete");
      });

      cardContainer.appendChild(card);
      cardsSection!.appendChild(cardContainer);
    }
  }
  //la funcion de renderizado de cards se ejecuta al subscribirse,
  //Pasandole como parametros las tareas disponibles mediante getEnableTasks
  state.subscribe(() => {
    renderTasks(state.getEnabledTasks());
  });
  //adjunta al root la homePageEl
  rootEl.appendChild(homePageEl);
  //Cuando escucha el evento submit del form agrega las tareas
  document.querySelector(".form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    state.addTask(crypto.randomUUID(), e.target!["task-text"].value);
    const form = document.querySelector(".form") as any;
    form.reset();
  });
}
