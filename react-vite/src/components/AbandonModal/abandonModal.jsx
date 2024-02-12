import { useModal } from '../../context/Modal';
import { useDispatch} from "react-redux";
import { abandonQuest } from '../../redux/quests';
import { useSelector } from "react-redux";



const AbandonQuest = ({fetches, questId}) =>{
    const { closeModal }= useModal();
    const sessionUser = useSelector(state => state.session.user)

    const dispatch=useDispatch();

    const handleAbandon = async () => {
    try {
        await dispatch(abandonQuest(questId, sessionUser.id))
        fetches(questId)
        closeModal()
    } catch (error){
        console.error("Error abandoning quest:", error.message)
    }
    }

    return (
        <div className='DeleteModal'>
        <h1>Confirm Abandon</h1>
        <h2>Are you Sure you want to abandon this Quest</h2>
        <div className='deleteButtons'>
        <button onClick={handleAbandon} className='delete'>Yes (Abandon)</button>
        <button onClick={()=> closeModal()} className='keep'>No (Stay)</button>
        </div>
        </div>
    )
}

export default AbandonQuest
