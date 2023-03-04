

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
      this.betPlan      = playMethodJsonData.betPlan;
      this.sameColumnSelection      = playMethodJsonData.sameColumnSelection;
      this.sectionTitle = playMethodJsonData.sectionTitle;
      this.howToPlay = playMethodJsonData.howToPlay;
      
      

    }


    getJsonObj() {

        return this.LotteryJsonObj;
    }
  

}



export {LotteryObj,PlayMethod}