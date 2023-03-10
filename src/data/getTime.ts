export const timeConvert = (time: number) => {
    let min = Math.floor(time / 60)

    let sec = time % 60

    const minMusic = min > 9 ? min.toFixed(0) : `0${min.toFixed(0)}`
    const secMusic = sec > 9 ? sec.toFixed(0) : `0${sec.toFixed(0)}`

    return `${minMusic}:${secMusic}`
}