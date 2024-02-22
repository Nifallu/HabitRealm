import {useState, useEffect} from "react";
import QuestModal from "../QuestFormModal/questFormModal";
import HabitModal from "../HabitsFormModal/HabitsFormModal";
import AbandonQuest from "../AbandonModal/abandonModal";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import { joinQuest, getQuestHabits } from "../../redux/quests";
import { useDispatch} from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./quests.css"
import DeleteQuestsHabits from "../DeleteModal/deleteModal";
import { updatedQuestProgress } from "../../redux/quests";

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

        const fetchAQuest = async (questId) => {
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

        const fetchData = async () => {
            try {
                await dispatch(getQuestHabits(questId))
                await fetchAQuest(questId);
            } catch (error) {
                console.log("Error fetching Habits", error.message)
            }
        }

        const handleUpdateQuestProgress = async (questId, habitId, action) => {
            await dispatch(updatedQuestProgress(questId, habitId, action));
            fetchAQuest(questId)
        }

        useEffect(()=>{
            fetchData();
        }, [questId, dispatch])

        useEffect(()=>{
            fetchAQuest(questId)
        }, [questId])

        useEffect(()=>{
            fetchQuests()
        }, [])

        const handleJoin = async (questId)=> {
            try {
                await dispatch(joinQuest(questId, sessionUser.id));
                fetchAQuest(questId)
            } catch (error) {
                console.log("Error joining quest:", error.message)
            }
        }
        // const handleAbandon = async(questId) => {
        //     if (window.confirm("Are you sure you want to abandon this quest?")){
        //         try {
        //             await dispatch(abandonQuest(questId, sessionUser.id))
        //             fetchAQuest(questId)
        //         } catch (error){
        //             console.error("Error abandoning quest:", error.message)
        //         }
        //     }
        // }

    return (
        <div>
            <div>
                <h2></h2>
            </div>
            <div className="questDetailBox">
            <div className="questHabits">
                {quest.Quest ? <>
                    <h2>Quest Habits</h2>
                    {sessionUser.id == quest.Quest.creator_id ?
                    <OpenModalMenuItem
                        itemText="Create Habit"
                        onItemClick={closeMenu}
                        modalComponent={<HabitModal fetchHabits={fetchData} habitId={null} questId={quest.Quest.id}/>}
                    /> : null}
                </> : null }
                {quest.Quest && quest.Quest.habits && Array.isArray(quest.Quest.habits) && quest.Quest.habits.length > 0 ? (
                    <ul>
                        {quest.Quest.habits.map((habit)=> (
                            <div key={habit.id} className="questHabit">
                            
                            <li className="habitName"><h3>{habit.name}</h3></li>
                            <li className="habitDescription">{habit.description}</li>
                            {quest.Quest && quest.Quest.user.some(user => user.id === sessionUser.id) ?
                            <div className="incrementButtons">
                                {/* {console.log(quest.Quest.habit_counter, quest.Quest.goal, quest.Quest.progress)} */}
                            <button onClick={()=>handleUpdateQuestProgress(quest.Quest.id, habit.id, "plus")}> + </button>
                            <button onClick={()=>handleUpdateQuestProgress(quest.Quest.id, habit.id, "minus")}> - </button>
                            </div> : null}
                            <div className="updateDeleteHabits">
                            {quest.Quest && sessionUser.id === quest.Quest.creator_id ? 
                                <>
                                    <OpenModalMenuItem
                                        itemText="Delete"
                                        onItemClick={closeMenu}
                                        modalComponent={<DeleteQuestsHabits fetches={fetchData} habitId={habit.id} />}
                                />
                            </> : null}
                            {quest.Quest && sessionUser.id === quest.Quest.creator_id ? 
                            <>
                            <OpenModalMenuItem
                                itemText="Update"
                                onItemClick={closeMenu}
                                modalComponent={<HabitModal fetchHabits={fetchData} habitId={habit.id} questId={null} habit={habit} />}
                            />
                            </> : null }
                            </div>
                        </div>
                        ))}
                    </ul>
                ): <p>No habits found for this quest</p>}
                </div>
                <div className="questDetails">
                    <h2>{quest.Quest ? quest.Quest.name : "Quest not found"}</h2>
                    <h3>Created by {quest.User}</h3>
                    <p>{quest.Quest ? quest.Quest.description: "No Description"}</p>
                    <div className="difficultReward">
                        <p>{quest.Quest ? <p>Difficulty: {quest.Quest.difficulty}</p>: "No difficulty"}</p>
                        <p>{quest.Quest ? <p>Reward: {quest.Quest.reward_points} <img src="Gem.png" alt="Gems"></img></p> :  "No Rewards"}</p>
                    </div>
                    <p className="progressWord">Progress</p>
                    {quest.Quest ? (
                    <div className="backProgressBar">
                        <div className="progressBar"
                            style={{width: `${quest.Quest.progress}%`}}
                        >{quest.Quest.progress}%</div>
                        </div> ) : null }
                    <div className="questButtons">
                        
                    {quest.Quest && !quest.Quest.user.some(user => user.id === sessionUser.id) ? (
                        <button onClick={() => handleJoin(quest.Quest.id)}>Join Quest</button>
                    ) : null}
                        {/* {quest.Quest && quest.Quest.user.some(user => user.id === sessionUser.id) ? (
                            <button onClick={() => handleAbandon(quest.Quest.id)}>Abandon Quest</button>
                        ) : null} */}
                        {quest.Quest && quest.Quest.user.some(user => user.id === sessionUser.id) ? 
                        <>
                        <OpenModalMenuItem
                            itemText="Abandon Quest"
                            onItemClick={closeMenu}
                            modalComponent={<AbandonQuest fetches={fetchAQuest} questId={quest.Quest.id}/>}
                        />
                        </> : null }
                        {quest.Quest && sessionUser.id === quest.Quest.creator_id ?
                            <>
                                    <OpenModalMenuItem
                                        itemText="Delete"
                                        onItemClick={closeMenu}
                                        modalComponent={<DeleteQuestsHabits fetches={fetchAQuest} HabitId={null} questId={quest.Quest.id} questDetailPage={true} />}
                                />
                            </>: null}
                        {quest.Quest && sessionUser.id === quest.Quest.creator_id? <OpenModalMenuItem
                            itemText="Update"
                            onItemClick={closeMenu}
                            modalComponent={<QuestModal fetchQuests={fetchAQuest} id={quest.Quest.id} quest={quest.Quest}/>}
                        />: null}
                    </div>
                </div>
                <div className="questList">
                    <h3>Other Quests</h3>
                    {Array.isArray(quests.Quests) && quests.Quests.length > 0 ? (
                        quests.Quests.map((quest) => (
                            <>{questId == quest.id ? null :
                            <div key={quest.id}>
                                <h4
                                    className="questName"
                                    onClick={sessionUser ? () => redirect(`/quests/${quest.id}`) : null}
                                >
                                    {quest.name}
                                </h4>
                                <div className="difficultyReward">
                                <li>Difficulty {quest.difficulty}</li>
                                <li>Reward {quest.reward_points} <img src="Gem.jpg"></img></li>
                                </div>
                                <hr></hr>
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
