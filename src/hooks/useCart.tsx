import { createContext, ReactNode, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../services/api';
import { Product, Stock } from '../types';

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>(() => {
    /* const storagedCart = Buscar dados do localStorage

    if (storagedCart) {
       return JSON.parse(storagedCart);
    } */

    return [];
  });

  const addProduct = async (productId: number) => {
    try {
      // TODO

      await api.get('products')
      .then(res => {

        res.data.forEach((product: any) => {
          if(product.id === productId){
            setCart([...cart, product])
          }
        })

      })

    } catch(err) {
      // TODO
      console.log(err);
    }
  };

  const removeProduct = (productId: number) => {
    try {
      // TODO
    } catch {
      // TODO
    }
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
      // TODO
      const productStock = await api.get('/stock/' + productId).then(res => res.data);
      amount = productStock.amount;

      return amount;
    } catch(err) {
      // TODO
      console.log(err);
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
