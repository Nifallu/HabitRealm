import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUpdateQuest } from "../../redux/quests";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";

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
        <>
        <h1> {id ? 'Update Quest': 'Create Quest'}</h1>
        <form onSubmit={handleSubmit}>
            <label>
                Name
                <input
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
                    type="textarea"
                    value={description}
                    onChange={(e)=> setDescription(e.target.value)}
                    />
                </label>
                    {errors.description && <p>{errors.description}</p>}
                <label>
                    Difficulty
                    <select
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
            <button type="submit">{id ? 'Update Quest': 'Create Quest'}</button>
        </form>
        </>
    )
}

export default QuestModal;
