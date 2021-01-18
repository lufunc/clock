const getampm = (e, n) => {
  let ap = ''
  let t = n
  if(e){
    if(t<12){
      ap = 'AM'
    }
    else{
      ap = 'PM'
      t-=12
    }
  }
  return {ap,t}
}

export default getampm