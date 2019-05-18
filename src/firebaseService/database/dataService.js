import firebase from 'firebase/app';
import 'firebase/database';

class dataService{

    getUserInfo= (email) =>{
        if(typeof email != 'string'){
            return new Error('email이 문자열이 아닙니다.');
        }
        return firebase.database().ref('authEmail/'+email).once('value');
    }
    
    getSideMenu= (email)=>{
        if(typeof email != 'string'){
            return new Error('email이 문자열이 아닙니다.');
        }
        return firebase.database().ref('sideMenu/'+email).once('value');
    }

    getDropTime= (day)=>{
        if(typeof day != 'string'){
            return new Error('email이 문자열이 아닙니다.');
        }
        return firebase.database().ref('time/'+day).once('value');
    }

    getBeforeContent= () => {
        return firebase.database().ref('content/beforeColumns').once('value');
    }

    getAfterContent= () => {
        return firebase.database().ref('content/afterColumns').once('value');
    }

    getAreaMemver= (area) => {
        return firebase.database().ref('area/'+area).once('value');
    }
}

export default new dataService();