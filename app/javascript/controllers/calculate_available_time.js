// Utility function to calculate available time
export function calculateAvailableTime(clickedTime, previousOrder, nextOrder, pixelsPerHour) {
    let startTime, endTime;
    let calcStartTime, calcEndTime;
    
    // Extract hour and minute from clickedTime
    const clickedHour = clickedTime.getHours();  
    const clickedMinute = clickedTime.getMinutes();  

    // Format the time as a decimal (e.g., 8:59 -> 8.9833)
    const clickedTimeInDecimal = clickedHour + clickedMinute / 60;


    if (previousOrder) {
        
        startTime = new Date(previousOrder.dataset.start);
        const hours = startTime.getUTCHours();
        const minutes = startTime.getUTCMinutes();

        // Calculate the decimal time
         calcStartTime = hours + minutes / 60;
    } else {
        calcStartTime = clickedTimeInDecimal;

    }

    if (nextOrder) {

        endTime = new Date(nextOrder.dataset.start);
        const hours = endTime.getUTCHours();
        const minutes = endTime.getUTCMinutes();

        // Calculate the decimal time
         calcEndTime = hours + minutes / 60;

    } else {
        // Calculate end time based on pixelsPerHour passed from the controller
        const clickedTimePosition = clickedTime.getHours() * pixelsPerHour;
        const endTimePosition = clickedTimePosition + pixelsPerHour; // Assuming 1-hour slot
        endTime = new Date(clickedTime);
        endTime.setHours(endTimePosition / pixelsPerHour);
    }

    const availableTime = calcEndTime - calcStartTime;
    

    return { availableTime};
}
export default calculateAvailableTime;
