
# NewsNow Full-stack Developer Exercise

All code you send us should be entirely your own, and should be of the quality you would expect to submit for a real NewsNow project.

## Server status widget

Create pages containing multiple traffic light widgets that use the browser to monitor individual URLs. In the frontend, use object-oriented JavaScript, HTML, CSS (and preferable jQuery) to create traffic light objects with the following properties:

* The object renders a traffic light on the web page, like the ones shown above
* Every 10 seconds or so the object checks a URL (e.g. "/status") and retrieves the HTTP status code of the response
* The green light is dimmed and the red light is illuminated and set flashing if the HTTP status code has been something else than 200 at least 3 times during the past two minutes
* The green light is illuminated and the red light is dimmed if the HTTP status code has been something else than 200 at most once during the past two minutes
* One can place multiple objects on the same web page monitoring different URLs.

In the backend, use any suitable language to create two endpoints:

1. A server or script, with which to test the traffic lights, that accepts a specified HTTPresponse status code as a query string parameter and returns the specified HTTPresponse status code header as output.

2. A server or script that generates a web page containing multiple ‘traffic lights’ according to a choice of configurations stored in MySQL or SQLite table(s), and a query string parameter that selects a particular configuration of traffic lights to display.

* For a particular query string parameter, the selected configuration specifies the traffic lights displayed on the returned web page
* A configuration can specify one or more predefined ‘traffic lights’ to be displayed, while a predefined ‘traffic light’ may be referenced in multiple configurations
* A ‘traffic light’ is defined by the URL to be monitored and the frequency with which it should be checked. Please provide table definition SQL for your solution