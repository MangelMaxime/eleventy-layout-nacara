import dayjs from "dayjs";

export default function formatDateFilter(
    date: string | number | Date | dayjs.Dayjs | null | undefined,
    format: string
) {
    return dayjs(date).format(format);
}
