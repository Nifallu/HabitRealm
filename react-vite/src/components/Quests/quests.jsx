import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import QuestModal from "../QuestFormModal/questFormModal";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteQuestsHabits from "../DeleteModal/deleteModal";

import "./quests.css"


const Quests =() => {
    const [quests, setQuests] = useState([])
    const [showMenu, setShowMenu] = useState(false);

    const sessionUser = useSelector(state => state.session.user)

    const redirect = useNavigate();

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

    return (
        <div className="QuestBlock">
            <ul>
                <h1>Quests</h1>
                {sessionUser ? <OpenModalMenuItem
                    itemText="Create Quest"
                    onItemClick={{closeMenu}}
                    modalComponent={<QuestModal fetchQuests={fetchQuests} />}
                /> : null }
                <div className="questBox">
                {Array.isArray(quests.Quests) && quests.Quests.length > 0 ? (
                    quests.Quests.map((quest) => (
                        <div key={quest.id} className="quests">
                        <h2
                            className="questName"
                            onClick={sessionUser ? () => redirect(`/quests/${quest.id}`) : null}
                        >
                            {quest.name}
                        </h2>
                            <li className="description">{quest.description}</li>
                            <div className="rewardDifficulty">
                            <li>Difficulty: {quest.difficulty}</li>
                            <li>Reward: {quest.reward_points} <img src="Gem.png" alt="Gems"></img></li>
                            <li>Progress:  {quest.progress}%</li>
                            </div>
                            <div className="updateDeleteQuests">
                            {sessionUser && sessionUser.id === quest.creator_id ? <>
                                <OpenModalMenuItem
                                        itemText="Delete"
                                        onItemClick={closeMenu}
                                        modalComponent={<DeleteQuestsHabits fetches={fetchQuests} habitId={null} questId={quest.id}/>}
                                />
                                <OpenModalMenuItem
                                    itemText="Update"
                                    onItemClick={closeMenu}
                                    modalComponent={<QuestModal fetchQuests={fetchQuests} id={quest.id} quest={quest}/>}
                                /></> : null}
                            </div>
                        </div>
                    ))
                ) : (
                    <h2>Craft your epic quest—forge destiny&apos;s tale!</h2>
                )}
                </div>
            </ul>
        </div>
    )
}


export default Quests
