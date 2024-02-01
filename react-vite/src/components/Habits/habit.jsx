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
            {console.log(habits.Habits)}
            <ul>
                <h1>Habits</h1>
                <button>Create Habit</button>
                {Array.isArray(habits.Habits) && habits.Habits.length > 0 ? (
                    habits.Habits.map((habit) => (
                        <div key={habit.id}>
                            <button> + </button>
                            <li className="habitName">{habit.name}</li>
                            <li>{habit.description}</li>
                            <li>{habit.count}</li>
                            <button> - </button>
                        </div>
                    ))
                    ) : (
                        <h2>Embark on the exciting journey to habit creation! The canvas is blank, each day a stroke of positive change. Let&apos;s craft a masterpiece of purposeful living, one habit at a time!</h2>
                    )}
            </ul>
        </div>
    )
}

export default Habits
