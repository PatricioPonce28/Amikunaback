import React, { useState } from "react";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import useAportes from "../../hooks/useAportes";

// Asegúrate de que esta clave sea tu clave pública de Stripe en el archivo .env
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const PaymentForm = ({ onClose, onPaymentSuccess }) => {
  // --- CAMBIO: Estado local para el monto del aporte ---
  const [monto, setMonto] = useState(10);
  
  const stripe = useStripe();
  const elements = useElements();
  const { realizarAporte, loading } = useAportes();
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setError(error.message);
      return;
    }

    try {
      const aporteData = {
        amount: monto, // <-- Usamos el estado local 'monto'
        paymentMethodId: paymentMethod.id,
      };

      const pagoExitoso = await realizarAporte(aporteData);

      if (pagoExitoso) {
        onPaymentSuccess();
      } else {
        setError("Error al procesar el aporte.");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 rounded-lg shadow-md">
      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-50">Detalle del Aporte</label>
        <ul className="text-gray-400 bg-gray-700 p-2 rounded-md text-left">
          <li>Concepto: Aporte Voluntario</li>
          <li>Descripción: Contribución a la comunidad</li>
        </ul>
      </div>
      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-50">Monto</label>
        {/* --- CAMBIO: Input para que el usuario cambie el monto --- */}
        <input 
          type="number"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          min="1"
          className="w-full text-green-400 bg-gray-700 p-2 rounded-md font-bold text-left"
        />
      </div>

      <label className="mb-2 block text-sm font-semibold text-gray-50">Tarjeta de crédito</label>
      <div className="p-3 border border-gray-600 rounded-lg bg-gray-700">
        <CardElement options={{ style: { base: { color: "#ffffff" } } }} />
      </div>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <div className="flex justify-center gap-4 mt-6">
        <button
          type="submit"
          className="px-6 py-2 rounded-lg bg-green-600 hover:bg-green-800 text-white transition duration-300 disabled:opacity-50"
          disabled={loading || !stripe || !elements}
        >
          {loading ? "Procesando..." : "Realizar Aporte"}
        </button>
        <button
          type="button"
          className="px-6 py-2 rounded-lg bg-red-600 hover:bg-red-800 text-white transition duration-300"
          onClick={onClose}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

function ModalPayment({ onClose, onPaymentSuccess }) {
  if (!stripePromise) {
    return null;
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-gray-900 rounded-lg shadow-lg overflow-y-auto p-6 max-w-lg w-full border border-gray-700 relative">
        <p className="text-white font-bold text-xl mb-4 text-center">Realizar Aporte</p>
        <Elements stripe={stripePromise}>
          <PaymentForm onClose={onClose} onPaymentSuccess={onPaymentSuccess} />
        </Elements>
      </div>
    </div>
  );
}

export default ModalPayment;