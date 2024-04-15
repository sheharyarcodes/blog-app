import config from "../config/config";
import { Client, ID, Databases, Storage } from "appwrite";

export class AppwriteService {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, content, slug, category, featuredImage, userId }) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          category,
          featuredImage,
          userId,
        }
      );
    } catch (error) {
      console.log("createPost :: appwriteConfig.js :: ", error);
    }
  }

  async updatePost(slug, { title, content, category, featuredImage }) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          category,
          featuredImage,
        }
      );
    } catch (error) {
      console.log("updatePost :: appwriteConfig.js :: ", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("deletePost :: appwriteConfig.js :: ", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("getPost :: appwriteConfig.js :: ", error);
      return false;
    }
  }

  async getAllPosts() {
    try {
      return await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId
      );
    } catch (error) {
      console.log("getAllPost :: appwriteConfig.js :: ", error);
      return false;
    }
  }

  // file upload services

  async uploadFile(fileBlob) {
    try {
      await this.bucket.createFile(
        config.appwriteBucketId,
        ID.unique(),
        fileBlob
      );
      return true;
    } catch (error) {
      console.log("uploadFile :: appwriteConfig.js :: ", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(config.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("deleteFile :: appwriteConfig.js :: ", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    try {
      return this.bucket.getFilePreview(config.appwriteBucketId, fileId);
    } catch (error) {
      console.log("getFilePreview :: appwriteConfig.js :: ", error);
      return false;
    }
  }
}

const appwriteService = new AppwriteService();

export default appwriteService;
