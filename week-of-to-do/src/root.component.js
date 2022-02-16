
import Day from './components/Day';


export default function Root() {
  const days = [1, 2, 3, 4, 5, 6, 7];

  return (
    <section style={{border: "1px solid #1a90ff", borderRadius: '5px', width: "378px"}}>
      {days.map((day) =>(
        <Day key={day} day={day} />
      ))}
    </section>
  )
}
