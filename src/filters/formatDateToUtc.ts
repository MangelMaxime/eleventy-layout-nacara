import { DateTime } from "luxon";

export default function formatDateFilter(date: Date) {
    return DateTime.fromJSDate(date, { zone: "utc" }).toFormat(
        "yyyy-LL-dd HH:mm:ss"
    );
}

module.exports = formatDateFilter;
