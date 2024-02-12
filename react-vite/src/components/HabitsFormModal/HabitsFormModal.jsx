import { useState } from "react";
import { useDispatch} from "react-redux";
import { createHabit } from "../../redux/habits";
import { useModal } from "../../context/Modal";
import "./HabitsForm.css"
import { useEffect } from "react";

function HabitModal({fetchHabits, habitId, questId, habit} ) {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [frequency, setFrequency] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    useEffect(() => {
        if (habit) {
            setName(habit.name || "");
            setDescription(habit.description || "");
            setFrequency(habit.frequency || "");
        }
    }, [habit]);

    const handleSubmit = async (e) => {

        e.preventDefault();

        const habitData = {
        name,
        description,
        frequency,
        };

        const validatedFrequency = parseInt(frequency, 10);
        if (validatedFrequency < 1) {
            setErrors({ frequency: "Reset must be a positive number" });
            return;
        }

        if (name.length < 4 || name.length > 40) {
            return setErrors({ name: "Name must be between 4 - 40 characters" });
        }

        const serverResponse = await dispatch(createHabit(habitData, habitId, questId));
        if (serverResponse.errors) {
            setErrors(serverResponse.errors);
        } else {
            fetchHabits()
            closeModal()
        }
        
    };

    return (
        <div className="createHabitModal">
        <h1>{habitId ? 'Update Habit': 'Create Habit'}</h1>
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
                Count Reset Interval in Days
                <input
                    className="habitInput"
                    type="number"
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    required
                />
            </label>
            {errors.frequency && <p>{errors.frequency}</p>}
            <button type="submit" className="submit">{habitId ? 'Update Habit': 'Create Habit'}</button>
        </form>
        </div>
    );
}

export default HabitModal;
