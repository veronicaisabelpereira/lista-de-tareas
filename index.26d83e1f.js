const e={data:{tasks:[{id:"123",text:"asdf",checked:!1}]},listeners:[],//METODOS //
//INIT:
/*
  FUNCION DE ESTE METODO: INICIALIZAR EL ESTADO TOMANDO LA DATA DEL LOCALSTORAGE
  -Muestra en consola que inicia estado
  -Guarda en la constante localData  
  lo que devuelve El método getItem() de la interfaz Storage :
  devuelve el valor de la clave cuyo nombre se le pasa por parámetro.
  -Ejecuta setState()pasandole localData parseado
  JSON.parse() retorna el objeto que se corresponde con el texto JSON entregado.
  */init(){console.log("State Init");let e=localStorage.getItem("save-state");this.setState(JSON.parse(e))},//GETSTATE: Retorna lo que se encuentra en data
getState(){return this.data},//GETENABLEDTASKS
/*FUNCION DEL METODO: DEVOLVER LAS TASKS QUE NO ESTAN CON DELETED
  -Guarda en la constante lastState lo que devuelve getState()
  -Entra en un condional:
  si lastState tiene tasks, sobre las mismas aplica el metodo filter
  y devuelve un nuevo array que contiene las tasks que no contenian deleted.
  Si no tiene tasks devuelve un array vacio
  
  */getEnabledTasks(){let e=this.getState();return e&&e.tasks?e.tasks.filter(e=>!e.deleted):[]},//ADDTASK
/**
   /FUNCION DEL METODO: AGREGAR TAREAS. 
   -Recibe por parametro un Id y un text
    
    -Pushea a las tasks del lastStage id, text y el checked en false
   
   */addTask(e,t){let n=this.getState();n.tasks.push({id:e,text:t,checked:!1}),this.setState(n)},//CHANGEITEMSTATE
/*
  /FUNCION DEL METODO: CAMBIA EL ESTADO DE LOS ITEMS EN EL STATE
  -Recibe por parametro un id, un booleano como newValue y una property que puede ser "check" o "delete"
  -Guarda en la constante lastState lo que devuelve getState()
  -Usa un find para recorrer las tasks, cuando se encuentra con una que coincide con el id que se le pasa, 
  la guarda en itemTochange (item a cambiar)
  -Entra en un condicional: 
  Si incluye la propiedad check se le asigna como valor el newvalue boleano pasado por parametro
  -Se actualiza estado con setState()pasandole como parametro el lastStage actualizado
  */changeItemState(e,t,n){let a=this.getState(),s=a.tasks.find(t=>t.id==e);"check"==n&&(s.checked=t),"delete"==n&&(s.deleted=t),this.setState(a)},//SETSTATE: Recibe nuevo estado,
/*
  FUNCION DEL METODO: ACTUALIZA EL ESTADO Y LO GUARDA EN EL LOCALSTORAGE
  -Recibe por parametro el nuevo estado
  -Lo guarda en data
  -Recorre y ejecuta los listeners
para que los componentes subscritos se enteren de los cambios del estado.
-El método setItem() de la interfaz Storage, 
cuando reciba una clave y un valor, añadirá estos al almacén, 
o actualizará el valor si la clave ya existe. Pasa como parametro a este metodo
el nuevo estado
  //*/setState(e){for(let t of(this.data=e,this.listeners))t();localStorage.setItem("save-state",JSON.stringify(e))},//SUBSCRIBE: Recibe una funcion y la pushea a los listeners.
//Cuando se realize un setState()(metodo que recorre y ejecuta los listeners)
//los componentes subscritos se enteraran de los cambios del estado
subscribe(e){this.listeners.push(e)},//CLEARCACHE
/*
  FUNCION DEL METODO: LIMPIAR EL LOCALSTORAGE CUANDO YA NO HAY MAS TAREAS
  -Entra en un condicional:
  Si el resultado de ejecutar getEnabledtask devuelve un array de length 0 (es decir esta vacio)
  avisa por consola que las tareas estan eliminadas
  limpia el localStorage
  y setea el estado con  una objeto task
  */clearCache(){0==this.getEnabledTasks().length&&(console.log("se borraron las tasks eliminadas"),localStorage.clear(),this.setState({tasks:[{id:"null",text:"Soy necesario para que el programa no se rompa :D",checked:!1,deleted:!0}]}))}};customElements.define("todo-card",class extends HTMLElement{//Constructor que llama a super y crea el shadow
constructor(){super(),this.checked=!1,this.shadow=this.attachShadow({mode:"open"})}/*   //ConnectedCallback se ejecuta al iniciar el componente.: 
      Setea las propiedades text, checked y id
         -Asigna a la propiedad text el valor de this.textContent 
         o avisa que no le pasaron texto.
         -Asigna a la propiedad checked el valor del atributo checked, 
         true si lo tiene, false si no lo tiene.
         -Asigna a la propiedad id lo que se le pasa por atributo.
         -Ejecuta render()
      */connectedCallback(){this.text=this.textContent||"No me pasaron texto",this.checked=!!JSON.parse(this.getAttribute("checked")),this.id=this.getAttribute("id"),this.render()}//
render(){//Crea una hoja de estilos
let e=document.createElement("style");//Le agrega contenido a la hoja de estilos
e.innerText=`
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
        `;/*
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
        */let t=document.querySelector("#delete"),n=document.createElement("div");n.classList.add("card"),n.innerHTML=`
          <p class="card-text">${this.text}</p>

          <div class="buttons-container">
            <input type="checkbox" class="check-button" ${this.checked?"checked":""}/>
            <div class="delete-button-container">
              <button class="delete-button">
                <img src=${t?.getAttribute("src")} />
              </button>
            </div>
          </div>

        <div class="warning-container">  
          <div class="warning">
            <h3 class="warning__title">\xbfDeseas borrar esta nota?</h3>
            <div class="warning__buttons-container">
              <button class="cancel-btn">Cancelar</button>
              <button class="confirm-btn">Borrar</button>
            </div>
          </div>
        </div>  
        `,this.checked&&n.querySelector(".card-text")?.classList.add("line-through"),this.shadow.appendChild(n),this.shadow.appendChild(e),this.buttons()}//FUNCION BUTTONS
/*
      -Seleciona los diferentes elementos creados en el shadow
      -
      
      
      */buttons(){let e=this.shadow.querySelector(".card"),t=this.shadow.querySelector(".check-button"),n=this.shadow.querySelector(".delete-button"),a=this.shadow.querySelector(".warning-container"),s=this.shadow.querySelector(".cancel-btn"),i=this.shadow.querySelector(".confirm-btn");//contenedor principal
//Cuando se carga la pagina no se muestra la carta
window.addEventListener("click",()=>{e.style.border="none",n.style.display="none"}),//Cuando hacemos click en la card se agrega un borde y muestra la opcion de borrarla
e.addEventListener("click",()=>{setTimeout(()=>{e.style.border="3px solid",n.style.display="block"},1)}),//custom event-
t.addEventListener("click",e=>{let t=new CustomEvent("change",{detail:{id:this.id,value:e.target.checked}});this.dispatchEvent(t)}),//
n.addEventListener("click",()=>{a.style.display="flex"}),//Cuando cancela
s.addEventListener("click",()=>{a.style.display="none"}),//Cuando confirma
i.addEventListener("click",()=>{a.style.display="none",console.log("se borro: "+this.shadow.querySelector(".card-text").textContent);let e=new CustomEvent("delete",{detail:{id:this.id,value:!0}});this.dispatchEvent(e)})}}),function(t){//Crea un div
let n=document.createElement("div");//Le agrega contenido al div
/*
  -Todo el contenido dentro una section 
  -div con h1: Mis pendientes
  -Form:
  Con un div contenedor para la leyenda del input y el input
  -Un button
  -Fin del form
  -Fin de la section
  -Inicio de otra section que contendra a las cards
  
  */n.innerHTML=`
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
    `;//Selecciona el sector donde iran las cartas y lo guarda en una constante
let a=n.querySelector(".cards-section");e.subscribe(()=>{!//FUNCION QUE RENDERIZARA LAS TAREAS, recibe como parametro las tasks
function(t){for(let n of(//Escribe sobre la section de cartas
//recorro con un for las tasks
//Crea un div y le asigna estilos
//crea un todo-card
//Le agrega los atributos
a.innerHTML="",t)){let t=document.createElement("div");t.style.maxWidth="316px",t.style.minWidth="290px",t.style.width="100%",t.style.flexGrow="1";let s=document.createElement("todo-card");s.textContent=n.text,s.setAttribute("checked",`${n.checked}`),s.setAttribute("id",n.id),s.addEventListener("change",t=>{e.changeItemState(t.detail.id,JSON.parse(t.detail.value),"check")}),s.addEventListener("delete",t=>{e.changeItemState(t.detail.id,t.detail.value,"delete")}),t.appendChild(s),a.appendChild(t)}}(e.getEnabledTasks())}),//adjunta al root la homePageEl
t.appendChild(n),//Cuando escucha el evento submit del form agrega las tareas
document.querySelector(".form")?.addEventListener("submit",t=>{t.preventDefault(),e.addTask(crypto.randomUUID(),t.target["task-text"].value);let n=document.querySelector(".form");n.reset()})}(document.querySelector(".root")),e.init(),e.clearCache();//# sourceMappingURL=index.26d83e1f.js.map

//# sourceMappingURL=index.26d83e1f.js.map
