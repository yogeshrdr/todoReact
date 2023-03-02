const handleDateFormat = (event, timeStamp) => {
    const dateFormat = new Date(timeStamp);
    var dateString = "";
    var dateTime = "a.m.";
    var dateHours = dateFormat.getHours();
    var dateMinutes = dateFormat.getMinutes();
    var dateSeconds = dateFormat.getSeconds();

    if(dateHours > 12){
        dateHours = dateHours -1;
        dateTime = "p.m.";
    }

    if(dateMinutes < 10){
      dateMinutes = '0' + dateMinutes;
    }

    if(dateSeconds < 10){
      dateSeconds = '0' + dateSeconds;
    }

    if(event === "completedDate"){
      dateString += dateHours + ":" +dateMinutes+":"+ dateSeconds + " " + dateTime + " ";
    }
    dateString += dateFormat.getDate() + "-" + (dateFormat.getMonth()+1) + "-" + dateFormat.getFullYear();

    return  dateString;
  }


  export default handleDateFormat;
