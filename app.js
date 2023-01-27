const form = document.querySelector('form')
const distance = document.querySelector('#distance')
const hours = document.querySelector('#hours')
const minutes = document.querySelector('#minutes')
const seconds = document.querySelector('#seconds')
const fivekdisplay = document.querySelector('#fivek')
const tenkdisplay = document.querySelector('#tenk')
const halfdisplay = document.querySelector('#half')
const marathondisplay = document.querySelector('#marathon')
const minkm = document.querySelector('#minkm')
const minm = document.querySelector('#minm')
const reset = document.querySelector('#reset')
const km = document.querySelector('#km')
const m = document.querySelector('#m')
let totalSeconds = 0

reset.addEventListener('click', function () {
    distance.value = ''
    km.checked = false
    m.checked = false
    hours.value = ''
    minutes.value = ''
    seconds.value = ''
    fivekdisplay.textContent = '00:00'
    tenkdisplay.textContent = '00:00'
    halfdisplay.textContent = '0:00:00'
    marathondisplay.textContent = '0:00:00'
    minkm.textContent = '00:00'
    minm.textContent = '00:00'
})

function getTotalSeconds(h, m, s) {
    let totalSeconds = 0
    totalSeconds += parseInt(s)
    totalSeconds += parseInt(m * 60)
    totalSeconds += parseInt((h * 60)) * 60
    return totalSeconds
}


function minsPerDist(s, d) {
    let secs = s / d
    return secs / 60
}


function displayTime(time) {
    let timeString = time.toFixed(2).toString()
    let newTimes = timeString.split('.')
    let newSecs = Math.round(newTimes[1] / 100 * 60)
    if (newTimes[0].length === 1) {
        newTimes[0] = '0' + newTimes[0]
    }
    if (newSecs.toString().length === 1) {
        newSecs = '0' + newSecs
    }
    
    if (newTimes[0] < 60) {
        return `${newTimes[0]}:${newSecs}`
    }
    else {
        let newHours = (newTimes[0] / 60).toFixed(2).toString()
        let splitHours = newHours.split('.')
        let newMins = Math.round(splitHours[1] / 100 * 60)
        if (newMins.toString().length === 1) {
            newMins = '0' + newMins
        }
        return `${splitHours[0]}:${newMins}:${newSecs}`
    }
}


form.addEventListener('submit', function (e) {

    e.preventDefault();

    if (hours.value == '') {
        hours.value = 0
    }
    if (minutes.value == '') {
        minutes.value = 0
    }
    if (seconds.value == '') {
        seconds.value = 0
    }

    totalSeconds = getTotalSeconds(hours.value, minutes.value, seconds.value)

    if (form.units.value === 'km') {
        const kmDist = distance.value
        minkm.textContent = displayTime(minsPerDist(totalSeconds, distance.value))
        minm.textContent = displayTime(minsPerDist(totalSeconds, (distance.value * 0.621371)))
        const oneKmTime = ((totalSeconds / 60) / kmDist)
        fivekdisplay.textContent = displayTime(oneKmTime * 5)
        tenkdisplay.textContent = displayTime(oneKmTime * 10)
        halfdisplay.textContent = displayTime(oneKmTime * 21.0975)
        marathondisplay.textContent = displayTime(oneKmTime * 42.195)


    }
    else {
        const kmDist = distance.value / 0.621371
        minkm.textContent = displayTime(minsPerDist(totalSeconds, kmDist))
        minm.textContent = displayTime(minsPerDist(totalSeconds, distance.value))
        const oneKmTime = ((totalSeconds / 60) / kmDist)
        fivekdisplay.textContent = displayTime(oneKmTime * 5)
        tenkdisplay.textContent = displayTime(oneKmTime * 10)
        halfdisplay.textContent = displayTime(oneKmTime * 21.0975)
        marathondisplay.textContent = displayTime(oneKmTime * 42.195)

    }


})
