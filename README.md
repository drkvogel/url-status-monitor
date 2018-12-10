
# URL Status Monitor

by Chris Bird (chrisjbird@gmail.com)

Monitors a configurable array of URLs and displays traffic lights to display their status:

* If the URLs has a status that is not 200 OK at most once during the last two minutes, the traffic light is green
* If the status is non-200 more than once in the last two minutes, the traffic light is flashing red

## Installation

Set up the server:

```
$ pip3 install -r requirements.txt
$ ./run
```

Browse to `http://localhost:5000`

## Usage

Choose a configuration: 

Config 4 has four traffic lights:

* one that is 503 every other second
* one that is down for 10 seconds per two minutes
* one that is down for 20 seconds per two minutes
* one that is down for 35 seconds per two minutes
