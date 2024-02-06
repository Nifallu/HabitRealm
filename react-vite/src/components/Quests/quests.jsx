import {useState, useEffect} from "react";
import QuestModal from "../QuestFormModal/questFormModal";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import { deleteQuest, getQuests } from "../../redux/quests";
import { useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./quests.css"


const Quests =() => {
    const [quests, setQuests] = useState([])
    const [showMenu, setShowMenu] = useState(false);

    const sessionUser = useSelector(state => state.session.user)

    const dispatch=useDispatch();
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
            // await dispatch(getQuests);
        }

        useEffect(()=>{
            fetchQuests()
        }, [])

        const handleDelete = async(questId) => {
            if (window.confirm ("Are you sure you want to delete this quest?")) {
                try {
                    await dispatch(deleteQuest(questId));
                    fetchQuests();
            } catch (error) {
                console.error("Error deleting quest:", error.message);

            }
        }
    };

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
                            <li>{quest.description}</li>
                            <li>Difficulty {quest.difficulty}</li>
                            <li>Progress (coming soon) {quest.progress}</li>
                            <li>Reward {quest.reward_points}</li>
                            {sessionUser && sessionUser.id === quest.creator_id ? <>
                            <button onClick={()=> handleDelete(quest.id)}>Delete</button>
                            <OpenModalMenuItem
                                itemText="Update Quest"
                                onItemClick={closeMenu}
                                modalComponent={<QuestModal fetchQuests={fetchQuests} id={quest.id} />}
                            /></> : null}
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
