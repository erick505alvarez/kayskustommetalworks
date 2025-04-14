import { useState } from "react";
import { useForm } from "react-hook-form";
import { navigate } from "astro:transitions/client";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    const formattedData = {
      "First Name": data.firstName,
      "Last Name": data.lastName,
      Email: data.email,
      "Phone Number": data.phone,
      Message: data.message,
    };

    try {
      const response = await fetch(
        "https://formsubmit.co/2027db9761e887bc2affb20fefdad7c2",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      await navigate("/form-success");
    } catch (error) {
      setSubmitError(
        "There was an error submitting the form. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClassName =
    "mt-1 block w-full rounded-md bg-gray-700 border border-gray-600 text-white px-4 py-3 text-lg focus:bg-gray-600";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {submitError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {submitError}
        </div>
      )}

      {/* honey pot */}
      <input type="text" name="_honey" className="hidden" />

      {/* disable captcha */}
      <input type="hidden" name="_captcha" value="false" />

      {/* redirect */}
      <input
        type="hidden"
        name="_next"
        value="https://kayskustommetalworks.com/form-success"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label
            htmlFor="firstName"
            className="block text-lg font-medium text-white mb-2"
          >
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            {...register("firstName", {
              required: "First name is required",
            })}
            className={inputClassName}
          />
          {errors.firstName && (
            <p className="mt-2 text-sm text-red-400">
              {errors.firstName.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="block text-lg font-medium text-white mb-2"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            {...register("lastName")}
            className={inputClassName}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label
            htmlFor="email"
            className="block text-lg font-medium text-white mb-2"
          >
            Email *
          </label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            className={inputClassName}
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-400">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-lg font-medium text-white mb-2"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            {...register("phone", {
              pattern: {
                value: /^[0-9-+()]*$/,
                message: "Invalid phone number",
              },
            })}
            className={inputClassName}
          />
          {errors.phone && (
            <p className="mt-2 text-sm text-red-400">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-lg font-medium text-white mb-2"
        >
          Message *
        </label>
        <textarea
          id="message"
          rows={6}
          {...register("message", {
            required: "Message is required",
          })}
          className={`h-40 resize-none ${inputClassName}`}
        />
        {errors.message && (
          <p className="mt-2 text-sm text-red-400">{errors.message.message}</p>
        )}
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-red-600 text-white px-8 py-4 rounded-md text-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </div>
    </form>
  );
}
