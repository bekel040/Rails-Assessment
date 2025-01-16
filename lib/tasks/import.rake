require 'csv'

namespace :import do
  desc "Import technicians, locations and work orders from CSV"
  task data: :environment do
    technician_file = File.join(Rails.root, "lib/data/technicians.csv")
    location_file = File.join(Rails.root, "lib/data/locations.csv")
    work_order_file = File.join(Rails.root, "lib/data/work_orders.csv")

    technician_counter = 0
    location_counter = 0
    work_order_counter = 0

    #import technicians 
    CSV.foreach(technician_file, headers: true) do |row|
      technician = Technician.find_or_create_by(id: row["id"], name: row["name"])
      technician_counter += 1 if technician.persisted?
    end
    puts "Imported #{technician_counter} [technicians]"

    #import locations
    CSV.foreach(location_file, headers: true) do |row|
      location = Location.find_or_create_by(id: row["id"], name: row["name"], city: row["city"])
      location_counter += 1 if location.persisted?
    end
    puts "Imported #{location_counter} [locations]"

    #import work orders
    CSV.foreach(work_order_file, headers: true) do |row|
      technician = Technician.find_by(id: row["technician_id"])
      location = Location.find_by(id: row["location_id"])

      if technician && location
        work_order = WorkOrder.find_or_create_by(
          technician_id: technician.id,
          location_id: location.id,
          time: row["time"],
          duration: row["duration"].to_i,
          price: row["price"].to_f
        )
        work_order_counter += 1 if work_order.persisted?
      else
        Rails.logger.warn("Technician or Location not found for WorkOrder in row: #{row}")
      end
    end
    puts "Imported #{work_order_counter} [work orders]"
  end
end
