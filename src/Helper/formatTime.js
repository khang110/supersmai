const formatTime = (timeUTC) => {
    let time1 = new Date(timeUTC);
    let hour = time1.getHours();
    let minute = time1.getMinutes();
    let day = time1.getDate();
    let month1 = time1.getMonth() + 1;
    let year1 = time1.getFullYear();
    let title = hour + ":" + minute + " - " + day + "/" + month1 + "/" + year1;
    return title;
}

export default {formatTime};