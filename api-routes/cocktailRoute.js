/**
 * File Notes:
 *  I understand referencing req.app.db is NOT a valid structure.
 *  Mock db is only loaded once for the app, and referenced here throughout
 *  Actual back-end requests would occur in a Promise with error catch
 *  To collect API data, I used  'node-fetch' and copied it into JSON formatted file
 *  RESTful API learning resource: https://restfulapi.net/http-methods/
 */
import express from 'express'
import { v4 as uuidv4 } from 'uuid'
const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *   Cocktail:
 *    type: object
 *    required:
 *     - idDrink
 *     - strDrink
 *    properties:
 *     idDrink:
 *      type: string
 *      description: The drink ID
 *     strDrink:
 *      type: string
 *      description: The drink name
 *     strDrinkAlternate:
 *      type: string
 *      description: The alternate drink name
 *     strTags:
 *      type: string
 *      description: The drink tags
 *     strVideo:
 *      type: string
 *      description: The video URL
 *     strCategory:
 *      type: string
 *      description: The drink category
 *     strIBA:
 *      type: string
 *      description:
 *     strAlcoholic:
 *      type: string
 *      description: The drink alcohol content
 *     strGlass:
 *      type: string
 *      description: The drink's best glass type
 *     strInstructions:
 *      type: string
 *      description: 
 *     strInstructionsES:
 *      type: string
 *      description:
 *     strInstructionsDE:
 *      type: string
 *      description:
 *     strInstructionsFR:
 *      type: string
 *      description:
 *     strInstructionsIT:
 *      type: string
 *      description:
 *     strInstructionsZH-HANS:
 *      type: string
 *      description:
 *     strInstructionsZH-HANT:
 *      type: string
 *      description:
 *     strDrinkThumb:
 *      type: string
 *      description:
 *     strIngredient1:
 *      type: string
 *      description:
 *     strIngredient2:
 *      type: string
 *      description:
 *     strIngredient3:
 *      type: string
 *      description:
 *     strIngredient4:
 *      type: string
 *      description:
 *     strIngredient5:
 *      type: string
 *      description:
 *     strIngredient6:
 *      type: string
 *      description:
 *     strIngredient7:
 *      type: string
 *      description:
 *     strIngredient8:
 *      type: string
 *      description:
 *     strIngredient9:
 *      type: string
 *      description:
 *     strIngredient10:
 *      type: string
 *      description:
 *     strIngredient11:
 *      type: string
 *      description:
 *     strIngredient12:
 *      type: string
 *      description:
 *     strIngredient13:
 *      type: string
 *      description:
 *     strIngredient14:
 *      type: string
 *      description:
 *     strIngredient15:
 *      type: string
 *      description:
 *     strMeasure1:
 *      type: string
 *      description:
 *     strMeasure2:
 *      type: string
 *      description:
 *     strMeasure3:
 *      type: string
 *      description:
 *     strMeasure4:
 *      type: string
 *      description:
 *     strMeasure5:
 *      type: string
 *      description:
 *     strMeasure6:
 *      type: string
 *      description:
 *     strMeasure7:
 *      type: string
 *      description:
 *     strMeasure8:
 *      type: string
 *      description:
 *     strMeasure9:
 *      type: string
 *      description:
 *     strMeasure10:
 *      type: string
 *      description:
 *     strMeasure11:
 *      type: string
 *      description:
 *     strMeasure12:
 *      type: string
 *      description:
 *     strMeasure13:
 *      type: string
 *      description:
 *     strMeasure14:
 *      type: string
 *      description:
 *     strMeasure15:
 *      type: string
 *      description:
 *     strImageSource:
 *      type: string
 *      description:
 *     strImageAttribution:
 *      type: string
 *      description:
 *     strCreativeCommonsConfirmed:
 *      type: string
 *      description:
 *     dateModified:
 *      type: string
 *      description: The last date modified or created
 *    example:
 *     idDrink: 123_abc
 *     strDrink: Tennie Special
 *     strDrinkAlternate: null
 *     strTags: IBAContemporaryClassicAlcoholicUSAAsiaVeganCitrusBrunchHangoverMild
 *     strVideo: null
 *     strCategory: Cocktail
 *     strIBA: Contemporary Classics
 *     strAlcoholic: Alcoholic
 *     strGlass: Highball glass
 *     strInstructions: Muddle mint leaves with sugar and lime juice. Add a splash of soda water and fill the glass with cracked ice. Pour the rum and top with soda water. Garnish and serve with straw.
 *     strInstructionsES: null
 *     strInstructionsDE: Minzblätter mit Zucker und Limettensaft verrühren. Füge einen Spritzer Sodawasser hinzu und fülle das Glas mit gebrochenem Eis. Den Rum eingießen und mit Sodawasser übergießen. Garnieren und mit einem Strohhalm servieren.
 *     strInstructionsFR: null
 *     strInstructionsIT: Pestare le foglie di menta con lo zucchero e il succo di lime.\r\nAggiungere una spruzzata di acqua di seltz e riempi il bicchiere con ghiaccio tritato.\r\nVersare il rum e riempire con acqua di seltz.\r\nGuarnire con una fetta di lime servire con una cannuccia.
 *     strInstructionsZH-HANS: null
 *     strInstructionsZH-HANT: null
 *     strDrinkThumb: https://www.thecocktaildb.com/images/media/drink/metwgh1606770327.jpg
 *     strIngredient1: Light rum
 *     strIngredient2: Lime
 *     strIngredient3: Sugar
 *     strIngredient4: Mint
 *     strIngredient5: Soda water
 *     strIngredient6: null
 *     strIngredient7: null
 *     strIngredient8: null
 *     strIngredient9: null
 *     strIngredient10: null
 *     strIngredient11: null
 *     strIngredient12: null
 *     strIngredient13: null
 *     strIngredient14: null
 *     strIngredient15: null
 *     strMeasure1: 2-3 oz 
 *     strMeasure2: Juice of 1 
 *     strMeasure3: 2 tsp 
 *     strMeasure4: 2-4 
 *     strMeasure5: null
 *     strMeasure6: null
 *     strMeasure7: null
 *     strMeasure8: null
 *     strMeasure9: null
 *     strMeasure10: null
 *     strMeasure11: null
 *     strMeasure12: null
 *     strMeasure13: null
 *     strMeasure14: null
 *     strMeasure15: null
 *     strImageSource: https://pixabay.com/photos/cocktail-mojito-cocktail-recipe-5096281/
 *     strImageAttribution: anilaha https://pixabay.com/users/anilaha-16242978/
 *     strCreativeCommonsConfirmed: Yes
 *     dateModified: 2016-11-04 09:17:09
 *   Ingredient:
 *    type: object
 *    required:
 *     - idIngredient
 *     - strIngredient
 *    properties:
 *     idIngredient:
 *      type: string
 *      description:
 *     strIngredient:
 *      type: string
 *      description:
 *     strDescription:
 *      type: string
 *      description:
 *     strType:
 *      type: string
 *      description:
 *     strAlcohol:
 *      type: string
 *      description:
 *     strABV:
 *      type: string
 *      description:
 *    example:
 *     idIngredient: 305
 *     strIngredient: Light Rum
 *     strDescription: Light rums, also referred to as \"silver\" or \"white\" rums, in general, have very little flavor aside from a general sweetness. Light rums are sometimes filtered after aging to remove any colour. The majority of light rums come from Puerto Rico. Their milder flavors make them popular for use in mixed drinks, as opposed to drinking them straight. Light rums are included in some of the most popular cocktails including the Mojito and the Daiquiri.
 *     strType: Rum
 *     strAlcohol: Yes"
 *     strABV: null
 *   Cocktail Thumb:
 *    type: object
 *    required:
 *     - strDrink
 *    properties:
 *     strDrink:
 *      type: string
 *      description:
 *     strDrinkThumb:
 *      type: string
 *      description:
 *    example:
 *     strDrink: Tennie Special
 *     strDrinkThumb: https://www.thecocktaildb.com/images/media/drink/metwgh1606770327.jpg
 */

