"use client";
import { useFormContext } from "react-hook-form";

export default function PaymentMethod() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const selectedPayment = watch("paymentMethod");

  return (
    <div id="payment">
      <h3>Payment Method</h3>

      <ul className="payment_methods methods" style={{ listStyle: "none", padding: 0, margin: 0 }}>
        <li className="payment_method_bacs" style={{ marginBottom: 12 }}>
          <input
            {...register("paymentMethod", { required: "Please choose a payment method" })}
            type="radio"
            value="bank_transfer"
            id="payment_method_bacs"
            className="input-radio"
          />
          <label htmlFor="payment_method_bacs" style={{ marginLeft: 8 }}>
            Direct Bank Transfer
          </label>

          {selectedPayment === "bank_transfer" && (
            <div className="payment_box payment_method_bacs" style={{ marginTop: 8 }}>
              <p>
                Make your payment directly into our bank account. Your order won’t be shipped
                until the funds have cleared.
              </p>
            </div>
          )}
        </li>

        <li className="payment_method_cheque" style={{ marginBottom: 12 }}>
          <input
            {...register("paymentMethod")}
            type="radio"
            value="cheque"
            id="payment_method_cheque"
            className="input-radio"
          />
          <label htmlFor="payment_method_cheque" style={{ marginLeft: 8 }}>
            Cheque Payment
          </label>

          {selectedPayment === "cheque" && (
            <div className="payment_box payment_method_cheque" style={{ marginTop: 8 }}>
              <p>Please send your cheque to our store address.</p>
            </div>
          )}
        </li>

        <li className="payment_method_paypal" style={{ marginBottom: 12 }}>
          <input
            {...register("paymentMethod")}
            type="radio"
            value="paypal"
            id="payment_method_paypal"
            className="input-radio"
          />
          <label htmlFor="payment_method_paypal" style={{ marginLeft: 8, display: "inline-flex", alignItems: "center", gap: 8 }}>
            <span>PayPal</span>
            <img
              alt="PayPal Acceptance Mark"
              src="https://www.paypalobjects.com/webstatic/mktg/Logo/AM_mc_vs_ms_ae_UK.png"
              style={{ height: 20, display: "inline-block" }}
            />
            <a
              title="What is PayPal?"
              className="about_paypal"
              href="https://www.paypal.com/gb/webapps/mpp/paypal-popup"
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginLeft: 8, fontSize: 12 }}
            >
              What is PayPal?
            </a>
          </label>

          {selectedPayment === "paypal" && (
            <div className="payment_box payment_method_paypal" style={{ marginTop: 8 }}>
              <p>Pay via PayPal; you can use your credit card even if you don’t have a PayPal account.</p>
            </div>
          )}
        </li>
      </ul>

      {/* message d'erreur global pour le champ paymentMethod */}
      {errors.paymentMethod && <p className="error" style={{ color: "rgb(223,42,42)", marginTop: 8 }}>{errors.paymentMethod.message}</p>}
    </div>
  );
}
