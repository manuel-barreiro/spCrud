import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { SharePointService, ISharePointItem } from '@/services/sharePointService';
import { useMsal } from '@azure/msal-react';

const spService = new SharePointService();

export const useSharePoint = () => {
  const { instance, accounts } = useMsal();
  const queryClient = useQueryClient();

  const getToken = async () => {
    const request = {
      scopes: ["https://graph.microsoft.com/.default"],
      account: accounts[0],
    };
    const response = await instance.acquireTokenSilent(request);
    return response.accessToken;
  };

  const useItems = () => {
    return useQuery({
      queryKey: ['items'],
      queryFn: async () => {
        const token = await getToken();
        return spService.getItems(token);
      }
    });
  };

  const useCreateItem = () => {
    return useMutation({
      mutationFn: async (item: Partial<ISharePointItem>) => {
        const token = await getToken();
        return spService.createItem(token, item);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['items'] });
      },
    });
  };

  const useUpdateItem = () => {
    return useMutation({
      mutationFn: async ({ id, item }: { id: number; item: Partial<ISharePointItem> }) => {
        const token = await getToken();
        return spService.updateItem(token, id, item);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['items'] });
      },
    });
  };

  const useDeleteItem = () => {
    return useMutation({
      mutationFn: async (id: number) => {
        const token = await getToken();
        return spService.deleteItem(token, id);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['items'] });
      },
    });
  };

  return {
    useItems,
    useCreateItem,
    useUpdateItem,
    useDeleteItem
  };
};