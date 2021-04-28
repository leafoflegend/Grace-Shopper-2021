const { Artist, Album } = require('../db/index');

const artistRouter = require('express').Router();

artistRouter.get('/', async (req, res, next) => {
  try {
    const artists = await Artist.findAll();
    // const testHTML = `<html><body><p1>Hello World: details for all artists</p1></body></html>`;
    res.send(artists); // enter correct
  } catch (error) {
    console.log('error occured in /api/artists');
    next(error);
  }
});

artistRouter.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const artist = await Artist.findByPk(id, { include: [Album] });
    // const testHTML = `<html><body><p1>Hello World: details for single artist with id of ${id}</p1></body></html>`;
    res.send(artist);
  } catch (error) {
    console.log('error occured in /api/artists/:id');
    next(error);
  }
});

module.exports = artistRouter;
