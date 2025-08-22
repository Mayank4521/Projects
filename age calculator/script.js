  flatpickr("#dob", {
    dateFormat: "Y-m-d",
    maxDate: "today"})
function getDob(){
    let dob = document.getElementById("dob").value
    let output = document.querySelector("#output")
    let birthday = new Date(dob)
    let today = new Date()
    

   if(!dob){
    output.innerHTML = `Please enter your DOB above`
    return;}
   else{
    let year = today.getFullYear() - birthday.getFullYear()
    let month = today.getMonth() - birthday.getMonth()
    let day = today.getDate() - birthday.getDate()

    if(month<0){
      year--;
      month +=12
    }
    if(day<0){
      month--

      let prevMonth = new Date(today.getFullYear(), today.getMonth(),0) //to get the last day of the previous month
      day += prevMonth.getDate()
    
      if(month<0){
      year--;
      month +=12
    }
  }
    
    output.innerHTML= `Congrats 🥳🥳 your age is ${year} years ${month} months and ${day} days`
    }
}