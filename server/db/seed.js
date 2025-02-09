const faker = require('faker')

const db = require('./db');
const {
  OrderDetail,
  OrderItem,
  Artist,
  Album,
  Review,
  User,
  UserAddress,
} = require('./index');

const syncAndSeed = async () => {
  try {
    await db.sync({ force: true });

    // --------- creating bands ---------
    const bandNames = Array(20).fill(1).map(album => `${faker.company.bsAdjective()} ${faker.name.firstName()}`);

    const bandPromises = [];

    bandNames.forEach(name => {
      bandPromises.push(Artist.create({
        name,
        description: faker.company.catchPhraseDescriptor()
      }))
    });

    await Promise.all(bandPromises);

    // --------- creating albums ---------
    const albumNamesArray = Array(200).fill(1).map(album => `${faker.lorem.words(3)}`);
    const genres = ['ROCK', 'JAZZ', 'POP', 'METAL', 'OTHER'];

    const albumPromises = [];

    albumNamesArray.forEach(title => {
      const bandId = Math.floor(Math.random() * 19) + 1;

      albumPromises.push(Album.create({
        title,
        description: faker.commerce.productDescription(),
        genre: genres[Math.floor(Math.random() * 4)],
        year: Math.floor(Math.random() * (2021 - 1700 + 1)) + 1700,
        price: Math.floor(Math.random() * (300 - 29 + 1)) + 29.99,
        quantity: Math.floor(Math.random() * 25) + 1,
        artistId: bandId
      }));

    });

    await Promise.all(albumPromises);

    // --------- creating users ---------
    const usersArray = Array(20).fill(1).map(user => faker.name.firstName());

    const userPromises = [];

    usersArray.forEach(first_name => {
      const lastName = faker.name.lastName();
      userPromises.push(User.create({
        first_name,
        last_name: lastName,
        email_address: `${first_name[0].toLowerCase()}${lastName.replace(/'/g, "").toLowerCase()}@gmail.com`,
        password: '123',
        // admin
      }));
    });

    await Promise.all(userPromises);

    // --------- creating reviews ---------
    const reviewsArray = Array(20).fill(1).map(stars => Math.floor(Math.random() * 5) + 1);
    const usersdata = await User.findAll();
    const userIds = usersdata.map(user => user.id); // array of user Ids since they're UUID type

    const reviewPromises = [];

    reviewsArray.forEach(stars => {
      reviewPromises.push(Review.create({
        stars,
        comment: faker.lorem.sentence(4),
        userId: userIds[Math.floor(Math.random() * 20) + 1],
        albumId: Math.floor(Math.random() * 200) + 1
      }));
    });

    await Promise.all(reviewPromises);


    // const order = await OrderDetail.create({
    //   total: 19.99,
    //   status: 'IN PROGRESS',
    // });
    // const review = await Review.create({
    //   comment: 'This album has all my favorite jams.',
    //   stars: 5,
    // });
    // const user = await User.create({
    //   email_address: 'test@gmail.com',
    //   password: 'supersecret',
    // });
    // const artist = await Artist.create({
    //   name: 'Pinkk Flloyd',
    //   description: 'One of those boy bands from the 70s.',
    // });
    // const album = await Album.create({
    //   title: 'The Wall',
    //   description: 'A good record',
    //   genre: 'ROCK',
    //   year: 1973,
    //   price: 19.99,
    //   quantity: 20,
    //   photoUrl:
    //     'https://www.thestudentplaylist.com/wp-content/uploads/2019/11/pink_floyd_the_wall.jpg',
    // });

    // const item = await OrderItem.create({
    //   quantity: 2,
    //   albumId: album.id,
    //   order_detailId: order.id,
    // });

    // await album.setArtist(artist);
    // await review.setAlbum(album);
    // await review.setUser(user);
    // await order.setUser(user);
  } catch (error) {
    console.log('error seeding database!', error);
  }
};

module.exports = syncAndSeed;
