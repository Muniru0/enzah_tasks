

class LotteryObj {

   
    constructor(game5d_data_model) {

      this.LotteryJsonObj = game5d_data_model;
      
    }


    getJsonObj() {

        return this.LotteryJsonObj;
    }
  

}


class PlayMethod {

   
    constructor(playMethodJsonData) {

      this.playMethodName = playMethodJsonData.playMethodName;
      this.numberOfRows = playMethodJsonData.numberOfRows;
      this.sampleSpace    = playMethodJsonData.sampleSpace;
      this.minSelectionPerRow      = playMethodJsonData.minSelectionPerRow;
      this.sectionTitle = playMethodJsonData.sectionTitle;
      this.howToPlay = playMethodJsonData.howToPlay;
      
      

    }


    getJsonObj() {

        return this.LotteryJsonObj;
    }
  

}



export {LotteryObj,PlayMethod}