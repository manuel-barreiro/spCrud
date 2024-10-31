import axios from 'axios';

// Define an interface for the SharePoint item
export interface ISharePointItem {
  Id: number;
  Title: string;
  Description?: string;
  Status: string;
  Created: string;
  Modified: string;
}

// Define the SharePointService class
export class SharePointService {
  private baseUrl: string;
  private listName: string;

  // Constructor to initialize the base URL and list name
  constructor() {
    this.baseUrl = import.meta.env.VITE_SHAREPOINT_URL;
    this.listName = import.meta.env.VITE_LIST_NAME;
  }

  // Private method to get headers for the HTTP requests
  private async getHeaders(token: string) {
    return {
      Accept: "application/json;odata=verbose",
      "Content-Type": "application/json;odata=verbose",
      Authorization: `Bearer ${token}`,
    };
  }

  // Method to get items from the SharePoint list
  async getItems(token: string) {
    const headers = await this.getHeaders(token);
    const response = await axios.get(
      `${this.baseUrl}/_api/web/lists/getbytitle('${this.listName}')/items`,
      { headers }
    );
    return response.data.d.results;
  }

  // Method to create a new item in the SharePoint list
  async createItem(token: string, item: Partial<ISharePointItem>) {
    const headers = await this.getHeaders(token);
    const response = await axios.post(
      `${this.baseUrl}/_api/web/lists/getbytitle('${this.listName}')/items`,
      item,
      { headers }
    );
    return response.data.d;
  }

  // Additional methods for updating and deleting items can be added here
}