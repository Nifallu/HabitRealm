import {useState, useEffect} from "react";
import QuestModal from "../QuestFormModal/questFormModal";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import { deleteQuest } from "../../redux/quests";
import { useDispatch} from "react-redux";

const Quests =() => {
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
                <OpenModalMenuItem
                    itemText="Create Quest"
                    onItemClick={{closeMenu}}
                    modalComponent={<QuestModal fetchQuests={fetchQuests} />}
                />
                {console.log("quest", quests.Quests)}
                {Array.isArray(quests.Quests) && quests.Quests.length > 0 ? (
                    quests.Quests.map((quest) => (
                        <div key={quest.id}>
                            <button> + </button>
                            <li className="questName">{quest.name}</li>
                            <li>{quest.description}</li>
                            <li>Difficulty {quest.difficulty}</li>
                            <button> - </button>
                            <button onClick={()=> handleDelete(quest.id)}>Delete</button>
                            <OpenModalMenuItem
                                itemText="Update Quest"
                                onItemClick={closeMenu}
                                modalComponent={<QuestModal fetchQuests={fetchQuests} id={quest.id} />}
                            />
                        </div>
                    ))
                ) : (
                    <h2>Craft your epic quest—forge destiny&apos;s tale!</h2>
                )}
                
            </ul>
        </div>
    )
}


export default Quests
