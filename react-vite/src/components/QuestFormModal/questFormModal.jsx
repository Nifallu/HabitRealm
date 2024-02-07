import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUpdateQuest } from "../../redux/quests";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import "./questFormModal.css"

function QuestModal({fetchQuests, id}){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const[name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const questData = {
            name,
            description,
            difficulty,
        };

        const serverResponse = await dispatch(createUpdateQuest(questData, id));
        if (serverResponse.errors) {
            setErrors(serverResponse.errors);
        } else {
            fetchQuests()
            closeModal()
        }
    };

    return (
        <div className="createQuestModal">
        <h1> {id ? 'Update Quest': 'Create Quest'}</h1>
        <form onSubmit={handleSubmit} className="createQuestForm">
            <label>
                Name
                <input
                    className="questInput"
                    type="text"
                    value={name}
                    onChange={(e)=> setName(e.target.value)}
                    required
                />
            </label>
            {errors.name && <p>{errors.name}</p>}
            <label>
                Description
                <input
                    className="questInput"
                    type="textarea"
                    value={description}
                    onChange={(e)=> setDescription(e.target.value)}
                    />
                </label>
                    {errors.description && <p>{errors.description}</p>}
                <label>
                    Difficulty
                    <select
                    className="questInput"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    required
                    >
                    {[...Array(10).keys()].map((i) => (
                        <option key={i + 1} value={i + 1}>
                        {i + 1}
                        </option>
                    ))}
                    </select>
                </label>
            {errors.difficulty && <p>{errors.difficulty}</p>}
            <button type="submit" className="submit">{id ? 'Update Quest': 'Create Quest'}</button>
        </form>
        </div>
    )
}

export default QuestModal;
