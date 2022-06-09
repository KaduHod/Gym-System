
/**
 * 
 * @param {*} opt  contendo array com id de exercicios, series e repeticoes
 * @returns array com objetos no formato que o modelo exercicio_do_treino do prisma precisa para criar os exercicios e salvar um treino
 */
const createMany = opt => {
   let {exercicios, series, reps} = opt

    const exerciciosDoTreino = exercicios.reduce( (acc, exercicio, index) => {
       let e = {
        exercicio : {
            connect : {
                id : parseInt(exercicio)
            }
        },
        series : parseInt(series[index]),
        repeticoes : parseInt(reps[index])
        }

       acc.push(e)
       return acc
    }, []);


    return exerciciosDoTreino
}


module.exports = { createMany }