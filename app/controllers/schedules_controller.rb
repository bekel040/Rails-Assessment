class SchedulesController < ApplicationController
  def index
    @technicians = Technician.includes(:work_orders)
    @work_orders = WorkOrder.all
  end
end
