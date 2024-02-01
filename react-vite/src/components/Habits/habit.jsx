import {useState, useEffect} from "react";


const Habits = () =>{
    const [habits, setHabits] = useState([])

    const fetchHabits = async () => {
        const response = await fetch('api/habits')
        if(response.ok){
            const data = await response.json()
            setHabits(data)
        } else {
            throw new Error('Error fetching habits')
        }
    }

    useEffect(()=>{
        fetchHabits()
    }, [])

    return (
        <div className="habitBlock">
            {/* {print(habits)} */}
            <ul>
                {habits.map(habit => (
                    <div key={habit.id}>
                        <li className="habitName">{habit.name}</li>
                        <li>{habit.description}</li>
                        <li>{habit.count}</li>
                    </div>
                ))}
            </ul>
        </div>
    )
}

export default Habits
