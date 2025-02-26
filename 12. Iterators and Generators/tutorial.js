function* list(numOfItems){
for (let num=1; num<= numOfItems; num++){
  yield num; // 'return item';
}
console.log("Game Over!")
}

const totalItems = 10;
const items = list(totalItems);

//let getNext = true;
//while (getNext){
  //  let nextItem = items.next();
  //  console.log(nextItem.value);
  //  getNext = !nextItem.done;
  //}
  
  for (const element of items) {
      console.log("Base nº" + element + " taken!");
}

console.log("All your base are belong to us!");