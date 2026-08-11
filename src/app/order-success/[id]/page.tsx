"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { CheckCircle2, Package, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function OrderSuccessPage() {
  const { id } = useParams();

  // Calculate a mock delivery date (3 days from now)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 3);
  const formattedDate = deliveryDate.toLocaleDateString("en-US", {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-3xl text-center">
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center animate-in zoom-in duration-500">
          <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-500" />
        </div>
      </div>

      <h1 className="font-heading text-4xl font-bold mb-4">Thank you for your order!</h1>
      <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
        Your order has been placed successfully. We&apos;ve sent a confirmation email to you with the order details.
      </p>

      <Card className="border shadow-sm mb-10 text-left overflow-hidden">
        <div className="bg-muted/50 p-6 border-b">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-muted-foreground font-medium mb-1">Order Number</p>
              <p className="font-semibold">{id}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium mb-1">Date</p>
              <p className="font-semibold">{new Date().toLocaleDateString()}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-muted-foreground font-medium mb-1">Estimated Delivery</p>
              <p className="font-semibold text-primary">{formattedDate}</p>
            </div>
          </div>
        </div>
        <CardContent className="p-0">
          <div className="p-6">
            <h3 className="font-bold text-lg mb-6 border-b pb-4">Order Status</h3>

            <div className="relative border-l-2 border-primary/20 ml-3 md:ml-4 space-y-8 pb-4">
              <div className="relative pl-8">
                <div className="absolute w-6 h-6 bg-primary rounded-full -left-[13px] top-0 flex items-center justify-center ring-4 ring-background">
                  <Package className="w-3 h-3 text-primary-foreground" />
                </div>
                <h4 className="font-bold">Order Placed</h4>
                <p className="text-sm text-muted-foreground mt-1">We have received your order.</p>
              </div>

              <div className="relative pl-8">
                <div className="absolute w-6 h-6 bg-muted rounded-full -left-[13px] top-0 flex items-center justify-center ring-4 ring-background">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full" />
                </div>
                <h4 className="font-medium text-muted-foreground">Processing</h4>
                <p className="text-sm text-muted-foreground mt-1">We are preparing your items for shipping.</p>
              </div>

              <div className="relative pl-8">
                <div className="absolute w-6 h-6 bg-muted rounded-full -left-[13px] top-0 flex items-center justify-center ring-4 ring-background">
                  <Truck className="w-3 h-3 text-muted-foreground" />
                </div>
                <h4 className="font-medium text-muted-foreground">Shipped</h4>
                <p className="text-sm text-muted-foreground mt-1">Your order is on the way.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild size="lg" className="h-12 px-8 rounded-lg bg-[#2563eb] hover:bg-blue-700 text-white font-bold">
          <Link href={`/track-order?id=${id}`}>Track Your Order</Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="h-12 px-8 rounded-lg">
          <Link href="/shop">Continue Shopping</Link>
        </Button>
      </div>
    </div>
  );
}
