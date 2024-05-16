import { Client, Account, ID } from "appwrite";
import config from "../config/config";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    console.log("checlt========>",config.app_project_id)
    this.client.setEndpoint(config.app_url).setProject(config.app_project_id);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    console.log("api calling next")

    try {
      const userAccount = await this.account.create(
        ID.unique,
        email,
        password,
        name
      );

      if (userAccount) {
        //call another function
        return this.login(email, password);
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getCurentUser(){
    try {
      return  await this.account.get();
    } catch (error) {
        console.log("error====>",error)
        
    }
    return null;
  }

  async logoutUser(){
    try {
      return  await this.account.deleteSessions();
    } catch (error) {
        console.log("error====>",error)
        
    }
    return null;
  }
}

const authService = new AuthService();

export default authService;
