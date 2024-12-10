import axios from "axios";

class Api {
  constructor(baseURL) {
    this.client = axios.create({
      baseURL,
    });
  }

  async get(endpoint, params = {}) {
    try {
      const response = await this.client.get(endpoint, { params });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async post(endpoint, data) {
    try {
      const response = await this.client.post(endpoint, data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async put(endpoint, data) {
    try {
      const response = await this.client.put(endpoint, data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async delete(endpoint) {
    try {
      const response = await this.client.delete(endpoint);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  handleError(error) {
    if (error.response) {
      throw new Error(
        `Ошибка: ${error.response.status} - ${error.response.data.message || "Неизвестная ошибка"}`
      );
    } else if (error.request) {
      throw new Error("Нет ответа от сервера.");
    } else {
      throw new Error("Произошла ошибка при запросе.");
    }
  }
}

export const api = new Api("http://localhost:3000");
