import React from "react";
import { CreatePayment, VerifyPayment , EnrolledClasses } from "../../api/api";
import { CreditCard, ChevronRight, Lock } from "lucide-react";
import DarkModeClasses from "../DarkMode";

const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

const PaymentButton = ({
  amount,
  onSuccess,
  onFailure,
  text,
  userId,
  classId,
  updateEnrolledClassess
}) => {
  const handlePayment = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const paymentData = {
      userId,
      classId,
      amount,
    };

    try {
      const result = await CreatePayment(paymentData);
      if (!result.success) {
        onFailure(result);
        return;
      }

      console.log("result", result);

      const options = {
        key: "rzp_test_zR3Hw3haQMWYC9",
        amount: amount * 100,
        currency: "INR",
        name: "Yoga Class Payment",
        description: "Payment for Yoga Class",
        image: "https://example.com/your_logo",
        order_id: result.orderId,
        handler: async (response) => {
          console.log("response", response);
          const verifyData = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          };
          console.log(verifyData);

          try {
            const verifyResult = await VerifyPayment(verifyData);
            if (verifyResult.success) {
              onSuccess(verifyResult.data);
              const enrolledClasses = await EnrolledClasses(userId);
              updateEnrolledClassess(enrolledClasses.data);
            } else {
              onFailure(verifyResult);
            }
          } catch (error) {
            onFailure({ success: false, message: error.message });
          }
        },
        prefill: {
          name: "Your Name",
          email: "your.email@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Yoga Studio Address",
        },
        theme: {
          color: "#F37254",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      onFailure({ success: false, message: error.message });
    }
  };

  return (
    <button
      onClick={handlePayment}
      className={`mt-4 w-full flex items-center justify-center gap-2 text-white py-2 px-4 rounded-lg transition-all duration-200 ${DarkModeClasses.button.danger} hover:from-indigo-700 hover:to-indigo-600 dark:from-gray-800 dark:to-gray-700`}
    >
      {text}
    </button>
  );

};

export default PaymentButton;
