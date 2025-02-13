import {
 useQuery
} from '@tanstack/react-query'
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'
import CartService from '../services/cart.service'

const useCart = () => {
 const { user } = useContext(AuthContext);
 const { refetch, data: cart = [] } = useQuery({
  //ใช้ queryKey ในการระบุชื่อของ query และใช้ email ของผู้ใช้เป็นค่าที่ใช้ในการ query ข้อมูล
  queryKey: ["cart", user?.email],
  queryFn: async () => {
   const response = await CartService.getByemail(user?.email);
   return response.data;
  },
 });
 return [cart, refetch];
};

export default useCart;


