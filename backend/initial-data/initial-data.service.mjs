import { Card } from "../handlers/cards/model/cardMongoose.mjs";
import { User } from "../handlers/auth/model/userMongoose.mjs";
import { initialData as data } from "./initial-data.mjs";
import bcrypt from "bcrypt";

// Функция для перемешивания массива
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Initializes the database with initial data if no users
export async function initializeData() {
  const userAmount = await User.find().countDocuments();

  if (!userAmount) {
    const userIds = [];
    // Iterate over each user
    for (const u of data.users) {
      const user = new User(u);
      user.password = await bcrypt.hash(user.password, 10);
      const obj = await user.save(); // Save the user to the database
      userIds.push(obj._id);
    }

    // Filter user IDs for business or admin users only
    const businessUserIds = [];
    for (const id of userIds) {
      const user = await User.findById(id);
      if (user.isBusiness || user.isAdmin) {
        businessUserIds.push(id);
      }
    }

    // Shuffle the cards 
    const shuffledCards = shuffleArray(data.cards);

    // Iterate over each card
    for (const c of shuffledCards) {
      const card = new Card(c);
      const i = Math.floor(Math.random() * businessUserIds.length);
      card.user_id = businessUserIds[i];
      await card.save(); // Save the card to the database
    }
  }
}
