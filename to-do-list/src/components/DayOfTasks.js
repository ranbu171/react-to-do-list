import Typography from "@mui/material/Typography"

export default function DaysName ({day}) {
const dayNames = ['Костыль','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота','Воскресенье']

    return (
        <Typography variant="h4">{dayNames[day]}</Typography>
    )
}