/**
 * @swagger
 * tags:
 *  name: Cocktails
 *  description: The cocktails managing API
 */

/**
 * @swagger
 * tags:
 *  name: Ingredients
 *  description: The ingredients managing API
 */

/**
 * @swagger
 * /cocktail/search:
 *  get:
 *   summary: List all cocktails by first letter | Search cocktail by name
 *   tags: [Cocktails]
 *   parameters:
 *    - in: query
 *      name: name
 *      schema:
 *       type: string
 *      required: false
 *      description: Drink Name
 *    - in: query
 *      name: alt-name
 *      schema:
 *       type: string
 *      required: false
 *      description: Alternate Name
 *    - in: query
 *      name: first-letter
 *      schema:
 *       type: string
 *      required: false
 *      description: First letter of drink name
 *   responses:
 *    200:
 *     description: The list of drinks
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/Cocktail'
 * 
 */
router.get('/search', (req, res) => {
  const drinks = req.app.db.data['drinks'];
  const name = req.query['name'];
  const altName = req.query['alt-name'];
  const fLetter = req.query['first-letter'];
  let result = [];

  if (name || altName)
    result = drinks.filter(({ strDrink, strDrinkAlternate }) =>
      (name && strDrink && strDrink.toLowerCase() === name.toLowerCase())
      || (altName && strDrinkAlternate && strDrinkAlternate.toLowerCase() === altName.toLowerCase())
    );
  else if (fLetter)
    result = drinks.filter(({ strDrink }) => strDrink[0].toLowerCase() === fLetter.toLowerCase());

  if (result && result.length)
    return res.status(200).send(result);
  else
    return res.status(200).send('No drinks found');
});

