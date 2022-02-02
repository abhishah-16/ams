const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(a<0 || b<0)
                return reject("Number must be positive")
            resolve(a + b)
        }, 00)
    })
}

const dowork = async ()=>{
    const sum = await add(1,99)
    const sum2 = await add(sum,-150)
    const sum3 = await add(sum2,100)
    return sum3
    //return "jay"
    //throw new Error('something went wrong..')
}
dowork()
.then((v)=>{
    console.log("Result : ",v)
})
.catch((e)=>{
    console.log(e)
})