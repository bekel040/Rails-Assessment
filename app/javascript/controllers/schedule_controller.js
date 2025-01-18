import { Controller } from "@hotwired/stimulus"
import { calculateAvailableTime } from './calculate_available_time';

// Connects to data-controller="schedule"
export default class extends Controller {
  static targets = ["grid", "popupTemplate"];
  connect() {
     console.log("herre",this.gridTarget)
     
    // Assign gridTarget to a variable
    this.gridElement = this.element.querySelector(".schedule-grid");
    console.log("grid element", this.gridElement)
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
      console.log("clickedElement", clickedElement)

  
      // Get all technician columns
      const technicianColumns = this.element.querySelectorAll(".technician-column");

      // Initialize an empty array to store all work orders
      this.allWorkOrders = []; 

      technicianColumns.forEach((column) => {
      // Get work orders within this technician's column
      const columnWorkOrders = Array.from(column.querySelectorAll(".work-order"));
      console.log("columnworker", columnWorkOrders)

      // Add columnWorkOrders to the allWorkOrders array
      this.allWorkOrders.push(...columnWorkOrders); 
    });

     
    let previousOrder = null;
    let nextOrder = null;


    const clickedTimePosition = event.offsetY; 
    const clickedHour = Math.floor(clickedTimePosition / this.pixelsPerHour); 
    const clickedMinutes = Math.floor(((clickedTimePosition / this.pixelsPerHour) - clickedHour) * 60); 
    const clickedTime = new Date();
    clickedTime.setHours(clickedHour, clickedMinutes); 
    console.log("clickedTime", clickedTime)

    console.log("work orders",   this.allWorkOrders);
    if (  this.allWorkOrders.length === 0) {
      // No work orders, calculate available time
      console.log("wordorders 0")
      // this.calculateAvailableTime(clickedElement, null, null);
    } else {
      console.log("more than 1")
      // Get previous and next work orders
      // const clickedTime = new Date(clickedElement.dataset.start);
        // this.gridElement = this.element.querySelector(".schedule-grid");

      console.log("grid element height", this.pixelsPerHour)
      // const pixelsPerHour = gridHeight / 24;

    // Calculate clicked time based on mouse position
      

      const sortedWorkOrders =   this.allWorkOrders.sort((a, b) => new Date(a.dataset.start) - new Date(b.dataset.start));
    
      console.log("sorted work order", sortedWorkOrders)
      const clickedTimeStr = clickedTime.toTimeString().slice(0, 5); 


      for (const order of sortedWorkOrders) {
        // const orderTime = order.dataset.start;
        const orderTimeStr = order.dataset.start.split(" ")[1]; 

        console.log("orderTime", orderTimeStr, "clickked time", clickedTimeStr)
        if (orderTimeStr < clickedTimeStr) {
          previousOrder = order;
          console.log("previious order", previousOrder)
        } else if (orderTimeStr >= clickedTimeStr) { // Check if orderTime is greater than or equal to clickedTime
          nextOrder = order;
          console.log("nextOrder order", nextOrder)

          break; // Stop iterating after finding next order
        }
      }
      console.log("previousOrder",previousOrder,"nextOrder",nextOrder)
    }
    

    // this.calculateAvailableTime(clickedElement, previousOrder, nextOrder);
    const availableTime = calculateAvailableTime(clickedTime, previousOrder, nextOrder, this.pixelsPerHour);

    // Show the popup with the available time
      this.showPopup(event, availableTime);

    }
  }


  showPopup(event, availableTime) {
    
      // Extract hours (integer part of decimal)
      const newAvailableTime = availableTime.availableTime;

      const hours = Math.floor(newAvailableTime);

      // Extract minutes (fractional part * 60)
      const minutes = Math.round((newAvailableTime - hours) * 60);

      if (isNaN(availableTime)) {
        this.popupMessage.textContent = `Available Time is not a valid number. This might be the last work order`;
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





