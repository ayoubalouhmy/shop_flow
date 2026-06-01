import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { checkoutService, addressService } from '../services/checkoutServices';
import { cartAPI } from '../services/api';

export const useOrderSummary = () => {
  return useQuery({
    queryKey: ['order-summary'],
    queryFn: async () => {
      const res = await cartAPI.getCart();
      return res.data.data;
    },
  });
};

export const useCheckout = () => {
  const queryClient = useQueryClient();

  const shippingMutation = useMutation({
    mutationFn: (data) => checkoutService.saveShipping(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['order-summary'] });
    }
  });

  return {
    saveShipping: shippingMutation.mutateAsync,
    isSaving: shippingMutation.isPending,
    error: shippingMutation.error
  };
};
