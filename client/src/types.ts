export type InitialStateProducts = {
    products: Products[];
    loading: boolean;
    error: string;
  };
  
  export type Products = {
    productId: string;
    _id: string
    image: string;
    name: string;
    description: string;
    price: number;
    category: string;
    //variant: string;
    //size: string | number;
    rating: number;
    sold: number;
    quantity: number;
  };
  
  export type Productprops = {
    product: {
      _id: string
      productId: string;
      image: string;
      name: string;
      description: string;
      price: number;
      category: string;
      //variant: string;
      //size: string | number;
      rating: number;
      available: boolean;
      sold: number;
      quantity: number;
    };
  };

  export type InitialStateUser = {
    error: string;
    loading: boolean;
    isLoggedIn: boolean;
    isAdmin: number;
    user: {
      _id: string;
       firstname: string; lastname: string; email: string; phone: string 
};
  };
  
  export type UserRegister = {
    firstname: string; 
    lastname: string;
    email: string;
    password: string;
    phone: string;
  };
  export type UserLogin = {
    email: string;
    password: string;
  };
  export type ForgotUser = {
    email: string;
  };
  
  export type ResetUser = {
    password: string;
  };
  export type UserProfile = {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
  };

  export type updateUserProfile = {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
  };

  export type updateUserPassword = {
    _id: string;
    email: string;
    oldpassword: string;
    newpassword: string;
    confirmpassword: string;
  };
  export type NewCategory = {
    name: string;
    token :string;
  };
  export type DeleteCategory = {
    token: string;
    id: string ;
  };
  export type NewProduct = {
    productId: string;
    image: string;
    name: string;
    description: string;
    price: number;
    category: string;
    //variant: string;
    //size: string | number;
    rating: number;
    sold: number;
    quantity: number;
  };
  export type DeleteProduct = {
    name: string;
    id: number;
  };

  export type InitialStateCart = {
    
    cartItems: Products[];
    totalQuantity: number;
    totalAmount:number;
    
  };

  export type PaginationProps = {
    productsPerPage: number;
    totalProducts: number;
    paginate: (pageN: number) => void;
  };
  export type InitialStateCategories = {
    categories: {
      [x: string]: any;
      token: string;
      name: string;}
    loading: boolean;
    error: string;
  };
  export type CategoryType = {
    name: string;
    _id :string;
    token:string;
  };