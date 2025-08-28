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
import { createCart, fetchCartData } from "@/store/cartSlice";


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
    civility: yup.string().when([], {
      is: (_, context) => context?.shipDifferent === true,
      then: (schema) => schema.required("Civility is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    firstName: yup.string().when([], {
      is: (_, context) => context?.shipDifferent === true,
      then: (schema) => schema.required("First Name is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    lastName: yup.string().when([], {
      is: (_, context) => context?.shipDifferent === true,
      then: (schema) => schema.required("Last Name is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    street: yup.string().when([], {
      is: (_, context) => context?.shipDifferent === true,
      then: (schema) => schema.required("Street Address is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    city: yup.string().when([], {
      is: (_, context) => context?.shipDifferent === true,
      then: (schema) => schema.required("City is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    county: yup.string().when([], {
      is: (_, context) => context?.shipDifferent === true,
      then: (schema) => schema.required("County is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    zipCode: yup.string().when([], {
      is: (_, context) => context?.shipDifferent === true,
      then: (schema) => schema.required("Zip Code is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  }),
  paymentMethod: yup.string().required("Please select a payment method"),
});

export default function CheckoutPage() {
  const [shipDifferent, setShipDifferent] = useState(false);

  const methods = useForm({
    resolver: yupResolver(schema),
    context: { shipDifferent },
    defaultValues: {
      customer: { email: "", phone: "" },
      billingAddress: {
        civility: "",
        firstName: "",
        lastName: "",
        street: "",
        city: "",
        county: "",
        zipCode: "",
      },
      shippingAddress: {
        civility: "",
        firstName: "",
        lastName: "",
        street: "",
        city: "",
        county: "",
        zipCode: "",
      },
      paymentMethod: "",
    },
    shouldUnregister: true, // important pour les champs conditionnels
  });

  const dispatch = useDispatch();
  const router = useRouter();
  const cartData = useSelector((state) => state.cart?.cartData ?? null);

  const onSubmit = async (data) => {
  if (!cartData) {
    console.error("Pas de panier disponible");
    return;
  }

  const orderData = {
    total: cartData.total ?? 0,
    subTotal: cartData.subTotal ?? 0,
    tax: cartData.tax ?? 0,
    items: cartData.items ?? [],
    customer: {
      email: data.customer?.email ?? "",
      phone: data.customer?.phone ?? "",
      billingAddress: { ...data.billingAddress },
      shippingAddress: shipDifferent ? { ...data.shippingAddress } : null,
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

    // Marquer le succès (utile pour la page de confirmation)
    if (typeof window !== "undefined") {
      localStorage.setItem("orderSuccess", "true");
    }

    // --- Créer un nouveau panier et hydrater le store ---
    try {
      // createCart() doit retourner l'id du nouveau panier (comme dans ta slice)
      const newCartId = await dispatch(createCart()).unwrap();

      // fetchCartData va remplir cartData dans le store (et mettre à jour localStorage)
      try {
        await dispatch(fetchCartData(newCartId)).unwrap();
      } catch (fetchErr) {
        // Si fetch échoue, on a quand même un newCartId en localStorage (createCart l'a mis),
        // mais cartData côté Redux peut rester null — log pour debug
        console.warn("fetchCartData après createCart a échoué :", fetchErr);
      }

      // Notifier autres onglets (optionnel)
      try { localStorage.setItem("cart-updated", Date.now().toString()); } catch (e) { /* ignore */ }

    } catch (createErr) {
      console.warn("createCart après commande a échoué :", createErr);
      // Même si createCart échoue, on continue la redirection, mais l'UI peut rester avec l'ancien cart.
    }

    // Rediriger l'utilisateur (vers home ou page de confirmation)
    router.push("/");

  } catch (error) {
    console.error("Error submitting order:", error);
    // afficher notification utilisateur si tu veux
  }
};


  const onError = (errors) => console.error("Form validation errors:", errors);

  if (!cartData) return <p>Chargement du panier...</p>;

  return (
    <div className="single-product-area">
      <div className="zigzag-bottom" />
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="product-content-right">
              <div className="woocommerce">
                <h2
                  className="product-bit-title text-center"
                  style={{ color: "black", fontSize: "2rem", marginBottom: "1rem" }}
                >
                  Checkout
                </h2>

                <FormProvider {...methods}>
                  <form onSubmit={methods.handleSubmit(onSubmit, onError)} className="checkout">
                    <div
                      id="customer_details"
                      className="col2-set"
                      style={{ display: "flex", gap: 24, flexWrap: "wrap", marginLeft: "5rem" }}
                    >
                      <div className="col-6" style={{ flex: "1 1 420px" }}>
                        <BillingDetails />
                      </div>

                      <div className="col-6" style={{ flex: "1 1 420px" }}>
                        <ShippingDetails shipDifferent={shipDifferent} setShipDifferent={setShipDifferent} />
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: 24,
                        marginTop: 24,
                        alignItems: "flex-start",
                        marginLeft: "15rem",
                      }}
                    >
                      <OrderSummary />
                      <PaymentMethod />
                      <div style={{ width: 220 }}></div>
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
