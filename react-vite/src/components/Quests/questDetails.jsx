import {useState, useEffect} from "react";
import QuestModal from "../QuestFormModal/questFormModal";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import { joinQuest, abandonQuest, deleteQuest, getQuestHabits } from "../../redux/quests";
import { useDispatch} from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./quests.css"

const QuestDetails =() => {
    const { questId } = useParams()
    const sessionUser = useSelector(state => state.session.user)
    const redirect = useNavigate()

    const [quest, setQuest] = useState({})
    const [quests, setQuests] = useState([])
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

        const fetchQuest = async (questId) => {
            const response = await fetch(`/api/quests/${questId}`)

            if(response.ok){
                const data = await response.json()
                setQuest(data)
            } else{
                throw new Error('Error fetching quest')
            }
        }

        const fetchQuests = async () => {
            const response = await fetch('/api/quests')

            if(response.ok){
                const data = await response.json()
                setQuests(data)
            } else{
                throw new Error('Error fetching quests')
            }
        }

        useEffect(()=>{
            const fetchData = async () => {
                try {
                    await fetchQuest(questId);
                    await dispatch(getQuestHabits(questId))
                } catch (error) {
                    console.log("Error fetching Habits", error.message)
                }
            }
            fetchData();
        }, [questId, dispatch])

        useEffect(()=>{
            fetchQuest(questId)
        }, [questId])

        useEffect(()=>{
            fetchQuests()
        }, [])

        const handleJoin = async (questId)=> {
            try {
                await dispatch(joinQuest(questId, sessionUser.id));
                fetchQuest(questId)
            } catch (error) {
                console.log("Error joining quest:", error.message)
            }
        }
        const handleAbandon = async(questId) => {
            if (window.confirm("Are you sure you want to abandon this quest?")){
                try {
                    await dispatch(abandonQuest(questId, sessionUser.id))
                    fetchQuest(questId)
                } catch (error){
                    console.error("Error abandoning quest:", error.message)
                }
            }
        }

        const handleDelete = async(questId) => {
            if (window.confirm ("Are you sure you want to delete this quest?")) {
                try {
                    await dispatch(deleteQuest(questId));
                    redirect('/quests')
            } catch (error) {
                console.error("Error deleting quest:", error.message);

            }
        }
    };

    return (
        <div>
            <div>
                <h2></h2>
            </div>
            <div className="questDetailBox">
            <div className="questHabits">
                <h2>Quest Habits</h2>
                {quest.Quest && quest.Quest.habits && quest.Quest.habits.length > 0 ? (
                    <ul>
                        {quest.Quest.habits.map((habit)=> (
                            <div key={habit.id} className="questHabit">
                            
                            <li className="habitName">{habit.name}</li>
                            <li className="habitDescription">{habit.description}</li>
                            <li>{habit.count}</li>
                            <div className="incrementButtons">
                            <button> + </button>
                            <button> - </button>
                            </div>
                            {/* <button onClick={()=> handleDelete(habit.id)}>Delete</button>
                            <OpenModalMenuItem
                                itemText="Update Habit"
                                onItemClick={closeMenu}
                                modalComponent={<HabitModal fetchHabits={fetchHabits} id={habit.id} />}
                            /> */}
                        </div>
                        ))}
                    </ul>
                ): <p>No habits found for this quest</p>}
                </div>
                <div className="questDetails">
                    <h2>{quest.Quest ? quest.Quest.name : "Quest not found"}</h2>
                    <h3>Created by {quest.User}</h3>
                    <p>{quest.Quest ? quest.Quest.description: "No Description"}</p>
                    <p>{quest.Quest ? quest.Quest.progress: "No Progress"}</p>
                    <p>{quest.Quest ? <p>Reward {quest.Quest.reward}</p>: "No Rewards"}</p>
                    {quest.Quest && !quest.Quest.user.some(user => user.id === sessionUser.id) ? (
                        <button onClick={() => handleJoin(quest.Quest.id)}>Join Quest</button>
                    ) : null}
                    {quest.Quest && quest.Quest.user.some(user => user.id === sessionUser.id) ? (
                        <button onClick={() => handleAbandon(quest.Quest.id)}>Abandon Quest</button>
                    ) : null}
                    {quest.Quest && sessionUser.id === quest.Quest.creator_id ? <button onClick={()=> handleDelete(quest.Quest.id)}>Delete</button>: null}
                    {quest.Quest && sessionUser.id === quest.Quest.creator_id? <OpenModalMenuItem
                        itemText="Update"
                        onItemClick={closeMenu}
                        modalComponent={<QuestModal fetchQuest={fetchQuest} id={quest.Quest.id} />}
                    />: null}
                </div>
                <div className="questList">
                    <h3>Other Quests</h3>
                    {Array.isArray(quests.Quests) && quests.Quests.length > 0 ? (
                        quests.Quests.map((quest) => (
                            <>{questId == quest.id ? null :
                            <div key={quest.id}>
                                <h4 className="questName">{quest.name}</h4>
                                <li>Difficulty {quest.difficulty}</li>
                                <li>Reward {quest.reward_points}</li>
                            </div>}
                            </>
                        ))
                    ) : (
                        <h2>No Other Quests Found</h2>
                    )}
                </div>
            </div>
            
        </div>
    );
}


export default QuestDetails
