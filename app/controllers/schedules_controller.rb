class SchedulesController < ApplicationController
  def index
    @technicians = Technician.includes(:work_orders)
    # @work_orders = WorkOrder.all
    @work_orders = WorkOrder.includes(:location).all
  end
end
