
# URL Status Monitor

by Chris Bird (chrisjbird@gmail.com)

Monitors a configurable array of URLs and displays traffic lights to display their status:

* If the URLs has a status that is not 200 OK at most once during the last two minutes, the traffic light is green
* If the status is non-200 more than once in the last two minutes, the traffic light flashes red

This was written as a tech test for a company called NewsNow. They wanted me to show how I could make a dashboard to monitor the status of various webservers that they are running. The specification is [here](/spec/spec.md).

The backend which simulates the endpoints is a [Flask](https://flask.palletsprojects.com/en/2.0.x/) (Python) app in [`/server`](server/__init__.py). The frontend is vanilla JavaScript, in [/server/static/js/main.js](/server/static/js/main.js)

## Installation

Set up the server:

```
$ python3 -m venv venv
$ . ./venv/bin/activate
$ pip3 install -r requirements.txt
$ ./run
```

Browse to `http://localhost:5000`

## Usage

Choose a configuration by clicking on the links on the left, and wait for the traffic lights to change, according to which configuration is chosen.

For example, Configuration 4 has four traffic lights:

* One that is 503 every other second
* One that is down for 10 seconds per two minutes
* One that is down for 20 seconds per two minutes
* One that is down for 35 seconds per two minutes

There are links on the right to show the JSON configuration and a description of each configuration.
