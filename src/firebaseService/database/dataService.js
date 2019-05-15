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
}

export default new dataService();