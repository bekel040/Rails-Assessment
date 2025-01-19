# Pin npm packages by running ./bin/importmap

# pin "application"
pin "application", to: "application.js"

pin "stimulus" # @3.2.2
pin_all_from "app/javascript/controllers", under: "controllers"

pin "@hotwired/stimulus", to: "stimulus.min.js"
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js"
pin "es-module-shims", to: "es-module-shims.min.js", preload: true
