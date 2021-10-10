const axios = require('axios');

async function getUser() {
  try {
    const response = await axios.get('/sql/get/client/', {
      data: {
        attributes: ['id', 'firstname', 'surname', 'gender', 'clientnumber'],
        where: {
          id: 1,
        },
      },
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
export default getUser;
