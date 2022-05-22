
const navbar = document.getElementsByClassName('navbar')
const navbarItems = [... document.getElementsByClassName('navbarItem')]

/**
 * 
 * @param {*} classList classList
 * @param {*} target classe a ser procurada
 * @returns retorna true se elemento possui classe
 */
const verificaClasse = (classList, target) => {
    
    return classList.contains(target)
}

/**
 * 
 * @param {*} path array contendo elementos html do navbarItem clicado
 * @param {*} classname nome da classe do elemento que sera retornado
 * @returns elemento com a classe especificada em classname
 */
const getElFromPath = (path, classname) => {
    return path.filter( el => {
        let verificaClassList = el.classList ? true : false
        if(verificaClassList){
            let verificaClassList = el.classList.contains(classname)
            if(verificaClassList) return el
        }
    })
}

/**
 * 
 * @param {*} parent elemento pai
 * @param {*} classname nome da classe do filho a ser retornado
 * @returns retorna primeira ocorrencia de filho com classname especificado
 */
const getChildByClassName = (parent, classname) => {
    return [... parent.getElementsByClassName(classname)][0]
}

/**
 * 
 * @param {*} menuList list do menu
 * @returns se menu tem classe up retorna true (esta escondido) se nao ele esta a mostra
 */
const verificaUp = (menuList) => {
    console.log(menuList.classList)
    return menuList.classList.contains('up')
}

/**
 * 
 * @param {*} menuList item a ter classe css de mostrar
 */
const mostrarMenuList = (menuList) =>{
    menuList.classList.remove('up')
    menuList.classList.add('drop')
}

/**
 * 
 * @param {*}  menuList item a ter classe css de esconder
 */
const esconderMenuList = (menuList) => {
    menuList.classList.remove('drop')
    menuList.classList.add('up')
}

/**
 * Esconde todos os elementos
 */
const cleanDrops = () => {
    let navbarItems = [... document.getElementsByClassName('navbarItem')]
    navbarItems.forEach( item => {
        if(item.classList.contains('drop')) esconderMenuList(item)
    })
}

/**
 * 
 * @param {*} pointer ponteiro do evento
 * gerencia a oção de mostrar menu
 */
const handleDropDown = (pointer) => {

    
    let navbarItem = getElFromPath(pointer.path, 'navbarItem')[0]
    let escondido = verificaUp(navbarItem)
    console.log(escondido)
    cleanDrops() 
        
    escondido ? mostrarMenuList(navbarItem) : esconderMenuList(navbarItem)  
    

}


navbarItems.forEach( el => {
    if(el.id !== 'logout'){
        el.addEventListener('click', handleDropDown)
    }
})



