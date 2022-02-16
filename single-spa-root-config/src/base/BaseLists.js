
export default function Base() {
    let dayForTasks = 1;
    const subscribers = [];
    
    return ({
        get day() {
            return dayForTasks ;
        },
        setDay(e) {
            dayForTasks = e;
            subscribers.forEach((fn) => fn());
        },
        subscribe(fn){
            subscribers.push(fn);
            console.log(`this is subscribers: `+subscribers)
        },
        updateTasks(tasks){
            localStorage[dayForTasks] = JSON.stringify(tasks);
            subscribers.forEach((fn) => fn());
        }
    })
}