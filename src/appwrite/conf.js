import { Client, ID, Databases, Storage, Query } from "appwrite";
import config from "../config/config";

export class DataBaseService {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client.setEndpoint(config.app_url).setProject(config.app_project_id);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }
  async createPost({ title, slug, content, images, status, userid }) {
    try {
      return this.databases.createDocument(
        config.app_database_id,
        config.app_collection_id,
        slug,
        {
          title,
          content,
          status,
          images,
          // userid,
        }
      );
    } catch (error) {
      console.log("error", error);
    }
  }
  async updatePost(slug, { title, content, status, images, userid }) {
    try {
      return (
        await this.databases.updateDocument(
          config.app_database_id,
          config,
          app_collection_id,
          slug
        ),
        {
          title,
          content,
          status,
          images,
        }
      );
    } catch (error) {
      console.log("App write data base error======>", error);
    }
  }

  async deletePost(slug) {
    try {
      return await this.databases.deleteDocument(
        config.app_database_id,
        config.app_collection_id,
        slug
      );
    } catch (error) {
      console.log("error========>", error);
    }
  }

  async getPost(slug) {
    try {
      await this.databases.getDocument(
        config.app_database_id,
        config.app_collection_id,
        slug
      );
    } catch (error) {
      throw error;
    }
  }
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return this.databases.listDocuments(
        config.app_database_id,
        config.app_collection_id,
        queries
      );
    } catch (error) {
      console.log("error");
      return false;
    }
  }

  // file uplaod
  async uploadFile(file){

    try {

        return await this.bucket.createFile(config.app_bucket_id,ID.unique(),
    file)
        
    } catch (error) {
        console.log("error",error);
        return error
    }

  }
  
  async deleteFile(fileId){

    try {

        await this.bucket.deleteFile(config.app_bucket_id,
            fileId
        )
        return true
        
    } catch (error) {
        console.log("error====>",error);

        return false
    }

  }

  getFilePreview(fileId){
  return this.bucket.getFilePreview(config.app_bucket_id,fileId)
  }
}

const service = new DataBaseService();

export default service;
