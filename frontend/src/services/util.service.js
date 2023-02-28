import { FastAverageColor } from "fast-average-color"

export const utilService = {
    makeId,
    getRandomIntInclusive,
    debounce,
    saveToStorage,
    loadFromStorage,
    getBgUrlIsDark,
    getBgIsDarkColorHex,
    formatTime,
    formatDate,
    getWindowDimensions,
    getAvgColorImage,
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

function debounce(func, timeout = 500) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => { func.apply(this, args) }, timeout)
    }
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

function formatDate(time) {
    var options = {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
    }

    return new Intl.DateTimeFormat('en', options).format(time)
}

function formatTime(sentAt) {
    const formatter = new Intl.RelativeTimeFormat('en', { style: 'narrow' });
    const DIVISIONS = [
        { amount: 60, name: 'seconds' },
        { amount: 60, name: 'minutes' },
        { amount: 24, name: 'hours' },
        { amount: 7, name: 'days' },
        { amount: 4.34524, name: 'weeks' },
        { amount: 12, name: 'months' },
        { amount: Number.POSITIVE_INFINITY, name: 'years' },
    ]

    let duration = (sentAt - new Date()) / 1000

    for (let i = 0; i <= DIVISIONS.length; i++) {
        const division = DIVISIONS[i]
        if (Math.abs(duration) < division.amount) {
            return formatter.format(Math.round(duration), division.name)
        }
        duration /= division.amount
    }
}

async function getAvgColorImage(url) {
    const fac = new FastAverageColor();
    try {
        const color = await fac.getColorAsync(url, { algorithm: 'dominant' })
        return color
    } catch (err) {
        console.error(err)
    }
}

async function getBgUrlIsDark(url) {
    const fac = new FastAverageColor();
    const brightnessLevel = await fac.getColorAsync(url)
    return brightnessLevel.isDark
}

function getBgIsDarkColorHex(color) {
    const hex = color.replace('#', '');
    const c_r = parseInt(hex.substring(0, 0 + 2), 16);
    const c_g = parseInt(hex.substring(2, 2 + 2), 16);
    const c_b = parseInt(hex.substring(4, 4 + 2), 16);
    const brightness = ((c_r * 299) + (c_g * 587) + (c_b * 114)) / 1000;
    return brightness < 155;
}

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}
