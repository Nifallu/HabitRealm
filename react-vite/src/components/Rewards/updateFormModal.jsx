import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { thunkEditReward, thunkGetRewards } from '../../redux/rewards'
import { useNavigate } from "react-router-dom";


const categoryOptions = ['background', 'body', 'skin', 'extras', 'hair']
const categoryImages = {
    background: ['https://i.ibb.co/JBwz8LH/background-red.png', 'https://i.ibb.co/1bF5v1W/background-purple.png', 
                'https://i.ibb.co/zbXwZ5P/background-blue.png', 'https://i.ibb.co/6sMQDqN/background-green.png',
                'https://i.ibb.co/rcYhxWX/background-mountain-waterfall.png', 'https://i.ibb.co/PhGq4Zd/background-underwater-cave.png',
                'https://i.ibb.co/5Fnhnh1/background-iridescent-clouds.png', 'https://i.ibb.co/0Xwp4GY/background-sailboat-at-sunset.png',
                'https://i.ibb.co/12TXVH4/background-beach-with-dunes.png', 'https://i.ibb.co/vZM3gbc/background-enchanted-music-room.png'],

    body: ['https://i.ibb.co/JmwT8yy/broad-shirt-yellow.png', 'https://i.ibb.co/HVbvq5D/broad-shirt-green.png',
        'https://i.ibb.co/RQbfvmw/broad-shirt-blue.png', 'https://i.ibb.co/nz6sR90/broad-shirt-black.png',
        'https://i.ibb.co/ByH1TB0/slim-shirt-zombie.png', 'https://i.ibb.co/qBGfRT5/slim-shirt-rainbow.png',
        'https://i.ibb.co/KDPFBNy/slim-shirt-fire.png', 'https://i.ibb.co/kccfnx5/slim-shirt-cross.png',
        'https://i.ibb.co/pWBd4jk/slim-shirt-ocean.png', 'https://i.ibb.co/J3rBPX3/slim-shirt-thunder.png'],

    skin: ['https://i.ibb.co/prBQc0z/skin-f5a76e.png', 'https://i.ibb.co/f8Bbv9n/skin-c06534.png',
        'https://i.ibb.co/89JTjmY/skin-915533.png', 'https://i.ibb.co/VYmny7d/skin-ea8349.png',
        'https://i.ibb.co/ZdFXq26/skin-2b43f6.png', 'https://i.ibb.co/zH7dH9J/skin-rainbow.png',
        'https://i.ibb.co/BswFg5k/skin-d7a9f7.png', 'https://i.ibb.co/0cSjy8Z/skin-6bd049.png',
        'https://i.ibb.co/j4FgH41/skin-eb052b.png', 'https://i.ibb.co/7XRmSyt/skin-f69922.png'],

    extras: ['https://i.ibb.co/mJRFW6v/icon-back-special-wolf-Tail.png','https://i.ibb.co/KhTnkWN/head-Accessory-special-fox-Ears.png',
        'https://i.ibb.co/sVwSRr0/icon-back-special-fox-Tail.png', 'https://i.ibb.co/s5KQPZM/eyewear-special-black-Top-Frame.png',
        'https://i.ibb.co/XY46wqm/eyewear-special-red-Top-Frame.png', 'https://i.ibb.co/YDQhRjS/eyewear-special-blue-Top-Frame.png',
        'https://i.ibb.co/B41LKfy/eyewear-special-green-Top-Frame.png', 'https://i.ibb.co/64RdzLJ/head-Accessory-special-wolf-Ears.png',
        'https://i.ibb.co/hYKFYH7/button-chair-black.png', 'https://i.ibb.co/0f8Xtjg/head-Accessory-special-cactus-Ears.png'],

    hair: ['https://i.ibb.co/PT2zJbD/hair-base-16-white.png', 'https://i.ibb.co/HG8RrDX/hair-bangs-3-white.png',
        'https://i.ibb.co/cvv4DjY/hair-bangs-4-white.png','https://i.ibb.co/nsCdCY8/hair-base-16-red.png',
        'https://i.ibb.co/JCy9B0z/hair-bangs-3-red.png', 'https://i.ibb.co/mq4RxJ7/hair-bangs-4-red.png',
        'https://i.ibb.co/165hfzL/hair-base-16-brown.png', 'https://i.ibb.co/1Qz4dHJ/hair-bangs-3-brown.png',
        'https://i.ibb.co/K0fWqpM/hair-bangs-4-brown.png', 'https://i.ibb.co/8DHpG0h/hair-base-16-blond.png',
        'https://i.ibb.co/7NyRjy7/hair-bangs-3-blond.png', 'https://i.ibb.co/R3Zgtnm/hair-bangs-4-blond.png',
        'https://i.ibb.co/BKxD7XZ/hair-base-16-black.png', 'https://i.ibb.co/NxXCs82/hair-bangs-3-black.png',
        'https://i.ibb.co/xmZ8kv5/hair-bangs-4-black.png', 'https://i.ibb.co/qp7Hwz4/hair-bangs-1-rainbow.png',
        'https://i.ibb.co/j371Yfw/hair-bangs-1-green.png', 'https://i.ibb.co/fMYKStR/hair-bangs-1-blue.png',
        'https://i.ibb.co/B6hnRGn/hair-bangs-1-purple.png', 'https://i.ibb.co/511sVjc/hair-bangs-1-TRUred.png']
}


