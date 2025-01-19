import { Controller } from "@hotwired/stimulus"
import { calculateAvailableTime } from './calculate_available_time';

// Connects to data-controller="schedule"
export default class extends Controller {
  static targets = ["grid", "popupTemplate"];
  connect() {
     
    // Assign gridTarget to a variable
    this.gridElement = this.element.querySelector(".schedule-grid");

    this.gridHeight = this.gridElement.clientHeight; // Calculate grid height here
    this.pixelsPerHour = this.gridHeight / 24; 

    this.gridElement.addEventListener("click", (event) => this.handleClick(event));

    // Cache the popup element
    this.popup = document.getElementById("available-time-popup");
    this.popupMessage = document.getElementById("available-time-message");

  }
  handleClick(event){
    if (!event.target.classList.contains("work-order")){
      const clickedElement = event.target;

  
      // Get all technician columns
      const technicianColumns = this.element.querySelectorAll(".technician-column");

      // Initialize an empty array to store all work orders
      this.allWorkOrders = []; 

      technicianColumns.forEach((column) => {
      // Get work orders within this technician's column
      const columnWorkOrders = Array.from(column.querySelectorAll(".work-order"));

      // Add columnWorkOrders to the allWorkOrders array
      this.allWorkOrders.push(...columnWorkOrders); 
    });

     
    let previousOrder = null;
    let nextOrder = null;

    // Calculate clicked time based on mouse position

    const clickedTimePosition = event.offsetY; 
    const clickedHour = Math.floor(clickedTimePosition / this.pixelsPerHour); 
    const clickedMinutes = Math.floor(((clickedTimePosition / this.pixelsPerHour) - clickedHour) * 60); 
    const clickedTime = new Date();
    clickedTime.setHours(clickedHour, clickedMinutes); 

    if (  this.allWorkOrders.length === 0) {
      // No work orders, calculate available time
      console.log("wordorders 0")
    } else {
           

      const sortedWorkOrders =   this.allWorkOrders.sort((a, b) => new Date(a.dataset.start) - new Date(b.dataset.start));
    
      const clickedTimeStr = clickedTime.toTimeString().slice(0, 5); 


      for (const order of sortedWorkOrders) {
        const orderTimeStr = order.dataset.start.split(" ")[1]; 

        if (orderTimeStr < clickedTimeStr) {
          previousOrder = order;
        } else if (orderTimeStr >= clickedTimeStr) { 
          nextOrder = order;

          break; // Stop iterating after finding next order
        }
      }
    }
    

    const availableTime = calculateAvailableTime(clickedTime, previousOrder, nextOrder, this.pixelsPerHour);

    // Show the popup with the available time
    this.showPopup(event, availableTime);

    }
  }


  showPopup(event, availableTime) {
    
      const newAvailableTime = availableTime.availableTime;

      // Extract hours
      const hours = Math.floor(newAvailableTime);

      // Extract minutes 
      const minutes = Math.round((newAvailableTime - hours) * 60);

      if (isNaN(newAvailableTime)) {

        this.popupMessage.textContent = `There is no more available work orders that would start after the clicked time`;
      } 
      else {
        this.popupMessage.textContent = `Available time: ${hours} hours and ${minutes} minutes`;


      }

      this.popup.style.display = "block";
      this.popup.style.left = `${event.pageX}px`;
      this.popup.style.top = `${event.pageY}px`;

      // Hide the popup after 5 seconds
      setTimeout(() => {
        this.popup.style.display = "none";
      }, 5000);
    }
  }