/**
 * @swagger
 * /cocktail/filter:
 *  get:
 *   summary: Filter by Alcoholic Content | Ingredient | Category | Glass
 *   tags: [Cocktails]
 *   parameters:
 *    - in: query
 *      name: ingredient
 *      schema:
 *       type: string
 *      required: false
 *      description: Included ingredient
 *    - in: query
 *      name: content
 *      schema:
 *       type: string
 *      required: false
 *      description: Alcohol content
 *    - in: query
 *      name: category
 *      schema:
 *       type: string
 *      required: false
 *      description: Category of drink
 *    - in: query
 *      name: glass-type
 *      schema:
 *       type: string
 *      required: false
 *      description: Glass type for drink
 *   responses:
 *    200:
 *     description: The list of drink thumbnails
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/Cocktail Thumb'
 *    404:
 *     description: The drink was not found
 */
router.get('/filter', (req, res) => {
  const drinks = req.app.db.data['drinks'];
  const ingredient = req.query['ingredient'];
  const alcoholic = req.query['content'];
  const category = req.query['category'];
  const glass = req.query['glass-type'];

  let filterDrinks = drinks;
  let result = [];
  const filterKeys = ["strIngredient1",
    "strIngredient2",
    "strIngredient3",
    "strIngredient4",
    "strIngredient5",
    "strIngredient6",
    "strIngredient7",
    "strIngredient8",
    "strIngredient9",
    "strIngredient10",
    "strIngredient11",
    "strIngredient12",
    "strIngredient13",
    "strIngredient14",
    "strIngredient15"];
  if (ingredient)
    filterDrinks = filterDrinks.filter(function (d) {
      for (let key of filterKeys) {
        if (d[key] !== undefined && d[key] === ingredient)
          return true;
      }
      return false;
    });
  if (alcoholic)
    filterDrinks = filterDrinks.filter(({ strAlcoholic }) => strAlcoholic === alcoholic);
  if (category)
    filterDrinks = filterDrinks.filter(({ strCategory }) => strCategory && strCategory.toLowerCase() === category.toLowerCase())
  if (glass)
    filterDrinks = filterDrinks.filter(({ strGlass }) => strGlass && strGlass.toLowerCase() === glass.toLowerCase());

  for (let d of filterDrinks) {
    result.push({ strDrink: d.strDrink, strDrinkThumb: d.strDrinkThumb });
  }
  if (result && result.length)
    return res.status(200).send(result);
  else
    return res.status(200).send('No drinks found');
});

