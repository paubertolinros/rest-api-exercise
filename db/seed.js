require('dotenv').config();
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const Show = require('../models/Show');

const shows = [
  {
    title: "The Simpsons",
    creator: "Matt Groening",
    launched: 1989,
    genre: "comedy",
    image: "https://ychef.files.bbci.co.uk/976x549/p02fc1jw.jpg",
    description: "The series is a satirical depiction of American life, epitomized by the Simpson family, which consists of Homer, Marge, Bart, Lisa, and Maggie. The show is set in the fictional town of Springfield and parodies American culture and society, television, and the human condition."
  },
  {
    title: "Arrested Development",
    creator: "Mitchell Hurwitz",
    launched: 2003,
    genre: "comedy",
    image: "https://occ-0-999-300.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABchP8x-0SfepLFsRGK-e2xXKA4Qpwdz_zPrbqXYJQ-pVW1LdqSQCZwVu2PyeYsIISaapRtcpBDGnD0UwAc0W1CQ27MsK2n2y966m.jpg?r=e46",
    description: "Level-headed son Michael Bluth takes over family affairs after his father is imprisoned. But the rest of his spoiled, dysfunctional family are making his job unbearable."
  },
  {
    title: "Euphoria",
    creator: "Sam Levinson",
    launched: 2019,
    genre: "drama",
    image: "https://eresmama.com/wp-content/uploads/2022/03/euphoria-hbo-serie-2048x1536.jpg",
    description: "Bla vla vlandddk dsdljfsidohfjoisdf sdfisjdfsd"
  }
]

mongoose
  .connect(process.env.MONGO_URL)
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .then(() => {
    return Show.create(shows)
  })
  .then((created) => {
    console.log(`Inserted ${created.length} shows in the database`)
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  })
  .finally(() => {
    mongoose.connection.close()
  })