// Utility function to calculate available time
export function calculateAvailableTime(clickedTime, previousOrder, nextOrder, pixelsPerHour) {
    let startTime, endTime;
    let calcStartTime, calcEndTime;
    let currentClickedTime, calcClickedtTime;
    console.log("clickedTime",clickedTime)
    // currentClickedTime = new Date(clickedTime.dataset.start);
    // const hours = currentClickedTime.getUTCHours();
    // const minutes = currentClickedTime.getUTCMinutes();
    // calcClickedtTime = hours + minutes / 60;
    // console.log("calc clicked time", calcClickedtTime);

    // Extract hour and minute from clickedTime
    const clickedHour = clickedTime.getHours();  // Gets the hour (0-23)
    const clickedMinute = clickedTime.getMinutes();  // Gets the minute (0-59)

    // Format the time as a decimal (e.g., 8:59 -> 8.9833)
    const clickedTimeInDecimal = clickedHour + clickedMinute / 60;
    console.log("clickedtimedecimal", clickedTimeInDecimal)


    if (previousOrder) {
        console.log("Previous Order end time:", previousOrder.dataset.end);
        
        startTime = new Date(previousOrder.dataset.start);
        const hours = startTime.getUTCHours();
        console.log("start time hours", hours);
        const minutes = startTime.getUTCMinutes();
        console.log("start time minute", minutes);


        // Calculate the decimal time
         calcStartTime = hours + minutes / 60;
        console.log("calcStartTime", calcStartTime)
    } else {
        calcStartTime = clickedTimeInDecimal;
        console.log("NO previous order starttime", startTime)

    }

    if (nextOrder) {
        console.log("nextOrder end time:", nextOrder.dataset.start);

        endTime = new Date(nextOrder.dataset.start);
        console.log(" next order starttime", endTime)
        const hours = endTime.getUTCHours();
        const minutes = endTime.getUTCMinutes();

        // Calculate the decimal time
         calcEndTime = hours + minutes / 60;
        console.log("calcEndTime", calcEndTime)

    } else {
        // Calculate end time based on pixelsPerHour passed from the controller
        const clickedTimePosition = clickedTime.getHours() * pixelsPerHour;
        const endTimePosition = clickedTimePosition + pixelsPerHour; // Assuming 1-hour slot
        endTime = new Date(clickedTime);
        endTime.setHours(endTimePosition / pixelsPerHour);
    }

    const availableTime = calcEndTime - calcStartTime;
    // const hours = Math.floor(availableTime / (1000 * 60 * 60));
    // const minutes = Math.floor((availableTime / (1000 * 60)) % 60);

    console.log("Available Time:", availableTime);
    return { availableTime};
}
export default calculateAvailableTime;
