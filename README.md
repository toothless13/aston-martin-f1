# Aston Martin F1 Technical Test

## Technology

React was used to create this app, along with Tailwind for styling.

## Overview

The app uses axios to fetch data from the Ergast API based on what information the user has selected.

The user selects a year, then the race list is populated. Once the user has selected a race, any Qualifying, Sprint Race and Race Results will be available by pressing one of the relevant buttons.

When the Race Result table is open, you can click on either the driver or constructor name, which will open a smaller table, showing the relative position in the driver and constructor standings.

There is also a button that will allow the user to see a line chart that shows the positions of drivers across the race. On initial loading, only the driver that won the race is show, but clicking on the other driver labels in the legend allow more drivers to be added to the chart.

## Usage

When initially opening the project you will need to run `npm install`

You can then use `npm run preview` to run the build

Alternatively, the project is also hosted here: [Aston Martin F1 Tech Test](https://aston-martin-f1.pages.dev/)

## Docker

Please use `docker pull timcodes13/aston-martin-test` to pull the Docker Image from dockerhub

Project page on dockerhub can be found here: [Aston Martin F1 Tech Test dockerhub](https://hub.docker.com/r/timcodes13/aston-martin-test)

When running the image in a container, please ensure the ports are set to 8080
