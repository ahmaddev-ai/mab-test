import BookingClient from "@/components/bookings/BookingClient";
import { Suspense } from "react";

export default function BookingPage() {
  return (
    <Suspense fallback={null}>
      <BookingClient />
    </Suspense>
  );
}
