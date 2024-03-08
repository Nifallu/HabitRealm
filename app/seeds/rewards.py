from app.models import db, environment, SCHEMA
from app.models.reward import Reward
from sqlalchemy.sql import text

def seed_rewards():

    # Backgrounds
    background1 = Reward(
        name='Red Background',
        description='a red background',
        cost=0,
        attack=0,
        defense=0,
        speed=0,
        accuracy=0,
        image='https://i.ibb.co/JBwz8LH/background-red.png',
        category='background'
    )

    background2 = Reward(
        name='purple Background',
        description='a purple background',
        cost=0,
        attack=0,
        defense=0,
        speed=0,
        accuracy=0,
        image='https://i.ibb.co/1bF5v1W/background-purple.png',
        category='background'
    )

    background3 = Reward(
        name='blue Background',
        description='a blue background',
        cost=0,
        attack=0,
        defense=0,
        speed=0,
        accuracy=0,
        image='https://i.ibb.co/zbXwZ5P/background-blue.png',
        category='background'
    )

    background4 = Reward(
        name='green Background',
        description='a green background',
        cost=0,
        attack=0,
        defense=0,
        speed=0,
        accuracy=0,
        image='https://i.ibb.co/6sMQDqN/background-green.png',
        category='background'
    )

    background5 = Reward(
        name='Mountain Background',
        description='a mountain and waterfall background',
        cost=50,
        attack=0,
        defense=5,
        speed=0,
        accuracy=0,
        image='https://i.ibb.co/rcYhxWX/background-mountain-waterfall.png',
        category='background'
    )

    background6 = Reward(
        name='Underwater Background',
        description='an underwater background',
        cost=100,
        attack=5,
        defense=5,
        speed=0,
        accuracy=0,
        image='https://i.ibb.co/PhGq4Zd/background-underwater-cave.png',
        category='background'
    )

    background7 = Reward(
        name='Clouds Background',
        description='up in the clouds background',
        cost=100,
        attack=0,
        defense=5,
        speed=0,
        accuracy=5,
        image='https://i.ibb.co/5Fnhnh1/background-iridescent-clouds.png',
        category='background'
    )

    background8 = Reward(
        name='sailboat Background',
        description='on a sailboat during sunset background',
        cost=150,
        attack=10,
        defense=0,
        speed=5,
        accuracy=0,
        image='https://i.ibb.co/0Xwp4GY/background-sailboat-at-sunset.png',
        category='background'
    )

    background9 = Reward(
        name='beach Background',
        description='on a beach background',
        cost=50,
        attack=0,
        defense=0,
        speed=0,
        accuracy=5,
        image='https://i.ibb.co/12TXVH4/background-beach-with-dunes.png',
        category='background'
    )

    background10 = Reward(
        name='music room Background',
        description='in a music room background',
        cost=100,
        attack=0,
        defense=10,
        speed=0,
        accuracy=0,
        image='https://i.ibb.co/vZM3gbc/background-enchanted-music-room.png',
        category='background'
    )

    # Body

    body1 = Reward(
        name='Yellow Shirt',
        description='yellow Shirt',
        cost=0,
        attack=0,
        defense=0,
        speed=0,
        accuracy=0,
        image='https://i.ibb.co/JmwT8yy/broad-shirt-yellow.png',
        category='body'
    )
    

    body2 = Reward(
        name='Green Shirt',
        description='A green shirt',
        cost=0,
        attack=0,
        defense=0,
        speed=0,
        accuracy=0,
        image='https://i.ibb.co/HVbvq5D/broad-shirt-green.png',
        category='body'
    )

    body3 = Reward(
        name='Blue shirt',
        description='a blue shirt',
        cost=0,
        attack=0,
        defense=0,
        speed=0,
        accuracy=0,
        image='https://i.ibb.co/RQbfvmw/broad-shirt-blue.png',
        category='body'
    )

    body4 = Reward(
        name='Dark Gray Shirt',
        description='A dark gray shirt',
        cost=0,
        attack=0,
        defense=0,
        speed=0,
        accuracy=0,
        image='https://i.ibb.co/nz6sR90/broad-shirt-black.png',
        category='body'
    )

    body5 = Reward(
        name='Zombie Shirt',
        description='A shirt that turns you into a zombie',
        cost=150,
        attack=5,
        defense=10,
        speed=0,
        accuracy=0,
        image='https://i.ibb.co/ByH1TB0/slim-shirt-zombie.png',
        category='body'
    )

    body6 = Reward(
        name='Rainbow Shirt',
        description='A magical rainbow shirt',
        cost=200,
        attack=5,
        defense=5,
        speed=5,
        accuracy=5,
        image='https://i.ibb.co/qBGfRT5/slim-shirt-rainbow.png',
        category='body'
    )

    body7 = Reward(
        name='Flame Shirt',
        description='a shirt that is made of fire',
        cost=150,
        attack=0,
        defense=10,
        speed=5,
        accuracy=0,
        image='https://i.ibb.co/KDPFBNy/slim-shirt-fire.png',
        category='body'
    )

    body8 = Reward(
        name='Defender Shirt',
        description='A white shirt with red cross symbolizing a defender',
        cost=200,
        attack=0,
        defense=20,
        speed=0,
        accuracy=0,
        image='https://i.ibb.co/kccfnx5/slim-shirt-cross.png',
        category='body'
    )

    body9 = Reward(
        name='Ocean Shirt',
        description='A shirt with the calming power of the ocean',
        cost=150,
        attack=5,
        defense=0,
        speed=0,
        accuracy=10,
        image='https://i.ibb.co/pWBd4jk/slim-shirt-ocean.png',
        category='body'
    )

    body10 = Reward(
        name='Lightening Shirt',
        description='A shirt with the power of lightening',
        cost=150,
        attack=10,
        defense=0,
        speed=5,
        accuracy=0,
        image='https://i.ibb.co/J3rBPX3/slim-shirt-thunder.png',
        category='body'
    )

    # Skin
    skin1 = Reward(
        name='Light Skin',
        description='Light skin tone',
        cost=0,
        attack=0,
        defense=0,
        speed=0,
        accuracy=0,
        image='https://i.ibb.co/prBQc0z/skin-f5a76e.png',
        category='skin'
    )

    skin2 = Reward(
        name='Medium Skin',
        description='Medium skin tone',
        cost=0,
        attack=0,
        defense=0,
        speed=0,
        accuracy=0,
        image='https://i.ibb.co/f8Bbv9n/skin-c06534.png',
        category='skin'
    )

    skin3 = Reward(
        name='Dark Skin',
        description='Dark skin tone',
        cost=0,
        attack=0,
        defense=0,
        speed=0,
        accuracy=0,
        image='https://i.ibb.co/89JTjmY/skin-915533.png',
        category='skin'
    )

    skin4 = Reward(
        name=' Medium Light Skin',
        description='Medium light skin tone',
        cost=0,
        attack=0,
        defense=0,
        speed=0,
        accuracy=0,
        image='https://i.ibb.co/VYmny7d/skin-ea8349.png',
        category='skin'
    )

    skin5 = Reward(
        name='Dark Blue Skin',
        description='Dark blue skin tone',
        cost=50,
        attack=0,
        defense=0,
        speed=5,
        accuracy=0,
        image='https://i.ibb.co/ZdFXq26/skin-2b43f6.png',
        category='skin'
    )

    skin6 = Reward(
        name='Rainbow Skin',
        description='Rainbow skin tone',
        cost=200,
        attack=5,
        defense=5,
        speed=5,
        accuracy=5,
        image='https://i.ibb.co/zH7dH9J/skin-rainbow.png',
        category='skin'
    )

    skin7 = Reward(
        name='Purple Skin',
        description='Purple skin tone',
        cost=100,
        attack=5,
        defense=5,
        speed=0,
        accuracy=0,
        image='https://i.ibb.co/BswFg5k/skin-d7a9f7.png',
        category='skin'
    )

    skin8 = Reward(
        name='Green Skin',
        description='Green skin tone',
        cost=100,
        attack=0,
        defense=10,
        speed=0,
        accuracy=0,
        image='https://i.ibb.co/0cSjy8Z/skin-6bd049.png',
        category='skin'
    )

    skin9 = Reward(
        name='Red Skin',
        description='Bright red skin tone',
        cost=150,
        attack=10,
        defense=5,
        speed=0,
        accuracy=0,
        image='https://i.ibb.co/j4FgH41/skin-eb052b.png',
        category='skin'
    )

    skin10 = Reward(
        name='fake tan Skin',
        description='Orange skin tone',
        cost=50,
        attack=0,
        defense=5,
        speed=0,
        accuracy=0,
        image='https://i.ibb.co/7XRmSyt/skin-f69922.png',
        category='skin'
    )

    #Hair
    hair1= Reward(
        name='White 1',
        description='Big white hair',
        cost=0,
        attack=0,
        defense=0,
        speed=0,
        accuracy=0,
        image='https://i.ibb.co/PT2zJbD/hair-base-16-white.png',
        category='hair'
    )

    hair2= Reward(
        name='White 2',
        description='medium white hair',
        cost=0,
        attack=0,
        defense=0,
        speed=0,
        accuracy=0,
        image='https://i.ibb.co/HG8RrDX/hair-bangs-3-white.png',
        category='hair'
    )

    hair3= Reward(
        name='White 3',
        description='Curly White hair',
        cost=0,
        attack=0,
        defense=0,
        speed=0,
        accuracy=0,
        image='https://i.ibb.co/cvv4DjY/hair-bangs-4-white.png',
        category='hair'
    )

    hair4= Reward(
        name='Orange 1',
        description='Big orange hair',
        cost=0,
        attack=0,
        defense=0,
        speed=0,
        accuracy=0,
        image='https://i.ibb.co/nsCdCY8/hair-base-16-red.png',
        category='hair'
    )

    hair5= Reward(
        name='Orange 2',
        description='medium orange hair',
        cost=0,
        attack=0,
        defense=0,
        speed=0,
        accuracy=0,
        image='https://i.ibb.co/JCy9B0z/hair-bangs-3-red.png',
        category='hair'
    )

    hair6= Reward(
        name='Orange 3',
        description='curly orange hair',
        cost=0,
        attack=0,
        defense=0,
        speed=0,
        accuracy=0,
        image='https://i.ibb.co/mq4RxJ7/hair-bangs-4-red.png',
        category='hair'
    )

    hair7= Reward(
        name='Brown 1',
        description='Big Brown hair',
        cost=0,
        attack=0,
        defense=0,
        speed=0,
        accuracy=0,
        image='https://i.ibb.co/165hfzL/hair-base-16-brown.png',
        category='hair'
    )

    hair8= Reward(
        name='Brown 2',
        description='Medium brown hair',
        cost=0,
        attack=0,
        defense=0,
        speed=0,
        accuracy=0,
        image='https://i.ibb.co/1Qz4dHJ/hair-bangs-3-brown.png',
        category='hair'
    )

    hair9= Reward(
        name='Brown 3',
        description='Curly Brown hair',
        cost=0,
        attack=0,
        defense=0,
        speed=0,
        accuracy=0,
        image='https://i.ibb.co/K0fWqpM/hair-bangs-4-brown.png',
        category='hair'
    )

    hair10= Reward(
        name='Blond 1',
        description='Big blond hair',
        cost=0,
        attack=0,
        defense=0,
        speed=0,
        accuracy=0,
        image='https://i.ibb.co/8DHpG0h/hair-base-16-blond.png',
        category='hair'
    )

    hair11= Reward(
        name='Blond 2',
        description='medium blond hair',
        cost=0,
        attack=0,
        defense=0,
        speed=0,
        accuracy=0,
        image='https://i.ibb.co/7NyRjy7/hair-bangs-3-blond.png',
        category='hair'
    )

    hair12= Reward(
        name='Blond 3',
        description='curly blond hair',
        cost=0,
        attack=0,
        defense=0,
        speed=0,
        accuracy=0,
        image='https://i.ibb.co/R3Zgtnm/hair-bangs-4-blond.png',
        category='hair'
    )

    hair13= Reward(
        name='Black 1',
        description='big black hair',
        cost=0,
        attack=0,
        defense=0,
        speed=0,
        accuracy=0,
        image='https://i.ibb.co/BKxD7XZ/hair-base-16-black.png',
        category='hair'
    )

    hair14= Reward(
        name='Black 2',
        description='medium black hair',
        cost=0,
        attack=0,
        defense=0,
        speed=0,
        accuracy=0,
        image='https://i.ibb.co/NxXCs82/hair-bangs-3-black.png',
        category='hair'
    )

    hair15= Reward(
        name='black 3',
        description='curly black hair',
        cost=0,
        attack=0,
        defense=0,
        speed=0,
        accuracy=0,
        image='https://i.ibb.co/xmZ8kv5/hair-bangs-4-black.png',
        category='hair'
    )

    hair16= Reward(
        name='Rainbow',
        description='Rainbow Hair',
        cost=200,
        attack=5,
        defense=5,
        speed=5,
        accuracy=5,
        image='https://i.ibb.co/qp7Hwz4/hair-bangs-1-rainbow.png',
        category='hair'
    )

    hair17= Reward(
        name='Green',
        description='Green Hair',
        cost=50,
        attack=5,
        defense=0,
        speed=0,
        accuracy=0,
        image='https://i.ibb.co/j371Yfw/hair-bangs-1-green.png',
        category='hair'
    )

    hair18= Reward(
        name='Blue',
        description='Blue Hair',
        cost=50,
        attack=0,
        defense=5,
        speed=0,
        accuracy=0,
        image='https://i.ibb.co/fMYKStR/hair-bangs-1-blue.png',
        category='hair'
    )

    hair19= Reward(
        name='Purple',
        description='purple hair',
        cost=50,
        attack=0,
        defense=0,
        speed=5,
        accuracy=0,
        image='https://i.ibb.co/B6hnRGn/hair-bangs-1-purple.png',
        category='hair'
    )

    hair20= Reward(
        name='Red',
        description='Red Hair',
        cost=50,
        attack=0,
        defense=0,
        speed=0,
        accuracy=5,
        image='https://i.ibb.co/511sVjc/hair-bangs-1-TRUred.png',
        category='hair'
    )

    # extras

    extra1= Reward(
        name='Gray Cat Tail',
        description='Gray Cat Tail',
        cost=100,
        attack=0,
        defense=5,
        speed=5,
        accuracy=0,
        image='https://i.ibb.co/mJRFW6v/icon-back-special-wolf-Tail.png',
        category='extras'
    )

    extra2= Reward(
        name='Fox Ears',
        description='Fox Ears',
        cost=100,
        attack=5,
        defense=0,
        speed=0,
        accuracy=5,
        image='https://i.ibb.co/KhTnkWN/head-Accessory-special-fox-Ears.png',
        category='extras'
    )

    extra3= Reward(
        name='Fox Tail',
        description='Fox Tail',
        cost=100,
        attack=0,
        defense=0,
        speed=5,
        accuracy=5,
        image='https://i.ibb.co/sVwSRr0/icon-back-special-fox-Tail.png',
        category='extras'
    )

    extra4= Reward(
        name='Black Glasses',
        description='Black Glasses',
        cost=50,
        attack=0,
        defense=0,
        speed=0,
        accuracy=5,
        image='https://i.ibb.co/s5KQPZM/eyewear-special-black-Top-Frame.png',
        category='extras'
    )

    extra5= Reward(
        name='Red Glasses',
        description='Red Glasses',
        cost=50,
        attack=0,
        defense=0,
        speed=5,
        accuracy=0,
        image='https://i.ibb.co/XY46wqm/eyewear-special-red-Top-Frame.png',
        category='extras'
    )

    extra6= Reward(
        name='Blue Glasses',
        description='Blue Glasses',
        cost=50,
        attack=0,
        defense=5,
        speed=0,
        accuracy=0,
        image='https://i.ibb.co/YDQhRjS/eyewear-special-blue-Top-Frame.png',
        category='extras'
    )

    extra7= Reward(
        name='Green Glasses',
        description='Green Glasses',
        cost=50,
        attack=5,
        defense=0,
        speed=0,
        accuracy=0,
        image='https://i.ibb.co/B41LKfy/eyewear-special-green-Top-Frame.png',
        category='extras'
    )

    extra8= Reward(
        name='Gray Cat Ears',
        description='Gray Cat Ears',
        cost=100,
        attack=5,
        defense=0,
        speed=5,
        accuracy=0,
        image='https://i.ibb.co/64RdzLJ/head-Accessory-special-wolf-Ears.png',
        category='extras'
    )


    extra9= Reward(
        name='Wheel Chair',
        description='Wheel Chair',
        cost=100,
        attack=0,
        defense=0,
        speed=10,
        accuracy=5,
        image='https://i.ibb.co/hYKFYH7/button-chair-black.png',
        category='extras'
    )

    extra10= Reward(
        name='Flowers',
        description='Flower Headband',
        cost=100,
        attack=5,
        defense=0,
        speed=0,
        accuracy=5,
        image='https://i.ibb.co/0f8Xtjg/head-Accessory-special-cactus-Ears.png',
        category='extras'
    )

    db.session.add_all([background1, background2, background3, background4, background5, background6, background7, background8, background9, background10,
                        body1, body2, body3, body4, body5, body6, body7, body8, body9, body10,
                        skin1, skin2, skin3, skin4, skin5, skin6, skin7, skin8, skin9, skin10,
                        hair1, hair2, hair3, hair4, hair5, hair6, hair7, hair8, hair9, hair10, hair11, hair12, hair13, hair14, hair15, hair16, hair17, hair18, hair19, hair20,
                        extra1, extra2, extra3, extra4, extra5, extra6, extra7, extra8, extra9, extra10
                        ])
    db.session.commit()

def undo_rewards():
    if environment == "production":
        db.session.execute(f"DELETE FROM {SCHEMA}.rewards CASCADE;")
    else:
        db.session.execute(text("DELETE FROM rewards;"))

    db.session.commit()