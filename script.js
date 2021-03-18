/* 
*   Matt Felton - 100766047
*   Logic behind the Zerkblatt Transit Schedule using Es6 class and json.
*/

class Schedule {
    constructor(file) {
        this.file = file;
        this.scheduleUpdate();
        this.scheduleUpdate();
    }

    grabAndDisplay() {
        fetch(this.file).then(res => res.json()).then(data => {
            console.log(`Created! ${this.file}`);
            this.displayData(data.schedule)
        }).catch(error => console.error(error));
    }

    displayData(data) {
        let board = document.querySelector(".board");
        data.forEach(entry => {
            let scheduleEntry = document.createElement("li");
            scheduleEntry.classList.add("scheduleEntry");
            scheduleEntry.innerHTML = `
            <p class="routeNumber">${entry.routeNumber}</p>
            <p class="destination">${entry.destination}</p>
            <p class="timeOfArrival">${entry.timeOfArrival}</p>
            <p class="timeOfNextStarship">${entry.timeOfNextStarship}</p>
            <p class=${entry.isDelayed ? "isDelayed" : ""}>${ entry.isDelayed ? "Delayed" : "" }</p>
            <p class="delayEstimate">${entry.isDelayed ? entry.delayEstimate : ""}</p>
            <p class="delayReason">${entry.isDelayed ? entry.reasonOfDelay : ""}</p>
            `;
            board.appendChild(scheduleEntry);
        });
    }

    scheduleUpdate() {
        this.grabAndDisplay();
        let existingEntries = document.querySelectorAll(".scheduleEntry");
        setInterval(() => {
            if (existingEntries.length > 0) {
                existingEntries.forEach(element => {
                    element.remove();
                });
                this.grabAndDisplay();
            }
            console.log("Updated!")
        }, 600000)
    }
}

let mySchedule = new Schedule("schedule.json");