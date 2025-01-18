// Entry point for the build script in your package.json
import "@hotwired/turbo-rails"
import "./controllers"
import * as bootstrap from "bootstrap"
import ScheduleController from "./controllers/schedule_controller"
// Import Stimulus and the controllers
import { Application } from "stimulus"

const application = Application.start()

application.register("schedule", ScheduleController)
