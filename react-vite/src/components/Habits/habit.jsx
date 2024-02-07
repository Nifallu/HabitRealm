import {useState, useEffect} from "react";
import HabitModal from "../HabitsFormModal/HabitsFormModal";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import { deleteHabit } from "../../redux/habits";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import "./habits.css";

const Habits = () =>{
    const [habits, setHabits] = useState([])
    const [quests, setQuests] = useState([])
    const [showMenu, setShowMenu] = useState(false);
    const sessionUser = useSelector(state => state.session.user)
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

    const fetchQuests = async () => {
        const response = await fetch('api/quests')

        if(response.ok){
            const data = await response.json()
            setQuests(data)
        } else{
            throw new Error('Error fetching quests')
        }
    }

    useEffect(()=>{
        fetchQuests()
    }, [])

    useEffect(()=>{
        if (!sessionUser){
            console.log("No session user.")
        }
        fetchHabits()
    }, [sessionUser])

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
            {sessionUser ? (
            <ul>
                <h1>Habits</h1>
                <OpenModalMenuItem
                    itemText="Create Habit"
                    onItemClick={closeMenu}
                    modalComponent={<HabitModal fetchHabits={fetchHabits} />}
                />
                <div className="habitBox">
                {Array.isArray(habits.Habits) && habits.Habits.length > 0 ? (
                    habits.Habits.map((habit) => (
                        <div key={habit.id} className="habits">
                            <li className="habitName"><h3>{habit.name}</h3></li>
                            <li className="habitDescription">{habit.description}</li>
                            <div className="incrementButtons">
                            <button onClick={()=>alert('Feature coming soon')}> + </button>
                            <button onClick={()=>alert('Feature coming soon')}> - </button>
                            </div>
                            <div className="updateDelete">
                            <li className="habitCount">Count: {habit.count}</li>
                            <button onClick={()=> handleDelete(habit.id)}>Delete</button>
                            <OpenModalMenuItem
                                itemText="Update"
                                onItemClick={closeMenu}
                                modalComponent={<HabitModal fetchHabits={fetchHabits} id={habit.id} />}
                            />
                            </div>
                        </div>
                    ))
                    ) : (
                        <h2>Embark on the exciting journey to habit creation! The canvas is blank, each day a stroke of positive change. Let&apos;s craft a masterpiece of purposeful living, one habit at a time!</h2>
                    )}
                    </div>
                    <div>
                    <div className="habitBlock">
                    <div>
                        <h3>Quest Habits</h3>
                        <div className="questBox">
                            {Array.isArray(quests.Quests) && quests.Quests.length > 0 ? (
                                quests.Quests.map((quest) => (
                                    <div key={quest.id}>
                                        {console.log('Quest User', quest.user)}
                                        {console.log(quest.user.some(user => user.id === sessionUser.id))}
                                        <h3>{quest.name}</h3>
                                        {console.log(quest.habits)}
                                        {Array.isArray(quest.habits) && quest.habits.length > 0 ? (
                                            quest.habits.map((habitData) => (
                                                <div key={habitData.id} className="habits">
                                                    <h4>{habitData.name}</h4>
                                                    <p>{habitData.description}</p>
                                                    <div className="incrementButtons">
                                                        <button onClick={()=>alert('Feature coming soon')}> + </button>
                                                        <button onClick={()=>alert('Feature coming soon')}> - </button>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No habits for this quest</p>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p>No quests available</p>
                            )}
                        </div>
                    </div>
                </div>
                </div>
            </ul>
            ) : null }
        </div>
    )
}

export default Habits
