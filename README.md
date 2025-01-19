# README

# Pest Control Scheduling System
    This is a Ruby on Rails application designed to manage and display work orders for pest control technicians. The application features a scheduling grid where technicians' work orders are displayed based on time and location.

## Deliverables
    A public GitHub repository containing the complete source code of the Ruby on Rails application.
    A README file with sufficient instructions to run the application on a new machine, including the Gemfile, Ruby version, and rake tasks to load data.
    A brief description of the approach taken, problems faced, and possible future improvements.
    (BONUS) A hosted URL of the application on platforms like Heroku or Render.
## Installation

### Prerequisites
    Ensure that you have the latest version of Ruby, Rails and PostgreSQL (or any other SQL database you prefer) installed:


## Getting Started
### Clone the repository:

    ```
    git clone https://github.com/bekel040/Rails-Assessment
    cd Rails-Assessment
    ```
### Install dependencies: Install the required gems using Bundler:

    ```
    bundle install
    ```
### Set up the database: Create and migrate the database:

    ```
    rake db:create
    rake db:migrate
    ```
### Load CSV data into the database: The application comes with a rake task that loads the data from CSV files into the database. Ensure the CSV files are placed in the correct directory (e.g., db/csv/). To load the data, run the following rake task:

    ```
    rake import:data
    ```
### 

### Start the Rails server: Once everything is set up, you can start the Rails server:

    ```
    rails assets:precompile
    rails server
    ```
    Visit http://localhost:3000 in your browser to view the application.


### Features

    Technician: Represents the technician performing the work.
    Location: Represents the customer location.
    WorkOrder: Join table mapping technicians to locations, with a duration in minutes and other relevant fields like price and start time.
    The data is loaded from CSV files, with each CSV representing data for technicians, locations, and work orders. A rake task loads the CSV data into the respective tables.

    User Interface
    The scheduling grid is rendered as a single-page application, using server-side rendering for the initial load. The grid uses client-side JavaScript to dynamically display work orders and popups for available time. Blocks representing work orders that span specific time slots, showing the location name, city, start time, and price.
    Blocks are dynamically generated based on work order data.

    Popup Interaction
    When a user clicks on an open space in the grid, JavaScript calculates the time difference between the adjacent work orders for that technician and displays it in a popup.

    Rake Tasks
    db:import_csv: Loads data from CSV files into the database. The task is idempotent, ensuring that re-running it does not create duplicate records.


### To import data, ensure that CSV files are located in the db/csv/ directory, and run:

    ```
    rake import:data
    ```

### Assumptions

The available time between the previous order and the next order is based on the whole work orders array, meaning when a user clicks on open space under one technicians column the next order that is used to calculate available time might be from another technicians column. 

`There is no more available work orders after that start after time` When there is a pop with that, its assumed that the user wants a work order that starts after the time they clicked on site. There might be some work orders still available operating during the clicked time but no more work orders are starting after the clicked time. 