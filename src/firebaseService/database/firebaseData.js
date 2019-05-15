import dataService from '../../firebaseService/database/dataService'
import {encodeForFirebaseKey} from '../../common/firebaseKeyTransrater'

class firebaseData{

    constructor(){
        this.email='';
        this.data={};
    }

    setUser= (email) => {
        encodeForFirebaseKey(email)
        .then(s => {
            this.email= s;
            return dataService.getUserInfo(s);
        })
        .then(snapshot => {
            if(snapshot.val() != null){
                this.data= snapshot.val();
            }
        })
    }

    authLogin= (email) => {
        return new Promise((resolve, reject) => {
            encodeForFirebaseKey(email)
            .then(s => {
                console.log('authLogin'+s);
                this.email= s;
                return dataService.getUserInfo(s);
            })
            .then(snapshot => {
                if(snapshot.val() == null){
                    console.log('authLogin'+snapshot.val());
                    this.data= snapshot.val();
                    resolve(true);
                }else{
                    resolve(false);
                }
            })
        })
    }

    logout= () => {
        this.email='';
        this.data={};
    }
    
    sideMenu= () => {
        return new Promise((resolve, reject) => {
            dataService.getSideMenu(this.email)
            .then(snapshot => {
                resolve(snapshot.val());
            })
        })
    }

    dropMenu= (day) => {
        return new Promise((resolve, reject) => {
            dataService.getDropTime(day)
            .then(snapshot => {
                resolve(snapshot.val());
            })
        })
    }
}

export default new firebaseData();