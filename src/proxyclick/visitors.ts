import axios from "axios";
import { access_token } from "./auth";
import { BASE, COMPANY_ID } from "../config/config";

export interface IVisitor {
  firstname: string;
  lastname: string;
  email: string;
}

export interface Filter {
  email: string;
  companyName: string;
}

export const VisitorsService = {
  /**
   * Find visitors by searching through the Proxyclick API
   * @param filter a filter containing email and/or company name
   * @returns a promise of an array of visitors
   */
  getVisitors: async function (filter: {
    email?: string;
    companyName?: string;
  }): Promise<any[]> {
    let token = await access_token();

    const result = await axios.get(
      `${BASE}/v1/companies/${COMPANY_ID}/vm/visitors`,
      {
        params: filter,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return result.data.visitors;
  },

  // Do not change this function
  updateVisitor: function (
    email: string,
    update: {
      firstname?: string;
      lastname?: string;
    }
  ) {},
};
