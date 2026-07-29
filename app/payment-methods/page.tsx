"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { CreditCard, Smartphone, Plus, Check, Shield, Lock, Trash2, Star, Apple, Chrome } from "lucide-react"

export default function PaymentMethodsPage() {
  const [selectedMethod, setSelectedMethod] = useState("card-1")

  const savedMethods = [
    {
      id: "card-1",
      type: "card",
      brand: "Visa",
      last4: "4242",
      expiry: "12/25",
      isDefault: true,
    },
    {
      id: "card-2",
      type: "card",
      brand: "Mastercard",
      last4: "8888",
      expiry: "03/26",
      isDefault: false,
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Payment Methods</h1>
          <p className="text-muted-foreground">Manage your payment options for faster checkout</p>
        </div>

        {/* Mobile Payment Options */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5" />
              Mobile Payments
            </CardTitle>
            <CardDescription>Quick and secure checkout with mobile wallets</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Button variant="outline" size="lg" className="h-auto py-6 justify-start bg-transparent">
                <div className="flex items-center gap-4 w-full">
                  <div className="h-12 w-12 rounded-lg bg-black flex items-center justify-center">
                    <Apple className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-semibold">Apple Pay</div>
                    <div className="text-sm text-muted-foreground">iPhone & iPad</div>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    <Check className="h-3 w-3 mr-1" />
                    Enabled
                  </Badge>
                </div>
              </Button>

              <Button variant="outline" size="lg" className="h-auto py-6 justify-start bg-transparent">
                <div className="flex items-center gap-4 w-full">
                  <div className="h-12 w-12 rounded-lg bg-white border-2 flex items-center justify-center">
                    <Chrome className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-semibold">Google Pay</div>
                    <div className="text-sm text-muted-foreground">Android devices</div>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    <Check className="h-3 w-3 mr-1" />
                    Enabled
                  </Badge>
                </div>
              </Button>
            </div>

            <div className="flex items-center gap-2 p-4 bg-blue-50 text-blue-900 rounded-lg text-sm">
              <Shield className="h-5 w-5 flex-shrink-0" />
              <p>Mobile payments are processed securely through your device's biometric authentication</p>
            </div>
          </CardContent>
        </Card>

        {/* Saved Cards */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Saved Cards
            </CardTitle>
            <CardDescription>Your stored payment cards</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod} className="space-y-3">
              {savedMethods.map((method) => (
                <div
                  key={method.id}
                  className={`flex items-center justify-between p-4 rounded-lg border-2 transition-colors ${
                    selectedMethod === method.id ? "border-primary bg-primary/5" : "border-border"
                  }`}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <RadioGroupItem value={method.id} id={method.id} />
                    <Label htmlFor={method.id} className="flex items-center gap-4 cursor-pointer flex-1">
                      <div className="h-10 w-16 rounded border-2 border-border flex items-center justify-center text-xs font-semibold bg-white">
                        {method.brand}
                      </div>
                      <div>
                        <div className="font-medium">
                          {method.brand} ending in {method.last4}
                        </div>
                        <div className="text-sm text-muted-foreground">Expires {method.expiry}</div>
                      </div>
                    </Label>
                    {method.isDefault && (
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                        <Star className="h-3 w-3 mr-1 fill-yellow-400" />
                        Default
                      </Badge>
                    )}
                  </div>
                  <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </RadioGroup>

            <Separator />

            <Button variant="outline" className="w-full bg-transparent">
              <Plus className="h-4 w-4 mr-2" />
              Add New Card
            </Button>
          </CardContent>
        </Card>

        {/* Add New Card Form */}
        <Card>
          <CardHeader>
            <CardTitle>Add New Payment Method</CardTitle>
            <CardDescription>Enter your card details to save for future payments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="card-number">Card Number</Label>
              <Input id="card-number" placeholder="1234 5678 9012 3456" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input id="expiry" placeholder="MM/YY" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input id="cvc" placeholder="123" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Cardholder Name</Label>
              <Input id="name" placeholder="John Doe" />
            </div>

            <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg text-sm">
              <Lock className="h-5 w-5 text-gray-600 flex-shrink-0" />
              <p className="text-gray-700">Your payment information is encrypted and stored securely</p>
            </div>

            <Button className="w-full" size="lg">
              <Plus className="h-4 w-4 mr-2" />
              Save Payment Method
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
