"use client";

import { useFormContext } from "react-hook-form";
import styles from "./shippingDetails.module.css";

export default function ShippingDetails({ shipDifferent, setShipDifferent }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={shipDifferent}
            onChange={() => setShipDifferent(!shipDifferent)}
            className={styles.checkbox}
          />{" "}
          Ship to a different address?
        </label>
      </h3>

      {shipDifferent && (
        <div className={styles.shippingAddress}>
          <h3 className={styles.title}>Shipping Details (Receiver)</h3>

          <div className={`${styles.formRow} ${styles.formRowWide}`}>
            <label className={styles.label}>
              Civility <abbr title="required" className={styles.required}>*</abbr>
            </label>
            <select
              {...register("shippingAddress.civility", {
                required: shipDifferent ? "Civility is required" : false,
              })}
              className={styles.input}
            >
              <option value="">Select...</option>
              <option value="Mr">Mr</option>
              <option value="Mme">Mme</option>
              <option value="Mlle">Mlle</option>
            </select>
            {errors.shippingAddress?.civility && (
              <p className={styles.error}>{errors.shippingAddress.civility.message}</p>
            )}
          </div>

          <div className={`${styles.formRow} ${styles.formRowFirst}`}>
            <label className={styles.label}>
              First Name <abbr title="required" className={styles.required}>*</abbr>
            </label>
            <input
              {...register("shippingAddress.firstName", {
                required: shipDifferent ? "First Name is required" : false,
              })}
              className={styles.input}
            />
            {errors.shippingAddress?.firstName && (
              <p className={styles.error}>{errors.shippingAddress.firstName.message}</p>
            )}
          </div>

          <div className={`${styles.formRow} ${styles.formRowLast}`}>
            <label className={styles.label}>
              Last Name <abbr title="required" className={styles.required}>*</abbr>
            </label>
            <input
              {...register("shippingAddress.lastName", {
                required: shipDifferent ? "Last Name is required" : false,
              })}
              className={styles.input}
            />
            {errors.shippingAddress?.lastName && (
              <p className={styles.error}>{errors.shippingAddress.lastName.message}</p>
            )}
          </div>

          <p className={`${styles.formRow} ${styles.formRowWide}`}>
            <label className={styles.label}>
              Street Address <abbr title="required" className={styles.required}>*</abbr>
            </label>
            <input
              {...register("shippingAddress.street", {
                required: shipDifferent ? "Street Address is required" : false,
              })}
              className={styles.input}
            />
            {errors.shippingAddress?.street && (
              <p className={styles.error}>{errors.shippingAddress.street.message}</p>
            )}
          </p>

          <p className={`${styles.formRow} ${styles.formRowWide}`}>
            <label className={styles.label}>
              City <abbr title="required" className={styles.required}>*</abbr>
            </label>
            <input
              {...register("shippingAddress.city", {
                required: shipDifferent ? "City is required" : false,
              })}
              className={styles.input}
            />
            {errors.shippingAddress?.city && (
              <p className={styles.error}>{errors.shippingAddress.city.message}</p>
            )}
          </p>

          <p className={`${styles.formRow} ${styles.formRowWide}`}>
            <label className={styles.label}>
              Zip Code <abbr title="required" className={styles.required}>*</abbr>
            </label>
            <input
              {...register("shippingAddress.zipCode", {
                required: shipDifferent ? "Zip Code is required" : false,
              })}
              className={styles.input}
            />
            {errors.shippingAddress?.zipCode && (
              <p className={styles.error}>{errors.shippingAddress.zipCode.message}</p>
            )}
          </p>
        </div>
      )}
    </div>
  );
}
