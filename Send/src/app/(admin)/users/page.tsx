import { Suspense } from "react";
import User from '@/components/user/UsersPage';


export default function UserPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <User />
    </Suspense>
  );
}