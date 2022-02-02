const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b)
        }, 500)
    })
}

// // below is not right way to do inner promise 
// add(1,3).then((sum)=>{
//     console.log(sum)
//     add(sum,4).then((sum2)=>{
//         console.log(sum2)
//     }).catch((er)=>{
//         console.log(er)
//     })
// }).catch((er)=>{
//     console.log(er)
// })

//below is promise chaining
add(1, 3)
    .then((sum) => {
        console.log(sum)
        return add(sum, 4)
    })
    .then((sum2) => {
        console.log(sum2)
    })
    .catch((e) => {
        console.log(e)
    })