

class GameObj {

   
    constructor(game5d_data_model) {

      this.gameJsonObj = game5d_data_model;
      
    }


    getJsonObj() {

        return this.gameJsonObj;
    }
  

}

export {GameObj}