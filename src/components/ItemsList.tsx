import { useSharePoint } from '@/hooks/useSharePoint';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ISharePointItem } from '@/services/sharePointService';

export const ItemList = () => {
  const { useItems, useDeleteItem } = useSharePoint();
  const { data: items, isLoading } = useItems();
  const deleteItem = useDeleteItem();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>SharePoint Items</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items?.map((item: ISharePointItem) => (
              <TableRow key={item.Id}>
                <TableCell>{item.Title}</TableCell>
                <TableCell>{item.Description}</TableCell>
                <TableCell>{item.Status}</TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteItem.mutate(item.Id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};