import {useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import HabitModal from "../HabitsFormModal/HabitsFormModal";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteQuestsHabits from "../DeleteModal/deleteModal";
import { updateCount } from "../../redux/habits";
import { updatedQuestProgress } from "../../redux/quests";

import "./habits.css";

const Habits = () =>{
    const [habits, setHabits] = useState([])
    const [quests, setQuests] = useState([])
    const [showMenu, setShowMenu] = useState(false);
    const sessionUser = useSelector(state => state.session.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

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

    const handleUpdateCount = async (habitId, action) =>{
        dispatch(updateCount(habitId, action))
        fetchHabits()
    }

    const handleUpdateQuestProgress = async (questId, habitId, action) => {
        await dispatch(updatedQuestProgress(questId, habitId, action));
        fetchQuests()
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
                        <>
                        {habit.quests.length < 1 ? 
                            <div key={habit.id} className="habits">
                                <li className="habitName"><h3>{habit.name}</h3></li>
                                <li className="habitDescription">{habit.description}</li>
                                <div className="incrementButtons">
                                <button onClick={()=>handleUpdateCount(habit.id, "plus")} > + </button>
                                <button onClick={()=>handleUpdateCount(habit.id, "minus")}> - </button>
                                </div>
                                <div className="updateDelete">
                                <li className="habitCount">Count: {habit.count}</li>
                                <OpenModalMenuItem
                                        itemText="Delete"
                                        onItemClick={closeMenu}
                                        modalComponent={<DeleteQuestsHabits fetches={fetchHabits} habitId={habit.id}/>}
                                />
                                <OpenModalMenuItem
                                    itemText="Update"
                                    onItemClick={closeMenu}
                                    modalComponent={<HabitModal fetchHabits={fetchHabits} id={habit.id} questId={null} habit={habit} />}
                                />
                                </div>
                            </div> : null}
                        </>
                    ))
                    ) : (
                        <h2>Embark on the exciting journey to habit creation! The canvas is blank, each day a stroke of positive change. Let&apos;s craft a masterpiece of purposeful living, one habit at a time!</h2>
                    )}
                    </div>
                    <hr></hr>
                    <div>
                    <div className="habitBlock">
                    <div>
                        <h2>Quest Habits</h2>
                        <div className="habitBox">
                            {Array.isArray(quests.Quests) && quests.Quests.length > 0 ? (
                                quests.Quests.map((quest) => (
                                    <>
                                        {quest.user.some(user => user.id === sessionUser.id) ?
                                        <div key={quest.id} className='habitQuests'>
                                            <h3
                                                className="habitQuestName"
                                                onClick={() => navigate(`/quests/${quest.id}`)}
                                            >{quest.name}</h3>
                                            <p>Progress</p> 
                                            <div className="backProgressBar">
                                            <div className="progressBar"
                                                style={{width: `${quest.progress *5}px`}}>{quest.progress}%</div>
                                            </div>                           
                                            {Array.isArray(quest.habits) && quest.habits.length > 0 ? (
                                                quest.habits.map((habitData) => (
                                                    <div key={habitData.id} className="habits">
                                                        <h4>{habitData.name}</h4>
                                                        <p>{habitData.description}</p>
                                                        <div className="incrementButtons">
                                                            <button onClick={()=>handleUpdateQuestProgress(quest.id, habitData.id, "plus")}> + </button>
                                                            <button onClick={()=>handleUpdateQuestProgress(quest.id, habitData.id, "minus")}> - </button>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p>No habits for this quest</p>
                                            )}
                                        </div> : null}
                                    </>
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
