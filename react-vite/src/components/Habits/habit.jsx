import {useState, useEffect} from "react";
import HabitModal from "../HabitsFormModal/HabitsFormModal";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import { deleteHabit } from "../../redux/habits";
import { useDispatch } from "react-redux";

const Habits = () =>{
    const [habits, setHabits] = useState([])
    const [showMenu, setShowMenu] = useState(false);
    const dispatch=useDispatch();

    const toggleMenu = (e) => {
        e.stopPropagation();
        setShowMenu(!showMenu);
        };
        
        useEffect(() => {
            if (!showMenu) return;
        
            const closeMenu = (e) => {
            if (ulRef.current && !ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
            };
        
            document.addEventListener("click", closeMenu);
        
            return () => document.removeEventListener("click", closeMenu);
        }, [showMenu]);
        
        const closeMenu = () => setShowMenu(false);

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

    const handleDelete = async (habitId) => {
        if (window.confirm("Are you sure you want to delete this habit?")) {
            try {
                await dispatch(deleteHabit(habitId));
                fetchHabits();
            } catch (error) {
                console.error("Error deleting habit:", error.message);
            }
        }
    };

    return (
        <div className="habitBlock">
            {console.log(habits.Habits)}
            <ul>
                <h1>Habits</h1>
                <OpenModalMenuItem
                    itemText="Create Habit"
                    onItemClick={closeMenu}
                    modalComponent={<HabitModal fetchHabits={fetchHabits} />}
                />
                {Array.isArray(habits.Habits) && habits.Habits.length > 0 ? (
                    habits.Habits.map((habit) => (
                        <div key={habit.id}>
                            <button> + </button>
                            <li className="habitName">{habit.name}</li>
                            <li>{habit.description}</li>
                            <li>{habit.count}</li>
                            <li>Frequency: {habit.frequency}</li>
                            <button> - </button>
                            <button onClick={()=> handleDelete(habit.id)}>Delete</button>
                            <OpenModalMenuItem
                                itemText="Update Habit"
                                onItemClick={closeMenu}
                                modalComponent={<HabitModal fetchHabits={fetchHabits} id={habit.id} />}
                            />
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