/**
 * @swagger
 * /cocktail/lookup/{id}:
 *  get:
 *   summary: Lookup full cocktail details by id
 *   tags: [Cocktails]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: The drink id
 *   responses:
 *    200:
 *     description: The list of drinks
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/Cocktail'
 *    404:
 *     description: The drink was not found
 */
router.get('/lookup/:id', (req, res) => {
  const drinks = req.app.db.data['drinks'];
  const result = drinks.filter(({ idDrink }) => idDrink === req.params.id);

  if (result && result.length)
    return res.status(200).send(result);
  else
    return res.status(200).send('No drink found');
});

/**
 * @swagger
 * /cocktail/random:
 *  get:
 *   summary: Lookup a random cocktail 
 *   tags: [Cocktails]
 *   responses:
 *    200:
 *     description: A random drink
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/Cocktail'
 *    404:
 *     description: A drink was not found
 */
router.get('/random', (req, res) => {
  const drinks = req.app.db.data['drinks'];
  const index = Math.floor(Math.random() * drinks.length);

  if (drinks.length)
    return res.status(200).send(drinks[index]);
  else
    return res.status(200).send('No drink found');
})

/**
 * @swagger
 * /cocktail:
 *  put:
 *   summary: Update or Create a drink
 *   tags: [Cocktails]
 *   consumes:
 *    - application/json
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#components/schemas/Cocktail'
 *   responses:
 *    200:
 *     description: Drink was updated
 *    201:
 *     description: Created a new drink
 */
router.put('/', (req, res) => {
  let drinks = req.app.db.data['drinks'];
  const reqDrink = req.body;
  let index = -1;

  if (reqDrink.idDrink)
    index = drinks.findIndex(({ idDrink }) => idDrink === reqDrink.idDrink);

  if (index >= 0) {
    drinks[index] = { ...drinks[index], ...reqDrink, dateModified: formatDate(new Date()) };
    req.app.db.write();
    return res.status(200).send('Drink was updated');
  } else {
    /* CREATE in a PUT request is optional - send a 201 */
    drinks.push({ ...reqDrink, idDrink: uuidv4(), dateModified: formatDate(new Date()) });
    req.app.db.write();
    return res.status(201).send('Created a new drink');
  }
});

/**
 * @swagger
 * /cocktail/{id}:
 *  put:
 *   summary: Update or Create a drink by id
 *   tags: [Cocktails]
 *   consumes:
 *    - application/json
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#components/schemas/Cocktail'
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: The drink id
 *   responses:
 *    200:
 *     description: Drink was updated
 *    201:
 *     description: Created a new drink
 */
router.put('/:id', (req, res) => {
  let drinks = req.app.db.data['drinks'];
  const reqDrink = req.body;
  let index = -1;

  index = drinks.findIndex(({ idDrink }) => idDrink === req.params.id);

  if (index >= 0) {
    drinks[index] = { ...reqDrink, idDrink: req.params.id, dateModified: formatDate(new Date()) };
    req.app.db.write();
    return res.status(200).send('Drink was updated');
  } else {
    /* CREATE in a PUT request is optional - send a 201 */
    drinks.push({ ...reqDrink, idDrink: uuidv4(), dateModified: formatDate(new Date()) });
    req.app.db.write();
    return res.status(201).send('Created a new drink');
  }
});

/**
 * @swagger
 * /cocktail/:
 *  post:
 *   summary: Create a new drink
 *   tags: [Cocktails]
 *   consumes:
 *    - application/json
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#components/schemas/Cocktail'
 *   responses:
 *    409:
 *     description: Drink already exists - resources unchanged
 *    201:
 *     description: Created a new drink
 */
