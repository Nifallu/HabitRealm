import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createHabit } from "../../redux/habits";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import "./HabitsForm.css"

function HabitModal({fetchHabits, id} ) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [frequency, setFrequency] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const habitData = {
        name,
        description,
        frequency,
        };

        const serverResponse = await dispatch(createHabit(habitData, id));
        if (serverResponse.errors) {
            setErrors(serverResponse.errors);
        } else {
            fetchHabits()
            closeModal()
        }
        
    };

    return (
        <div className="createHabitModal">
        <h1>{id ? 'Update Habit': 'Create Habit'}</h1>
        <form onSubmit={handleSubmit} className="createHabitForm">
            <label>
                Name
                <input 
                    className="habitInput"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </label>
            {errors.name && <p>{errors.name}</p>}
            <label>
                Description
                <input
                    className="habitInput"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </label>
            {errors.description && <p>{errors.description}</p>}
            <label>
                Frequency
                <input
                    className="habitInput"
                    type="number"
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    required
                />
            </label>
            {errors.frequency && <p>{errors.frequency}</p>}
            <button type="submit" className="submit">{id ? 'Update Habit': 'Create Habit'}</button>
        </form>
        </div>
    );
}

export default HabitModal;
