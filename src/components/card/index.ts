//La card que aparece cuando se agrega una tarea

export function initCardComponent() {
  customElements.define(
    "todo-card",
    class CardComp extends HTMLElement {
      //Propiedades de la clase
      shadow;
      text: string;
      checked: boolean = false;
      id: string;
      //Constructor que llama a super y crea el shadow
      constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
      }

      /*   //ConnectedCallback se ejecuta al iniciar el componente.: 
      Setea las propiedades text, checked y id
         -Asigna a la propiedad text el valor de this.textContent 
         o avisa que no le pasaron texto.
         -Asigna a la propiedad checked el valor del atributo checked, 
         true si lo tiene, false si no lo tiene.
         -Asigna a la propiedad id lo que se le pasa por atributo.
         -Ejecuta render()
      */

      connectedCallback() {
        this.text = this.textContent || "No me pasaron texto";
        this.checked = JSON.parse(this.getAttribute("checked")!) ? true : false;
        this.id = this.getAttribute("id")!;

        this.render();
      }
      //
      render() {
        //Crea una hoja de estilos
        const style = document.createElement("style");
        //Le agrega contenido a la hoja de estilos
        style.innerText = `
        @import url('https://fonts.googleapis.com/css2?family=Inconsolata:wght@300&display=swap');
        *{
          box-sizing: border-box;
        }
        .card {
          padding: 22px 16px 12px 13px;
          width: 100%;
          border-radius: 4px;
          background: #fff599;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
        }
        .card-text {
          margin: 0;
          /*max-width: 250px;*/
          max-width: 86%;
          font-family: 'Inconsolata', monospace;
          font-size: 18px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }
        .line-through {
          text-decoration: line-through;
        }
        .buttons-container {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
        }
        .check-button {
          appearance: none;
          background-color: #fff;
          width: 20px;
          height: 20px;
          border: 2px solid rgb(93, 147, 13) ;
          background-color: #fff;
      
        }
        .check-button:checked {
          background-color: rgb(93, 147, 13);
        }
        .delete-button-container{
          margin-top: 12px;
          height: 21px;
          width: 21px;
        }
        .delete-button {
          display: none;
          padding: 0;
          border: none;
          background-color: inherit;
        }
        .show{
          display: block;
        }
        .delete-button:hover,
        .check-button:hover {
          scale: 1.2;
        }
        .delete-button__img {
          height: 21px;
          width: 21px;
          margin: 0;
        }
        
        .warning-container{
          display: none;
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: black;
          align-items: center;
          justify-content: center;
        }
        .warning {
          background-color: black;
          border-radius: 4px;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 22px 16px 22px 16px;
          width: 290px;
          height: 106px;
        }
        .warning__title {
          margin: 0;
          font-family: 'Inconsolata', monospace;
          font-size: 22px;
          font-style: normal;
          font-weight: 500;
          line-height: normal;
        }
        .warning__buttons-container {
          margin-top: 12px;
          width: 100%;
          display: flex;
          justify-content: space-around;
        }
        .cancel-btn,
        .confirm-btn {
          font-family: 'Inconsolata', monospace;
          font-size: 18px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          width: 90px;
          background-color: rgb(93, 147, 13);
          border: none;
          border-radius: 4px;
        }
        .cancel-btn:hover, 
        .confirm-btn:hover {
          scale: 1.1;
        }
        `;
        /*
        -Guarda en la constante deleteIMG al elemento de id delete
        -Crea un div y lo guarda en la constante card
        -Le agreda la clase card 
        -Le agrega contenido:
        p: clase card-text recibe this.text
        div class button-container que aloja a uun input checkbox de clase check-button y a otro div de clase delete button.
        El input asigna como atributo this.checked, si no tiene pasa un string vacio
        -div de clase delete-button-container que aloja un button de clase delete-button
        en vez de texto tiene una imagen.
        -        
        */
        const deleteIMG = document.querySelector("#delete");
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
          <p class="card-text">${this.text}</p>

          <div class="buttons-container">
            <input type="checkbox" class="check-button" ${
              this.checked ? "checked" : ""
            }/>
            <div class="delete-button-container">
              <button class="delete-button">
                <img src=${deleteIMG?.getAttribute("src")} />
              </button>
            </div>
          </div>

        <div class="warning-container">  
          <div class="warning">
            <h3 class="warning__title">¿Deseas borrar esta nota?</h3>
            <div class="warning__buttons-container">
              <button class="cancel-btn">Cancelar</button>
              <button class="confirm-btn">Borrar</button>
            </div>
          </div>
        </div>  
        `;

        //esto deberia funcionar siempre y cuando el state recarge el contenido,
        // ya que no hay ningun listener que le avise que tiene que cambiar de estilos
        if (this.checked) {
          card.querySelector(".card-text")?.classList.add("line-through");
        }

        this.shadow.appendChild(card);
        this.shadow.appendChild(style);
        this.buttons();
      }
      //FUNCION BUTTONS
      /*
      -Seleciona los diferentes elementos creados en el shadow
      -
      
      
      */
      buttons() {
        const card = this.shadow.querySelector(".card"); //contenedor principal
        const checkButton = this.shadow.querySelector(".check-button"); //checkbox
        const deleteButton = this.shadow.querySelector(".delete-button"); //boton de borrado
        const warning = this.shadow.querySelector(".warning-container"); //contenedor del warning
        const warningButtonCancel = this.shadow.querySelector(".cancel-btn"); //cancela
        const warningButtonConfirm = this.shadow.querySelector(".confirm-btn"); //confirma
        //Cuando se carga la pagina no se muestra la carta
        window.addEventListener("click", () => {
          card.style.border = "none";
          deleteButton.style.display = "none";
        });

        //Cuando hacemos click en la card se agrega un borde y muestra la opcion de borrarla
        card.addEventListener("click", () => {
          setTimeout(() => {
            card.style.border = "3px solid";
            deleteButton.style.display = "block";
          }, 1);
        });
        //custom event-
        checkButton.addEventListener("click", (e) => {
          const event = new CustomEvent("change", {
            detail: {
              id: this.id,
              value: e.target.checked,
            },
          });
          this.dispatchEvent(event);
        });
        //
        deleteButton.addEventListener("click", () => {
          warning.style.display = "flex";
        });
        //Cuando cancela
        warningButtonCancel.addEventListener("click", () => {
          warning.style.display = "none";
        });
        //Cuando confirma
        warningButtonConfirm.addEventListener("click", () => {
          warning.style.display = "none";
          console.log(
            "se borro: " + this.shadow.querySelector(".card-text").textContent
          );
          const event = new CustomEvent("delete", {
            detail: {
              id: this.id,
              value: true,
            },
          });
          this.dispatchEvent(event);
        });
      }
    }
  );
}
