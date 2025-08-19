// app/checkout/page.jsx
"use client";

import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import OrderSummary from "@/components/checkout/orderSummary";
import BillingDetails from "@/components/checkout/billingDetails";
import PaymentMethod from "@/components/checkout/paymentMethod";
import ShippingDetails from "@/components/checkout/shippingDetails";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { createCart } from "@/store/cartSlice";

const schema = yup.object().shape({
  customer: yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    phone: yup.string().required("Phone number is required"),
  }),
  billingAddress: yup.object().shape({
    civility: yup.string().required("Civility is required"),
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    street: yup.string().required("Street Address is required"),
    city: yup.string().required("City is required"),
    county: yup.string().required("County is required"),
    zipCode: yup.string().required("Zip Code is required"),
  }),
  shippingAddress: yup.object().shape({
    civility: yup.string().when("$shipDifferent", {
      is: true,
      then: (schema) => schema.required("Civility is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    firstName: yup.string().when("$shipDifferent", {
      is: true,
      then: (schema) => schema.required("First Name is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    lastName: yup.string().when("$shipDifferent", {
      is: true,
      then: (schema) => schema.required("Last Name is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    street: yup.string().when("$shipDifferent", {
      is: true,
      then: (schema) => schema.required("Street Address is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    city: yup.string().when("$shipDifferent", {
      is: true,
      then: (schema) => schema.required("City is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    county: yup.string().when("$shipDifferent", {
      is: true,
      then: (schema) => schema.required("County is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    zipCode: yup.string().when("$shipDifferent", {
      is: true,
      then: (schema) => schema.required("Zip Code is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  }),
  paymentMethod: yup.string().required("Please select a payment method"),
});

export default function CheckoutPage() {
  const [shipDifferent, setShipDifferent] = useState(false);

  // react-hook-form : on passe context variable pour la validation conditionnelle ($shipDifferent)
  const methods = useForm({
    resolver: yupResolver(schema),
    context: { shipDifferent },
    defaultValues: {
      customer: { email: "", phone: "" },
      billingAddress: {},
      shippingAddress: {},
      paymentMethod: "",
    },
  });

  const dispatch = useDispatch();
  const router = useRouter();

  const cartData = useSelector((state) => state.cart?.cartData ?? null);

  const onSubmit = async (data) => {
    if (!cartData) {
      console.error("Pas de panier disponible");
      return;
    }

    // Construire orderData à partir du form (attention aux chemins : customer.email ...)
    const orderData = {
      total: cartData.total ?? 0,
      subTotal: cartData.subTotal ?? 0,
      tax: cartData.tax ?? 0,
      items: cartData.items ?? [],
      customer: {
        email: data.customer?.email ?? "",
        phone: data.customer?.phone ?? "",
        billingAddress: {
          civility: data.billingAddress?.civility ?? "",
          firstName: data.billingAddress?.firstName ?? "",
          lastName: data.billingAddress?.lastName ?? "",
          zipCode: data.billingAddress?.zipCode ?? "",
          street: data.billingAddress?.street ?? "",
          companyName: data.billingAddress?.companyName ?? "",
          county: data.billingAddress?.county ?? "",
          city: data.billingAddress?.city ?? "",
        },
        shippingAddress: shipDifferent
          ? {
              civility: data.shippingAddress?.civility ?? "",
              firstName: data.shippingAddress?.firstName ?? "",
              lastName: data.shippingAddress?.lastName ?? "",
              zipCode: data.shippingAddress?.zipCode ?? "",
              street: data.shippingAddress?.street ?? "",
              companyName: data.shippingAddress?.companyName ?? "",
              county: data.shippingAddress?.county ?? "",
              city: data.shippingAddress?.city ?? "",
            }
          : null,
      },
      paymentMethod: data.paymentMethod,
    };

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const response = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      // succès : stocker flag, nettoyer cart et créer nouveau panier
      if (typeof window !== "undefined") {
        localStorage.setItem("orderSuccess", "true");
        localStorage.removeItem("cartId");
        localStorage.removeItem("cart");
      }

      // recréer un panier (dispatch côté client) et attendre si besoin
      try {
        await dispatch(createCart()).unwrap();
      } catch (err) {
        // ignore l'erreur de création de panier, mais logguer
        console.warn("createCart après commande a échoué :", err);
      }

      // rediriger vers la page d'accueil
      router.push("/");
    } catch (error) {
      console.error("Error submitting order:", error);
      // ici tu peux afficher une notification à l'utilisateur
    }
  };

  const onError = (errors) => {
    console.error("Form validation errors:", errors);
  };

  if (!cartData) {
    return <p>Chargement du panier...</p>;
  }

  return (
    <div className="single-product-area">
      <div className="zigzag-bottom"></div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="product-content-right">
              <div className="woocommerce">
                <h2 className="product-bit-title text-center" style={{color:"black",fontSize:"2rem", marginBottom:"1rem"}}>Checkout</h2>

                <FormProvider {...methods}>
                  <form
                    onSubmit={methods.handleSubmit(onSubmit, onError)}
                    className="checkout"
                  >
                    <div id="customer_details" className="col2-set" style={{ display: "flex", gap: 24, flexWrap: "wrap", marginLeft:"5rem" }}>
                      <div className="col-6" style={{ flex: "1 1 420px" }}>
                        <BillingDetails />
                      </div>

                      <div className="col-6" style={{ flex: "1 1 420px" }}>
                        <ShippingDetails
                          shipDifferent={shipDifferent}
                          setShipDifferent={setShipDifferent}
                        />
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: 24, marginTop: 24, alignItems: "flex-start",marginLeft:"15rem" }}>
                      
                        <OrderSummary />
                        <PaymentMethod />
                    

                      <div style={{ width: 220 }}>
                        {/* CartTotal component if you want to show totals on the side:
                            <CartTotal total={cartData.total} subTotal={cartData.subTotal} tax={cartData.tax} />
                         */}
                      </div>
                    </div>

                    <div className="form-row place-order" style={{ marginTop: 20 }}>
                      <button type="submit" className="button alt">
                        Place Order
                      </button>
                    </div>
                  </form>
                </FormProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
