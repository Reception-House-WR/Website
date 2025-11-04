module.exports = ({ env }) => ({
  upload: {
    config: {
      // The provider must match the installed package name
      provider: 'strapi-provider-upload-azure-sa',

      providerOptions: {
        // Azure storage account name
        account: env('AZURE_ACCOUNT_NAME'),

        // Azure storage account key (keep secret)
        //accountKey: env('AZURE_ACCOUNT_KEY'),

        // SAS token (alternative to accountKey)
        sasToken: env('AZURE_SAS_TOKEN'),

        // The container where your files will be uploaded
        containerName: env('AZURE_CONTAINER_NAME'),

        // Default folder (prefix) inside the container
        defaultPath: env('AZURE_DEFAULT_PATH', 'uploads'),

        // Optional: Base URL for CDN or custom domain
        cdnBaseURL: env('AZURE_CDN_BASE_URL'),

        // Optional: Service base URL (e.g. https://<account>.blob.core.windows.net)
        serviceBaseURL: env('AZURE_SERVICE_BASE_URL'),

        // Optional: Default Cache-Control header
        defaultCacheControl: env('AZURE_DEFAULT_CACHE_CONTROL'),

        // Optional: Remove the container name from URLs (true/false)
        removeCN: env('AZURE_REMOVE_CN'),
      },
    },
  },
});