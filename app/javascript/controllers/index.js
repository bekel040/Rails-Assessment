// Import and register all your controllers from the importmap via controllers/**/*_controller
import { application } from "./application"

import HelloController from "./hello_controller"
application.register("hello", HelloController)

import ScheduleController from "./schedule_controller"
application.register("schedule", ScheduleController)


import calculateAvailableTime from "./calculate_available_time"
application.register("calculateAvailableTime", calculateAvailableTime)


