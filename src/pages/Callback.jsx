import { Loader } from '@mantine/core';
//Callback page, not really set yet
export default function CallbackPage() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Loader size="xl" variant="dots" />
    </div>
  );
}