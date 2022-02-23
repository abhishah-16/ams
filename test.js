const tileslots=[]
for(let i=1;i<=14;i++){
    let start = i+8
    let end = start+1
    const availableSlots = {slot:i,start,end}
    tileslots.push(availableSlots)
}
console.log(tileslots)