router.post('/', (req, res) => {
  let drinks = req.app.db.data['drinks'];
  const reqDrink = req.body;
  let index = -1;

  if (reqDrink.idDrink)
    index = drinks.findIndex(({ idDrink }) => idDrink === reqDrink.idDrink);

  if (index >= 0)
    return res.status(409).send('Drink already exists - resources unchanged');
  else {
    drinks.push({ ...reqDrink, idDrink: uuidv4(), dateModified: formatDate(new Date()) });
    req.app.db.write();
    return res.status(201).send('Created a new drink');
  }
});

/**
 * @swagger
 * /cocktail/{id}:
 *  patch:
 *   summary: Update a drink
 *   tags: [Cocktails]
 *   consumes:
 *    - application/json
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#components/schemas/Cocktail' 
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: The drink id
 *   responses:
 *    200:
 *     description: Drink was updated
 *    404:
 *     description: Drink was not found - resources unchanged
 */
router.patch('/:id', (req, res) => {
  let drinks = req.app.db.data['drinks'];
  const reqUpd = req.body;
  let index = -1;

  index = drinks.findIndex(({ idDrink }) => idDrink === req.params.id);

  if (index < 0)
    return res.status(404).send("Drink was not found - resources unchanged");
  else {
    drinks[index] = { ...drinks[index], ...reqUpd, idDrink: drinks[index].idDrink, dateModified: formatDate(new Date()) }
    req.app.db.write();
    return res.status(200).send(`Drink ID ${drinks[index].idDrink} was updated`);
  }
});

/**
 * @swagger
 * /cocktail/{id}:
 *  delete:
 *   summary: Remove the drink by id
 *   tags: [Cocktails]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: The drink id
 *   responses:
 *    200:
 *     description: Drink was deleted
 *    404:
 *     description: Could not find drink to delete
 */
router.delete('/:id', (req, res) => {
  let drinks = req.app.db.data['drinks'];
  let index = -1;

  index = drinks.findIndex(({ idDrink }) => idDrink === req.params.id);

  if (index >= 0) {
    drinks.splice(index, 1);
    req.app.db.write();
    return res.status(200).send(`Drink ID ${req.params.id} has been deleted`);
  } else {
    return res.status(404).send(`Drink ID ${req.params.id} could not be found - resources unchanged`);
  }
});

/**
 * @swagger
 * /cocktail/ingredient/search:
 *  get:
 *   summary: Search ingredient by name
 *   tags: [Ingredients]
 *   parameters:
 *    - in: query
 *      name: name
 *      schema:
 *       type: string
 *      required: false
 *      description: The ingredient name
 *   responses:
 *    200:
 *     description: The list of ingredients
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/Ingredient'
 *    404:
 *     description: The ingredient was not found
 */
 router.get('/ingredient/search', (req, res) => {
  const ingredients = req.app.db.data['ingredients'];
  const name = req.query['name'];
  let result = [];

  if (name)
    result = ingredients.filter(({ strIngredient }) => strIngredient.toLowerCase() === name.toLowerCase());

  return res.status(200).send(result);
});

/**
 * @swagger
 * /cocktail/ingredient/lookup/{id}:
 *  get:
 *   summary: Lookup ingredient by ID
 *   tags: [Ingredients]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: The ingredient id
 *   responses:
 *    200:
 *     description: The list of ingredients
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/Ingredient'
 *    404:
 *     description: The ingredient was not found
 */
router.get('/ingredient/lookup/:id', (req, res) => {
  const ingredients = req.app.db.data['ingredients'];
  const result = ingredients.filter(({ idIngredient }) => idIngredient === req.params.id);

  if (result && result.length)
    return res.status(200).send(result);
  else
    return res.status(200).send('No drink found');
})

/* Helper Functions */
function formatDate(date) {
  return (
    [
      date.getFullYear(),
      (date.getMonth() + 1).toString().padStart(2, '0'),
      date.getDate().toString().padStart(2, '0'),
    ].join('-') +
    ' ' +
    [
      date.getHours().toString().padStart(2, '0'),
      date.getMinutes().toString().padStart(2, '0'),
      date.getSeconds().toString().padStart(2, '0'),
    ].join(':')
  );
}

export default router;
