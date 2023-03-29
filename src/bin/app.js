const app = require('../index');
require('../config/db');

const PORT = process.env.PORT;

app.listen(PORT,()=>console.log(`App is running on PORT ${PORT}`));