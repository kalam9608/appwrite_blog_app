const config = {
  app_url: String(import.meta.env.VITE_APPWRITE_URL),
  app_project_id: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  app_database_id: String(import.meta.env.VITE_APPWRITE_PROJECT_DATABASE_ID),
  app_collection_id: String(import.meta.env.VITE_APPWRITE_PROJECT_COLLECTION_ID),
  app_bucket_id: String(import.meta.env.VITE_APPWRITE_PROJECT_BUCKET_ID),
};

export default config;
