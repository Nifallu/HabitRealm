import { useModal } from '../../context/Modal';
import { useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteHabit } from "../../redux/habits";
import { deleteQuest } from '../../redux/quests';


const DeleteQuestsHabits = ({fetches, habitId,  questId, questDetailPage}) =>{
    const { closeModal }= useModal();

    const redirect = useNavigate()
    const dispatch=useDispatch();

    const handleDelete = async () => {
        console.log(habitId)
        try {
        if(habitId){
            await dispatch(deleteHabit(habitId));
            fetches()
        } else {
            await dispatch(deleteQuest(questId));
            if(questDetailPage){
                redirect('/quests')
            } else {
                fetches()
            }
        }
        closeModal();
    } catch (error) {
        console.error(`Error deleting ${questId? 'Quest': 'Habit'}:`, error.message);
    }
    }

    return (
        <div className='DeleteModal'>
        <h1>Confirm Delete</h1>
        <h2>Are you Sure you want to abandon this {(questId)  ? 'Quest' : 'Habit'}</h2>
        <div className='deleteButtons'>
        <button onClick={handleDelete} className='delete'>Yes (Delete)</button>
        <button onClick={()=> closeModal()} className='keep'>No (Keep)</button>
        </div>
        </div>
    )
}

export default DeleteQuestsHabits
