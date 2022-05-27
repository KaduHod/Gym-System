let containerExercicio = `
<div class="containerExercicio" data-allowed-to-remove="true">
    <div class="containerExercicioContent">
        <h3>Exercicio Nº: <var> </h3>
        <label for="exercicio-<var>"> Exercício </label>
        <select class="inputGym" name="exercicio-<var>" id="exercicio-<var>">
            
        </select>
        <textarea class="inputGym" name="descricao-exercicio-<var>" id="" cols="30" rows="3">
            Adicione uma descrição ao exercício
        </textarea>
        <div>
            <label for="series-exercicio-<var>">Séries
                <input class="inputGym" type="number" name="series-exercicio-<var>">
            </label>
            <label for="reps-exercicio-<var>">Repetições
                <input class="inputGym" type="number" name="reps-exercicio-<var>">
            </label>
        </div>
    </div>
    <div class="containerExercicioRemove" >
        X
    </div>

</div>

`
const treinoForm = document.forms[0]
const addButton = document.getElementById('add')
const ContainerComExercicios = document.getElementById('ExerciciosContainer')

const createNovoExercicioContainer = cont => {

    /**
     * Container maior
     */
    let containerExercicio = document.createElement('div')
        containerExercicio.classList.add('containerExercicio')
        containerExercicio.dataset.allowedToRemove = true

    /**
     * Container com os inputs
     */
    let containerExercicioContent = document.createElement('div')
        containerExercicioContent.classList.add('containerExercicioContent')

        let h3 = document.createElement('h3')
            h3.innerText = `Exercicio Nº: ${cont}`
            

        let labelSelect = document.createElement('label')
            labelSelect.setAttribute('for',`exercicio-${cont}`)
            labelSelect.innerText = 'Exercício'

        let select = document.createElement('select')
            select.classList.add('inputGym')
            select.setAttribute('name',`exercicio-${cont}`)
            select.setAttribute('id',`exercicio-${cont}`)


        let exercicioDescription = document.createElement('div')    
            exercicioDescription.classList.add('ExercicioDescription')

        /* let textarea = document.createElement('textarea')
            textarea.setAttribute('name',`descricao-exercicio-${cont}`)
            textarea.classList.add('inputGym')
            textarea.setAttribute('cols',`30`)
            textarea.setAttribute('rows',`3`)
            textarea.innerText = 'Adicione uma descrição ao exercício' */

        let divSeriesReps = document.createElement('div')
            let labelSeries = document.createElement('label') 
                labelSeries.setAttribute('for',`series-exercicio-${cont}`)
                labelSeries.innerText = 'Séries'
            let series = document.createElement('input')
                series.classList.add('inputGym')
                series.setAttribute('name',`series-exercicio-${cont}`)
                series.setAttribute('type',`number`)
                series.setAttribute('id',`series-exercicio-${cont}`)


            let labelreps = document.createElement('label') 
                labelreps.setAttribute('for',`reps-exercicio-${cont}`)
                labelreps.innerText = 'Reps'
            let reps = document.createElement('input')
                reps.classList.add('inputGym')
                reps.setAttribute('name',`reps-exercicio-${cont}`)
                reps.setAttribute('type',`number`)
                reps.setAttribute('id',`reps-exercicio-${cont}`)

                labelreps.appendChild(reps)
                labelSeries.appendChild(series)
    /**
     * Container para remover
     */
    let containerExercicioRemove = document.createElement('div')
        containerExercicioRemove.classList.add('containerExercicioRemove')
        containerExercicioRemove.innerHTML = "<ion-icon name='trash-outline' alt='excluir'></ion-icon>"

        


        containerExercicio.appendChild(containerExercicioContent)
            containerExercicioContent.appendChild(h3)
            containerExercicioContent.appendChild(labelSelect)
            containerExercicioContent.appendChild(select)
            containerExercicioContent.appendChild(exercicioDescription)
            containerExercicioContent.appendChild(divSeriesReps)
                divSeriesReps.appendChild(labelreps)
                divSeriesReps.appendChild(labelSeries)

        containerExercicio.appendChild(containerExercicioRemove)
        containerExercicioRemove.addEventListener('click', removeExercicio)

        return containerExercicio
}

var cont = 1

const ajeitarNumeracaoExercicios = () => {
    let counter = cont
    
    let containerExercicios = [... ContainerComExercicios.children]
    let qtdFilhos = ContainerComExercicios.childElementCount
    let arr = array(qtdFilhos - 2)

    cont = arr.length 


    console.log(arr,'Array com numeração até a quantdade de elmentos que sobraram na tela')

    containerExercicios.forEach( (div, index) => {
        
        let num = arr[index]
        
        if(div.dataset.allowedToRemove === 'true'){
            let {innerHTML} = div
            
            div.innerHTML = replaceCounter(innerHTML, index)
        }
    })
}

const array  = limit => {
    let cont = 1
    let arr  = [cont]
    while(arr.length < limit) {
        ++cont
        arr.push(cont)
    }

    return arr
}

const replaceCounter = (str, counter) => {
    let new_str = str

    let regexIdNameFor = /-\d/g
    let regexh3 = /: \d/g
    let new_str_1 = new_str.replace(regexIdNameFor, `-${counter}`)
    let new_str_2 = new_str_1.replace(regexh3, `: ${counter}`)
    
    return new_str_2
}

const removeExercicio = evt => {    
    console.log('oi')
    try {
        ContainerComExercicios.removeChild(evt.target.parentNode)
    } catch (error) {
        ContainerComExercicios.removeChild(evt.target.parentNode.parentNode)
    }
    ajeitarNumeracaoExercicios()

    let containerExercicioRemove = [... document.getElementsByClassName('containerExercicioRemove')]
    containerExercicioRemove.forEach( container => {
        container.addEventListener('click', removeExercicio)
    } )
}

const handleAddExercicio = evt => {

    ContainerComExercicios.insertBefore(createNovoExercicioContainer(++cont), addButton )
}


addButton.addEventListener('click', handleAddExercicio)