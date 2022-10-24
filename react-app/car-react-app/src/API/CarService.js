import axios from "axios";

export default class CarService {
  static async getAll() {
    try {
      const apiURL = "/cars";
      const response = await axios.get(apiURL);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }

  static async deleteCar(id) {
    await axios.delete(`/cars/` + id);
  }

  static async updateCar(editedCar) {
    const body = {
      id: editedCar.id,
      name: editedCar.name,
      price: editedCar.price,
      brand: editedCar.brand,
    };
    await axios.put(`/cars`, body);
  }

  static async createCar(newCar) {
    const body = {
      name: newCar.name,
      price: newCar.price,
      brand: newCar.brand,
    };
    const response = axios.post(`/cars`, body);
    return response.data;
  }
}
