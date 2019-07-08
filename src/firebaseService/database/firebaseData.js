import dataService from "../../firebaseService/database/dataService";
import { encodeForFirebaseKey } from "../../common/firebaseKeyTransrater";

class firebaseData {
  constructor() {
    this.email = "";
    this.data = {};
  }

  setUser = email => {
    encodeForFirebaseKey(email)
      .then(s => {
        this.email = s;
        return dataService.getUserInfo(s);
      })
      .then(snapshot => {
        if (snapshot.val() != null) {
          this.data = snapshot.val();
        }
      });
  };

  authLogin = email => {
    return new Promise((resolve, reject) => {
      encodeForFirebaseKey(email)
        .then(s => {
          this.email = s;
          return dataService.getUserInfo(s);
        })
        .then(snapshot => {
          if (snapshot.val() == null) {
            this.data = snapshot.val();
            resolve(true);
          } else {
            resolve(false);
          }
        });
    });
  };

  logout = () => {
    this.email = "";
    this.data = {};
  };

  sideMenu = () => dataService.getSideMenu(this.email).then(snapshot => snapshot)
  // {   
  //   return new Promise((resolve, reject) => {
  //     dataService.getSideMenu(this.email).then(snapshot => {
  //       resolve(snapshot.val());
  //     });
  //   });
  // };

  dropMenu = day => {

    return new Promise((resolve, reject) => {
      dataService.getDropTime(day).then(snapshot => {
        resolve(snapshot.val());
      });
    });
  };

  beforeContent = () => {
    return new Promise((resolve, reject) => {
      dataService.getBeforeContent().then(snapshot => {
        resolve(snapshot.val());
      });
    });
  };

  afterContent = () => {
    return new Promise((resolve, reject) => {
      dataService.getAfterContent().then(snapshot => {
        resolve(snapshot.val());
      });
    });
  };

  areaMember = area => {
    return new Promise((resolve, reject) => {
      dataService.getAreaMemver(area).then(snapshot => {
        resolve(snapshot.val());
      });
    });
  };

  beforeReport = (date, member, area) => {
    for (let i = 0; i < member.length; i++) {
      dataService.setBeforeReport(date, member[i], area, i);
    }
  };

  afterReport = (date, member, area) => {
    for (let i = 0; i < member.length; i++) {
      dataService.setAfterReport(date, member[i], area, i);
    }
  };
}

export default new firebaseData();
