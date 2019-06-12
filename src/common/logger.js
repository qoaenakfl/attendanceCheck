
const dev= true;

const logger = (message) => {
    if(dev){
        console.log(message);
    }
};

export default logger;