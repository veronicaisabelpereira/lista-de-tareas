const state = {
  data: {
    tasks: [{ id: "123", text: "asdf", checked: false }],
  },
  listeners: [],
  //METODOS //
  //INIT:
  /*
  FUNCION DE ESTE METODO: INICIALIZAR EL ESTADO TOMANDO LA DATA DEL LOCALSTORAGE
  -Muestra en consola que inicia estado
  -Guarda en la constante localData  
  lo que devuelve El método getItem() de la interfaz Storage :
  devuelve el valor de la clave cuyo nombre se le pasa por parámetro.
  -Ejecuta setState()pasandole localData parseado
  JSON.parse() retorna el objeto que se corresponde con el texto JSON entregado.
  */
  init() {
    console.log("State Init");
    const localData = localStorage.getItem("save-state");
    this.setState(JSON.parse(localData!));
  },
  //GETSTATE: Retorna lo que se encuentra en data
  getState() {
    return this.data;
  },
  //GETENABLEDTASKS
  /*FUNCION DEL METODO: DEVOLVER LAS TASKS QUE NO ESTAN CON DELETED
  -Guarda en la constante lastState lo que devuelve getState()
  -Entra en un condional:
  si lastState tiene tasks, sobre las mismas aplica el metodo filter
  y devuelve un nuevo array que contiene las tasks que no contenian deleted.
  Si no tiene tasks devuelve un array vacio
  
  */
  getEnabledTasks() {
    const lastState = this.getState();
    if (lastState && lastState.tasks) {
      return lastState.tasks.filter((t) => !t.deleted);
    } else {
      return [];
    }
  },
  //ADDTASK
  /**
   /FUNCION DEL METODO: AGREGAR TAREAS. 
   -Recibe por parametro un Id y un text
    
    -Pushea a las tasks del lastStage id, text y el checked en false
   
   */
  addTask(id: string, text: string) {
    const lastState = this.getState();
    lastState.tasks.push({ id, text, checked: false });
    this.setState(lastState);
  },
  //CHANGEITEMSTATE
  /*
  /FUNCION DEL METODO: CAMBIA EL ESTADO DE LOS ITEMS EN EL STATE
  -Recibe por parametro un id, un booleano como newValue y una property que puede ser "check" o "delete"
  -Guarda en la constante lastState lo que devuelve getState()
  -Usa un find para recorrer las tasks, cuando se encuentra con una que coincide con el id que se le pasa, 
  la guarda en itemTochange (item a cambiar)
  -Entra en un condicional: 
  Si incluye la propiedad check se le asigna como valor el newvalue boleano pasado por parametro
  -Se actualiza estado con setState()pasandole como parametro el lastStage actualizado
  */
  changeItemState(id: string, newValue: boolean, property: "check" | "delete") {
    const lastState = this.getState();
    const itemToChange = lastState.tasks.find((t) => t.id == id);
    if (property == "check") {
      itemToChange.checked = newValue;
    }
    if (property == "delete") {
      itemToChange.deleted = newValue;
    }
    this.setState(lastState);
  },
  //SETSTATE: Recibe nuevo estado,
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
  //*/

  setState(newState) {
    this.data = newState;

    for (const cb of this.listeners) {
      cb();
    }
    localStorage.setItem("save-state", JSON.stringify(newState));
  },
  //SUBSCRIBE: Recibe una funcion y la pushea a los listeners.
  //Cuando se realize un setState()(metodo que recorre y ejecuta los listeners)
  //los componentes subscritos se enteraran de los cambios del estado
  subscribe(callback: (any) => void) {
    this.listeners.push(callback);
  },
  //CLEARCACHE
  /*
  FUNCION DEL METODO: LIMPIAR EL LOCALSTORAGE CUANDO YA NO HAY MAS TAREAS
  -Entra en un condicional:
  Si el resultado de ejecutar getEnabledtask devuelve un array de length 0 (es decir esta vacio)
  avisa por consola que las tareas estan eliminadas
  limpia el localStorage
  y setea el estado con  una objeto task
  */
  clearCache() {
    if (this.getEnabledTasks().length == 0) {
      console.log("se borraron las tasks eliminadas");
      localStorage.clear();
      this.setState({
        tasks: [
          {
            id: "null",
            text: "Soy necesario para que el programa no se rompa :D",
            checked: false,
            deleted: true,
          },
        ],
      });
      // console.log(this.data);
    }
  },
};
//Exporta el estado para poder ser utilizado en otras partes
export { state };
