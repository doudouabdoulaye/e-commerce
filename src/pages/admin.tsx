import AdminDashboard from '../pages/admin.tsx';
// Or, if you don't have a types file, define the Product type here:
type Product = {
  id: number;
  name: string;
  price: number;
  // add other fields as needed
};

type Props = {
  products: Product[];
  handleAdminAction: (action: string, product: any) => void;
};

const AdminPage = ({ products, handleAdminAction }: Props) => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <AdminDashboard products={products} handleAdminAction={handleAdminAction} />
    </div>
  );
};

export default AdminPage;
