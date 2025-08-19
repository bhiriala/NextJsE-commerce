"use client";

import { useFormContext } from "react-hook-form";
import styles from "./billingDetails.module.css";

export default function BillingDetails() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Billing Details</h3>

      <div className={`${styles.formRow} ${styles.formRowWide}`}>
        <label className={styles.label}>
          Civility <abbr title="required" className={styles.required}>*</abbr>
        </label>
        <select
          {...register("billingAddress.civility", { required: "Civility is required" })}
          className={styles.input}
        >
          <option value="">Select...</option>
          <option value="Mr">Mr</option>
          <option value="Mme">Mme</option>
          <option value="Mlle">Mlle</option>
        </select>
        {errors.billingAddress?.civility && (
          <p className={styles.error}>{errors.billingAddress.civility.message}</p>
        )}
      </div>

      <div className={`${styles.formRow} ${styles.formRowFirst}`}>
        <label className={styles.label}>
          First Name <abbr title="required" className={styles.required}>*</abbr>
        </label>
        <input
          {...register("billingAddress.firstName", { required: "First Name is required" })}
          className={styles.input}
        />
        {errors.billingAddress?.firstName && (
          <p className={styles.error}>{errors.billingAddress.firstName.message}</p>
        )}
      </div>

      <div className={`${styles.formRow} ${styles.formRowLast}`}>
        <label className={styles.label}>
          Last Name <abbr title="required" className={styles.required}>*</abbr>
        </label>
        <input
          {...register("billingAddress.lastName", { required: "Last Name is required" })}
          className={styles.input}
        />
        {errors.billingAddress?.lastName && (
          <p className={styles.error}>{errors.billingAddress.lastName.message}</p>
        )}
      </div>

      {/* Les autres champs : même principe (div au lieu de p) */}
      <div className={`${styles.formRow} ${styles.formRowWide}`}>
        <label className={styles.label}>Company Name</label>
        <input
          {...register("billingAddress.companyName")}
          className={styles.input}
          placeholder="Company (optional)"
        />
      </div>

      <div className={`${styles.formRow} ${styles.formRowWide}`}>
        <label className={styles.label}>
          Street Address <abbr title="required" className={styles.required}>*</abbr>
        </label>
        <input
          {...register("billingAddress.street", { required: "Street Address is required" })}
          className={styles.input}
        />
        {errors.billingAddress?.street && (
          <p className={styles.error}>{errors.billingAddress.street.message}</p>
        )}
      </div>

      <p className={`${styles.formRow} ${styles.formRowWide}`}>
        <label className={styles.label}>
          City <abbr title="required" className={styles.required}>*</abbr>
        </label>
        <input
          {...register("billingAddress.city", { required: "City is required" })}
          className={styles.input}
        />
        {errors.billingAddress?.city && (
          <p className={styles.error}>{errors.billingAddress.city.message}</p>
        )}
      </p>

      <p className={`${styles.formRow} ${styles.formRowWide}`}>
        <label className={styles.label}>
          County <abbr title="required" className={styles.required}>*</abbr>
        </label>
        <input
          {...register("billingAddress.county", { required: "County is required" })}
          className={styles.input}
        />
        {errors.billingAddress?.county && (
          <p className={styles.error}>{errors.billingAddress.county.message}</p>
        )}
      </p>

      <p className={`${styles.formRow} ${styles.formRowWide}`}>
        <label className={styles.label}>
          Zip Code <abbr title="required" className={styles.required}>*</abbr>
        </label>
        <input
          {...register("billingAddress.zipCode", { required: "Zip Code is required" })}
          className={styles.input}
        />
        {errors.billingAddress?.zipCode && (
          <p className={styles.error}>{errors.billingAddress.zipCode.message}</p>
        )}
      </p>

      <p className={`${styles.formRow} ${styles.formRowWide}`}>
        <label className={styles.label}>
          Email <abbr title="required" className={styles.required}>*</abbr>
        </label>
        <input
          {...register("customer.email", {
            required: "Email is required",
            pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email address" },
          })}
          className={styles.input}
        />
        {errors.customer?.email && (
          <p className={styles.error}>{errors.customer.email.message}</p>
        )}
      </p>

      <p className={`${styles.formRow} ${styles.formRowWide}`}>
        <label className={styles.label}>
          Phone <abbr title="required" className={styles.required}>*</abbr>
        </label>
        <input
          {...register("customer.phone", {
            required: "Phone number is required",
            pattern: { value: /^[0-9]+$/, message: "Only numbers allowed" },
          })}
          className={styles.input}
        />
        {errors.customer?.phone && (
          <p className={styles.error}>{errors.customer.phone.message}</p>
        )}
      </p>
    </div>
  );
}
