import axios, { AxiosResponse } from 'axios';
import { DeleteCategory, DeleteProduct, NewCategory, NewProduct, UserLogin } from 'types';
import { tokenToString } from 'typescript';

const baseUrl = "http://localhost:4000/api/v1/admin/";

export const loginAdmin = async (values: UserLogin) => {
  const res = await axios.post(`${baseUrl}login`, values);
  return res;
};
const Url = "http://localhost:4000/api/v1/categories/";

export const getCategories = async () => {
  const res = await axios.get(`${Url}`);
  return res.data;
};

export const createCategory = async (values: NewCategory) => {
    const res = await axios.post(`${Url}`, values,{
      headers: {
        Authorization:values.token,
      },
    });
    return res;
  };

  export async function deleteCategory({ id, token }: { id: string, token: string }): Promise<AxiosResponse>  
  {
    const res = await axios.delete(`${Url}${id}`,{
      headers: { Authorization: token },
    }
    );
    return res;
  };
  const UrlP = "http://localhost:4000/api/v1/products/";
  /*search product */
  export const searchProduct = async (values: NewProduct) => {
    const res = await axios.post(`${UrlP}`, values);
    return res;
  };
  /*export const createProduct = async (newProduct: object, token: string): Promise<object> => {
    const response = await axios.post(`${UrlP}`,newProduct,{
      headers: { Authorization: token },
    });
    return response;
  };*/
  export const getProducts = async (page: number): Promise<any> => {
    const response = await axios.get(`${UrlP}?page=${page}`);
    return response.data;
  };
  export async function deleteProduct ({ id, token }: { id: string, token: string }): Promise<AxiosResponse>   {
    const response = await axios.delete(`${UrlP}/${id}`,{
      headers: { Authorization: token },
    });
    return response.data;
  };
  /*create product */
  export const createProduct = async (values: NewProduct) => {
    const res = await axios.post(`${UrlP}`, values);
    return res;
  };

 /* export const deleteProduct = async (values: DeleteProduct) => {
    const res = await axios.delete(`${Url}products/${id}`, values);
    return res;
  };*/
  export const getBrainClientToken = async () => {
    const res = await axios.get(`${UrlP}/braintree/token`);
    return res.data;
  };
  export const processBraintreePayment = async (nonce:string, totalAmount:number) => {
    const res = await axios.post(
      `${UrlP}braintree/payment`,
      {nonce, totalAmount},
      {
        withCredentials: true,
      }
    );
    return res;
  };