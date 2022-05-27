//ler os números digitados e fazer a conversão.. Posivel
//Opções de escolhe diversas grandezas em um menu...
//Trazer as unidade da grandeza escolhida, SI e a mais usada na prática
const keybord = document.querySelector('.calc_keyboard');
const keyModels = document.querySelector('.models .keyboard_key');
const input = document.querySelector('.first_value input');
const secondInput = document.querySelector('.second_value input');
const firstSelect = document.querySelector('.greatness #first');
const secondSelect = document.querySelector('.greatness #second');

const keys = [
    {view:"CE",action:clear,type:'function'},
    {view:"DEL",action:remove,type:'function'},
    {view:".",action:".",type:'signal'},
    {view:"7",action:"7",type:'number'},
    {view:"8",action:"8",type:'number'},
    {view:"9",action:"9",type:'number'},
    {view:"4",action:"4",type:'number'},
    {view:"5",action:"5",type:'number'},
    {view:"6",action:"6",type:'number'},
    {view:"1",action:"1",type:'number'},
    {view:"2",action:"2",type:'number'},
    {view:"3",action:"3",type:'number'},
    {view:"0",action:"0",type:'number'},
    {view:"00",action:"00",type:'number'}
];

const greatnessList = {
    lengthUnit:{
        type:'length',
        units:[
            {name:'Quilomentro',exp:3},
            {name:'Hectometro',exp:2},
            {name:'Decametro',exp:1},
            {name:'mentro',exp:0},
            {name:'decimentro',exp:-1},
            {name:'centimentro',exp:-2},
            {name:'milimentro',exp:-3}
        ]
    },
    areaUnit:{
        type:'area',
        units:[
            {name:'Quilomentro ao quadrado',exp:3},
            {name:'Hectometro ao quadrado',exp:2},
            {name:'Decametro ao quadrado',exp:1},
            {name:'mentro ao quadrado',exp:0},
            {name:'decimentro ao quadrado',exp:-1},
            {name:'centimentro ao quadrado',exp:-2},
            {name:'milimentro ao quadrado',exp:-3}
        ]
    },
    volumeUnit:{
        type:'volume',
        units:[
            {name:'Quilomentro ao Cubo',exp:3},
            {name:'Hectometro ao Cubo',exp:2},
            {name:'Decametro ao Cubo',exp:1},
            {name:'mentro ao Cubo',exp:0},
            {name:'decimentro ao Cubo',exp:-1},
            {name:'centimentro ao Cubo',exp:-2},
            {name:'milimentro ao Cubo',exp:-3}
        ]
    },
}

let greatnessChosen = greatnessList.lengthUnit;

greatnessChosen.units.forEach(unit=>{
    [firstSelect ,secondSelect].forEach(select=>{
        select.innerHTML += `
            <option value=${unit.exp}>${unit.name}</option>
        `;
    })
})

firstSelect.addEventListener('change',()=>{
    handleConvert(greatnessChosen.type)
})
secondSelect.addEventListener('change',()=>{
    handleConvert(greatnessChosen.type)
})

keys.forEach(key=>{
    const keyItem = keyModels.cloneNode(true);
    keyItem.innerHTML = key.view;
    
    keyItem.addEventListener('click',()=>handleKeyOnclick(key))
    
    keybord.append(keyItem);
});



function handleKeyOnclick({type,action}){
    if (type === 'number' || type == 'signal') {
        input.value += action;
        lengthCoverting()
    } else if(type === 'function'){
        action();
    }
}

function handleConvert(greatnessType) {
    switch (greatnessType) {
        case 'length':
            lengthCoverting();
            break;
        case 'area':
            areaCoverting();
            break;
        case 'volume':
            volumeCoverting();
            break;
        default:
            alert("ERRO!")
            break;
    }
}

function clear(){
    input.value = input.value.slice(0,-1)
    lengthCoverting()
}
function remove(){
    input.value = '';
    secondInput.value = '';
}

function lengthCoverting(){
    const expo = Math.pow(10,firstSelect.value - secondSelect.value);
    secondInput.value = (input.value*expo);
}

function areaCoverting(){
    const expo = Math.pow(100,firstSelect.value - secondSelect.value);
    secondInput.value = (input.value*expo);
}
function volumeCoverting(){
    const expo = Math.pow(1000,firstSelect.value - secondSelect.value);
    secondInput.value = (input.value*expo);
}

function changeMode() {
    document.documentElement.classList.toggle('light')
}