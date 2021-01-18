const getampm = (e, n) => {
  if(e){
    let t = parseInt(n)
    if(t<12) return 'AM';
    else return 'PM';
  }else{
    return ''
  }
}

export default getampm