function UpdateRewardModal({ rewardData }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const sessionUser = useSelector((state) => state.session.user);
    const [formData, setFormData] = useState({
        name: rewardData.name || '',
        description: rewardData.description || '',
        image: rewardData.image || '',
        category: rewardData.category || 'background',
        creator_id: rewardData.creator_id || sessionUser.id,
    });
    const [errorMessage, setErrorMessage] = useState(null);
    const redirect = useNavigate();

    useEffect(() => {
        if (rewardData) {
            setFormData({
                name: rewardData.name || '',
                description: rewardData.description || '',
                image: rewardData.image || '',
                category: rewardData.category || 'background',
                creator_id: rewardData.creator_id || sessionUser.id,
            });
            }
        }, [rewardData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCategoryChange = (e) => {
        setFormData({
            ...formData,
            category: e.target.value,
            image: '',
        });
    };

    const handleImageChange = (e) => {
        setFormData({
            ...formData,
            image: e.target.value,
        });
    };
    
    const handleUpdateReward = async () => {
        try {
            if (formData.name.length < 3 || formData.name.length > 40){
                setErrorMessage('Name must be between 3 and 40 characters')
                return;
            }
            if (formData.description.length < 3 || formData.description.length > 100){
                setErrorMessage('Description must be between 3 and 100 characters')
                return;
            }
            if (!formData.image) {
                setErrorMessage('Please select an image for the reward.');
                return;
            }
            
            await dispatch(thunkEditReward(rewardData.id, formData));
            await dispatch(thunkGetRewards())
            closeModal();
        } catch (error) {
            console.error('Error creating reward:', error);
            setErrorMessage('Error creating reward. Please try again.');
        }
    };

    return (
        <div className='rewardModal'>
            <label>
                Category:
                <select name="category" value={formData.category} onChange={handleCategoryChange} className='rewardInput'>
                    {categoryOptions.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </label>
            <br />
            <label className='outRadioButtons'>
                Image:
                {formData.category && categoryImages[formData.category].map((img) => (
                    <label key={img}>
                        <input
                            type="radio"
                            name="image"
                            value={img}
                            checked={formData.image === img}
                            onChange={handleImageChange}
                        />
                        <img src={img} alt={img} style={{ height: '50px', marginRight: '5px' }} />
                    </label>
                ))}
            </label>
            <br />
            <label>
                Name:
                <input
                    className='rewardInput'
                    type="string"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange} />
            </label>
            <label>
                Description:
                <input
                    className='rewardInput'
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange} />
            </label>
            
            {errorMessage && <div>{errorMessage}</div>}
            <button onClick={handleUpdateReward}>Update Reward</button>
        </div>
    );
}

export default UpdateRewardModal;