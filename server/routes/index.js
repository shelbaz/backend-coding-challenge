export default (app) => {

    app.get('/', (req, res) => res.status(200).send({
      message: 'Default endpoint',
    }));

    app.post('/suggestions', (req, res) => res.status(200).send({
        message: 'Suggestions endpoint',
    })); 
  };