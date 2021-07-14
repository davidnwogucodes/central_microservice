const axios = require("axios");
const { ApiError } = require("../error_messages/apiError");

// const { default: axios } = require("axios");

module.exports = {
  centerSystem: async (req, res, next) => {
    try {
      const { userId, carId, review, ratings } = req.body;
      const user = await axios.get(`http://localhost:8092/fetchUser/${userId}`);
      if (!user) {
        throw new ApiError("cannot find user", 404);
      }
      const car = await axios.get(`http://localhost:8099/getCar/${carId}`);
      const username = user.data.getUser.Name;
      const carname = car.data.car.carName;
      const carReview = await axios.post("http://localhost:8060/createReview", {
        username,
        carname,
        review,
        ratings,
      });
      console.log(carReview.data);
      //   console.log(car.data.car.carName);
      res.send("sent");
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  buyCar: async (req, res, next) => {
    try {
      const { userId, carId } = req.body;
      const user = await axios.get(
        `http://localhost:8092/fetchUser/${userId}`
      ); /*worked*/
      if (!user) {
        throw new NotFoundError("user not found", 404);
      }
      const car = await axios.get(`http://localhost:8099/getCar/${carId}`);
      //   console.log(car);
      //   console.log(user);
      res.json({
        receipt: {
          buyer: {
            id: user.data.getUser._id,
            name: user.data.getUser.Name,
          },
          car: {
            id: car.data.car.carId,
            name: car.data.car.carName,
          },
        },
      });
    } catch (error) {
      //   res.json({ message: error.message });
      next(error);
    }
  },
};
