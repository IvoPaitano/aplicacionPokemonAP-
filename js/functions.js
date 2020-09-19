const searchByNameAndId = ()=>{
    const div = document.createElement('div');
    const form = document.createElement('form');
    const inputText = documet.createElement('input');
    const inputSubmit = documet.createElement('input');
    inputText.setAttribute('type','text');
    inputText.setAttribute('id','pokemon');
    inputSubmit.setAttribute('type','submit');

    div.appendChild(form.appendChild(inputText,inputSubmit));
    document.body.insertBefore(div);
}

const searchByType = (value) =>{

}
const searchByAbility = (value) => {

}
const searchByLimit = (value) =>{

}

module.exports = {
    searchByNameAndId,
    searchByType,
    searchByAbility,
    searchByLimit
}