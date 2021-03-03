import nameData from '../db/name-data';

function getRandom(items: string[]) {
    return items[Math.floor(Math.random()*items.length)];
}

const authorizeUser = () => {

    const userName = localStorage.getItem('name');
    if (!!userName) {
        return null;
    }

    const namesObj: any  = {
        firstName: '',
        lastNamePrefix: '',
        lastNameSuffix: ''
    };
    Object.keys(namesObj)
        .forEach((name) => {
            namesObj[name] = getRandom(nameData[name]);
    });

    const generatedName = namesObj.firstName + ' ' + namesObj.lastNamePrefix + namesObj.lastNameSuffix;
    localStorage.setItem('name', generatedName);
}

export default authorizeUser;