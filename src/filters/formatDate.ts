import { DateTime } from 'luxon'

export default function formatDateFilter(date: Date, format: string) {
    console.log(typeof date, date)
    return DateTime.fromJSDate(date).toFormat(format);
}

module.exports = formatDateFilter;
